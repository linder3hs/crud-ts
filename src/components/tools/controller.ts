import type { Request, Response } from "express";
import { responseSuccess, responseError } from "../../network/responses";
import { handleResponseError } from "../../utils";

export async function storeFile(req: Request, res: Response) {
  try {
    if (!req.files) {
      return responseError({
        res,
        data: "Not files found.",
        status: 400,
      });
    }

    console.log(req.files);
  } catch (error) {
    return handleResponseError(res, error);
  }
}
