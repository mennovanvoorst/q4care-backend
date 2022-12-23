import { Request, Response } from "express";
import { Error } from "@interfaces/error";
import ResourceModel from "@models/learningResource";
import FileModel from "@models/file";
import humps from "humps";
import { generateId } from "@utils";

const list = async (req: Request, res: Response): Promise<Response> => {
  const { limit = "20", after } = req.params;

  try {
    const classes = await ResourceModel.scope(["default"]).findAll({
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
  const { resourceId } = req.params;

  try {
    const learningResource = await ResourceModel.scope([
      "default",
      "withBody",
    ]).findByPk(resourceId);

    if (!learningResource)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Resource does not exist",
      } as Error);

    return res.status(200).json(learningResource);
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
  const { title: resourceTitle, body: resourceBody } = req.body;
  const resourceFiles = req.files;

  try {
    let files = [];
    if (resourceFiles)
      files = resourceFiles.map((file) => {
        const contents = Buffer.from(file.buffer).toString("base64");

        return {
          name: file.originalname,
          contents,
        };
      });

    const learningResource = await ResourceModel.create(
      {
        title: resourceTitle.trim(),
        body: resourceBody,
        files,
      },
      {
        include: [FileModel],
      }
    );

    return res.status(201).json({
      files: learningResource.files,
      title: learningResource.title,
      body: learningResource.body,
      id: learningResource.id,
    });
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
  const { title, body } = req.body;
  const resourceFiles = req.files;
  const { resourceId } = req.params;

  try {
    const learningResource = await ResourceModel.scope([
      "default",
      "withBody",
    ]).findByPk(resourceId);

    if (!learningResource)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Resource does not exist",
      } as Error);

    if (title) learningResource.title = title;
    if (body) learningResource.body = body;

    await learningResource.save();

    if (resourceFiles) {
      for (const file in resourceFiles) {
        const contents = Buffer.from(resourceFiles[file].buffer).toString(
          "base64"
        );

        const newFile = await FileModel.create({
          name: resourceFiles[file].originalname,
          contents,
        });

        learningResource.$add("files", newFile);
      }
    }

    const files = await learningResource.$get("files");
    const updatedResources = {
      ...learningResource.toJSON(),
      files: files.map((file) => file.toJSON()),
    };

    return res.status(200).json(humps.decamelizeKeys(updatedResources));
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
  const { resourceId } = req.params;

  try {
    const learningResource = await ResourceModel.scope(["default"]).findByPk(
      resourceId
    );

    if (!learningResource)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "Resource does not exist",
      } as Error);

    await learningResource.destroy();

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
