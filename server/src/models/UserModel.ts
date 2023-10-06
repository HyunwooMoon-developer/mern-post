import { model, Schema } from 'mongoose';
import UserInterface from '../interfaces/UserInterface';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'Username already in use'],
      required: [true, 'Username cannot be empty'],
    },
    password: {
      type: String,
      required: true,
      maxlength: [60, 'Password must less or equal than 60 character'],
      minlength: [6, 'Password must greater or equal than 6 characters'],
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'User',
  }
);

const User = model<UserInterface>('User', UserSchema);

export default User;
