import { Request, Response } from "express";
import { Error } from "@interfaces/error";
import ClassModel from "@models/class";
import UserModel from "@models/user";
import humps from "humps";

const list = async (req: Request, res: Response): Promise<Response> => {
  const { limit = "20", after } = req.params;

  try {
    const classes = await ClassModel.findAll({
      attributes: ["id", "name"],
      limit: parseInt(limit, 10),
      offset: parseInt(0, 10),
    });

    return res.status(200).json(classes);
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
  const { classId } = req.params;

  try {
    const classGroup = await ClassModel.findByPk(classId, {
      attributes: ["id", "name"],
    });

    if (!classGroup)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Class does not exist",
      } as Error);

    return res.status(200).json(classGroup);
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
  const { name: className } = req.body;

  try {
    const classGroup = await ClassModel.create({
      name: className.trim(),
    });

    return res.status(201).json({ name: classGroup.name, id: classGroup.id });
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
  const { classId } = req.params;

  try {
    const classGroup = await ClassModel.findByPk(classId, {
      attributes: ["id", "name"],
    });

    if (!classGroup)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Class does not exist",
      } as Error);

    if (name) classGroup.name = name;

    await classGroup.save();

    return res.status(200).json(humps.decamelizeKeys(classGroup.toJSON()));
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
  const { classId } = req.params;

  try {
    const classGroup = await ClassModel.findByPk(classId, {
      attributes: ["id", "name"],
    });

    if (!classGroup)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Room does not exist",
      } as Error);

    await classGroup.destroy();

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

const getStudentsById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { classId } = req.params;

  try {
    const classGroup = await ClassModel.scope(["default"]).findByPk(classId);

    if (!classGroup)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Class does not exist",
      } as Error);

    const students = await classGroup.$get("users", {
      attributes: ["id", "firstName", "lastName"],
    });

    return res.status(200).json(students);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send({
      code: "INTERNAL_ERROR",
      message:
        "The server encountered an internal error. Please retry the request.",
    } as Error);
  }
};

const addStudentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { classId } = req.params;
  const { userId } = req.body;

  try {
    const user = await UserModel.scope(["profile"]).findByPk(userId);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const classToBeAdded = await ClassModel.scope(["default"]).findByPk(
      classId
    );

    if (!classToBeAdded)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Class does not exist",
      } as Error);

    if (user.classId === classToBeAdded.id) return res.sendStatus(204);

    await classToBeAdded.$add("users", user);

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

const removeStudentById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { classId } = req.params;
  const { userId } = req.body;

  try {
    const user = await UserModel.scope(["profile"]).findByPk(userId);

    if (!user)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "User does not exist",
      } as Error);

    const classToBeRemoved = await ClassModel.scope(["default"]).findByPk(
      classId
    );

    if (!classToBeRemoved)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Class does not exist",
      } as Error);

    await classToBeRemoved.$remove("users", user);

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
  getStudentsById,
  addStudentById,
  removeStudentById,
};
