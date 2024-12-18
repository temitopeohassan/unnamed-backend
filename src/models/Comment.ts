import { Model, model, Schema } from "mongoose";

const ObjectId = Schema.ObjectId;

export interface IComment {
  _id?: Schema.Types.ObjectId;
  campaignId: Schema.Types.ObjectId;
  content: string;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface ICommentSchema extends Model<IComment>, IComment {}

const commentSchema = new Schema<ICommentSchema>(
  {
    campaignId: {
      ref: "Campaign",
      required: [true, "`campaign` field is required"],
      type: ObjectId,
    },
    content: {
      required: [true, "`content` field is required"],
      trim: true,
      type: String,
    },
    userId: {
      ref: "User",
      required: [true, "`user` field is required"],
      type: ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", commentSchema);
