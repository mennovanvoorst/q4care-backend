import { Request, Response } from "express";
import { Error } from "@interfaces/error";
import SkillModel from "@models/skill";
import humps from "humps";
import UserModel from "@models/user";

const list = async (req: Request, res: Response): Promise<Response> => {
  const { limit = "20", after } = req.params;

  try {
    const skills = await SkillModel.findAll({
      attributes: ["id", "name"],
      limit: parseInt(limit, 10),
      offset: parseInt(0, 10),
    });

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

const getById = async (req: Request, res: Response): Promise<Response> => {
  const { skillId } = req.params;

  try {
    const skill = await SkillModel.findByPk(skillId, {
      attributes: ["id", "name"],
    });

    if (!skill)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    return res.status(200).json(skill);
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
  const { name: skillName } = req.body;

  try {
    const skill = await SkillModel.create({
      name: skillName.trim(),
    });

    return res.status(201).json({ name: skill.name, id: skill.id });
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
  const { name } = req.body;
  const { skillId } = req.params;

  try {
    const skill = await SkillModel.findByPk(skillId, {
      attributes: ["id", "name"],
    });

    if (!skill)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    if (name) skill.name = name;

    await skill.save();

    return res.status(200).json(humps.decamelizeKeys(skill.toJSON()));
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
  const { skillId } = req.params;

  try {
    const skill = await SkillModel.findByPk(skillId, {
      attributes: ["id", "name"],
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["id"],
          through: { attributes: [] },
          required: false,
        },
      ],
    });

    if (!skill)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Skill does not exist",
      } as Error);

    await skill.destroy();

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
  list,
  create,
  updateById,
  getById,
  destroy,
};
