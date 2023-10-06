import bcrypt from 'bcryptjs';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import {
  validateRgisterInput,
  validateLoginInput,
  generateToken,
} from '../../utils/validator';
import User from '../../models/UserModel';

const User_Mutation = {
  Mutation: {
    login: async (_: any, args: { username: string; password: string }) => {
      const { username, password } = args;

      const errors = validateLoginInput(username, password);

      if (Object.keys(errors).length > 0) {
        throw new GraphQLError('Error exists', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        throw new GraphQLError(`User not found`, {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new GraphQLError('Wrong password', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const token = generateToken(user);

      return {
        ...user,
        id: user._id,
        token,
      };
    },
    register: async (_: any, args: { input: { [key: string]: string } }) => {
      let { username, email, password, confirmPassword } = args.input;
      const errors = validateRgisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (Object.keys(errors).length > 0) {
        throw new GraphQLError('Error exists', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new GraphQLError('Username is takne', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res,
        id: res._id,
        token,
      };
    },
  },
};

export default User_Mutation;
