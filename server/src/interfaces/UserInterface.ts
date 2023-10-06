import { Document } from 'mongoose';

interface UserInterface extends Document {
  username: string;
  password: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export default UserInterface;
