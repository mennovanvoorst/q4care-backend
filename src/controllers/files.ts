import { Request, Response } from "express";
import { Error } from "@interfaces/error";
import FileModel from "@models/file";
import stream from "stream";

const download = async (req: Request, res: Response): Promise<Response> => {
  const { fileId } = req.params;

  try {
    const file = await FileModel.scope(["default"]).findByPk(fileId);

    if (!file)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "File does not exist",
      } as Error);

    const fileContents = Buffer.from(file.contents, "base64");
    const readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set("Content-disposition", `attachment; filename=${file.name}`);
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

const destroy = async (req: Request, res: Response): Promise<Response> => {
  const { fileId } = req.params;

  try {
    const file = await FileModel.scope(["default"]).findByPk(fileId);

    if (!file)
      return res.status(404).send({
        code: "RESOURCE_NOT_FOUND",
        message: "File does not exist",
      } as Error);

    await file.destroy();

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
  download,
  destroy,
};
