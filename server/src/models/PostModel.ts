import { model, Schema } from 'mongoose';
import PostInterface from '../interfaces/PostInterface';

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comments: [
      {
        body: {
          type: String,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        createdAt: { type: String },
      },
    ],
    likes: [
      {
        username: { type: String, required: true },
        createdAt: { type: String },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'Post',
  }
);

const Post = model<PostInterface>('Post', PostSchema);

export default Post;
