import { Document, Schema } from 'mongoose';

interface PostInterface extends Document {
  body: string;
  username: string;
  comments: {
    id?: String;
    body: string;
    username: string;
    createdAt: string;
  }[];
  likes: {
    username: string;
    createdAt: string;
  }[];
  user: {
    type: Schema.Types.ObjectId;
  };
  createdAt: string;
  updatedAt: string;
}

export default PostInterface;
