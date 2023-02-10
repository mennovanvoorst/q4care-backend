/* eslint-disable no-bitwise */
import { Request, Response } from "express";
import { Error } from "@interfaces/error";
import UserModel from "@models/user";
import SkillModel from "@models/skill";
import UserSkillModel from "@models/userSkill";
import PaymentModel, { PaymentStatus } from "@models/payment";
import ProductModel from "@models/product";
import certificate from "@services/certificate";
import path from "path";
import fs from "fs";
import { addDays, format } from "date-fns";
import stream from "stream";
import { USER_ROLES } from "@constants";

const list = async (req: Request, res: Response): Promise<Response> => {
  const { limit = "20", after } = req.params;

  try {
    const users = await UserModel.scope(["profile"]).findAll();

    return res.status(200).json(users);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const getAuthenticated = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return res.status(200).json(req.user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  try {
    const user = await UserModel.scope(["profile", "withClass"]).findByPk(
      userId
    );

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const updateById = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const { firstName, lastName, email, flags } = req.body;

  try {
    const user = await UserModel.scope(["profile"]).findByPk(userId);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    if (flags !== user.flags && flags === USER_ROLES.paid)
      await user.addAccessProduct();

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (flags !== null) user.flags = flags;

    await user.save();

    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const updateCurrentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { firstName, lastName, email } = req.body;
  const { id } = req.user;

  try {
    const user = await UserModel.scope(["profile"]).findByPk(id);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();

    return res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const getSkillsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    const skills = await UserSkillModel.scope(["default"]).findAll({
      where: { userId },
    });

    if (!skills)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    return res.status(200).json(skills);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const addSkillById = async (req: Request, res: Response): Promise<Response> => {
  const { achievementDate } = req.body;
  const { userId, skillId } = req.params;

  try {
    const user = await UserModel.scope(["profile", "withSkills"]).findByPk(
      userId
    );

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const skillToBeAdded = await SkillModel.scope(["default"]).findByPk(
      skillId
    );

    if (!skillToBeAdded)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    if (
      user.skills.filter((skill) => skill.id === skillToBeAdded.id).length > 0
    )
      return res.sendStatus(204);

    await user.$add("skills", skillToBeAdded, { through: { achievementDate } });

    return res.status(201).json(skillToBeAdded);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const removeSkillById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, skillId } = req.params;

  try {
    const user = await UserModel.scope(["profile", "withClass"]).findByPk(
      userId
    );

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const skillToBeRemoved = await SkillModel.scope(["default"]).findByPk(
      skillId
    );

    if (!skillToBeRemoved)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    await user.$remove("skills", skillToBeRemoved);

    return res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const generateCertificate = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userId, skillId } = req.params;

  try {
    const user = await UserModel.scope(["profile", "withClass"]).findByPk(
      userId
    );

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const [skill] = await user.$get("skills", { where: { id: skillId } });

    if (!skill)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    const fileName = `${user.id}_${skill.UserSkill.achievementDate}_${skill.name}`;
    const certificateTemplate = fs.readFileSync(
      path.join(__dirname, "../", "views", "certificates", "certificate.html"),
      "utf8"
    );

    const pdf = await certificate.generate(
      {
        fileName,
        filePath: `../../files/temp/${fileName}`,
        format: "A4",
        orientation: "portrait",
      },
      certificateTemplate,
      {
        name: `${user.firstName} ${user.lastName}`,
        skill: skill.name,
        date: format(new Date(skill.UserSkill.achievementDate), "dd-MM-yyyy"),
      }
    );

    const fileContents = Buffer.from(pdf, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set("Content-disposition", `attachment; filename=${fileName}`);
    res.set("Content-Type", "text/plain");
    readStream.pipe(res);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const create = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, email, flags } = req.body;

  try {
    const checkEmail = await UserModel.findOne({ where: { email } });

    if (checkEmail)
      return res.status(404).send({
        code: "INVALID_ARGUMENT",
        errors: {
          email: {
            code: "INVALID_ARGUMENT",
            message: "Email already exists",
          },
        },
      } as Error);

    const user = await UserModel.create({
      firstName: firstName.trim(),
      lastName,
      email,
      flags,
    });

    if (flags === USER_ROLES.paid) await user.addAccessProduct();

    return res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const getPaymentsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userId } = req.params;

    const payments = await PaymentModel.scope([
      "default",
      "withProduct",
    ]).findAll({
      where: { userId },
    });

    return res.status(200).json(payments);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByPk(userId);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    await user.destroy();

    return res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

export default {
  create,
  list,
  getAuthenticated,
  getById,
  updateById,
  updateCurrentById,
  getSkillsById,
  addSkillById,
  removeSkillById,
  generateCertificate,
  getPaymentsById,
  destroy,
};
