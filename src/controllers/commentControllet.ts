import { NextFunction, Request, Response } from "express";
import { Schema } from "mongoose";
// models
import Comment from "@/models/Comment";
// utils/config
import { checkForObjectKeys } from "@/utils/config/check";
// utils/errors
import { RequestBodyError } from "@/utils/errors";
// utils/models
import { createComment, deleteComment } from "@/utils/models/comment";

const ObjectId = Schema.ObjectId;

export const createCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { content, campaignId } = req.body;

    const errorMessage = checkForObjectKeys(
      ["campaignId", "content"],
      req.body
    );

    if (errorMessage) {
      throw new RequestBodyError(errorMessage);
    }

    const { _id: userId } = req.user;

    const { data, error, success } = await createComment({
      campaignId,
      content,
      userId,
    });

    if (!success) {
      throw error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};

export const getCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { campaignId } = req.params;

    const data = await Comment.find({ campaignId: new ObjectId(campaignId) })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    return res.json({ data, error: "", success: true });
  } catch (error) {
    next(error);
  }
};

export const deleteCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { _id } = req.params;

    const { _id: userId } = req.user;

    const { data, error, success } = await deleteComment({
      _id: new ObjectId(_id),
      userId,
    });

    if (!success) {
      throw error;
    }

    return res.status(201).json({ data, error, success });
  } catch (error) {
    next(error);
  }
};
