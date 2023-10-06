import Post from '../../models/PostModel';
import checkAuth from '../../utils/checkAuth';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

const Comment_Mutation = {
  Mutation: {
    createComment: async (
      _: any,
      args: { body: string; postID: string },
      context: any
    ) => {
      const user = checkAuth(context);

      const { body, postID } = args;

      if (body.trim() === '') {
        throw new GraphQLError(`Empty comment`, {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }

      const post = await Post.findById(postID);

      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return post;
      } else {
        throw new GraphQLError('Post Not Found', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
    deleteComment: async (
      _: any,
      args: { postID: string; commentID: string },
      context: any
    ) => {
      const user = checkAuth(context);

      const { postID, commentID } = args;

      const post = await Post.findById(postID);

      if (post) {
        const index = post.comments.findIndex((c) => c.id === commentID);

        if (post.comments[index].username === user.username) {
          post.comments.splice(index, 1);

          await post.save();

          return post;
        }
      } else {
        throw new GraphQLError('Post Not Found', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
  },
};

export default Comment_Mutation;
