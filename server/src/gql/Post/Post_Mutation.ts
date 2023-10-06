import Post from '../../models/PostModel';
import checkAuth from '../../utils/checkAuth';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError } from 'graphql';

const Post_Mutation = {
  Mutation: {
    createPost: async (_: any, args: { body: string }, context: any) => {
      const user = checkAuth(context);

      if (args.body.trim() === '') {
        throw new Error('Post body must not be empty');
      }

      const newPost = new Post({
        body: args.body,
        user: user.id,
        username: user.username,
      });

      const post = await newPost.save();

      context.pubsub.publish('NEW_POST', {
        newPost: post,
      });

      return post;
    },
    deletePost: async (_: any, args: { id: string }, context: any) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(args.id);
        if (post) {
          if (user.username === post.username) {
            await post.deleteOne();

            return post;
          } else {
            throw new GraphQLError('Action not allowed', {
              extensions: { code: 'UNAUTHENTICATED' },
            });
          }
        }
      } catch (err: any) {
        throw new Error(err);
      }
    },
    likePost: async (_: any, args: { postID: string }, context: any) => {
      const user = checkAuth(context);

      const post = await Post.findById(args.postID);
      if (post) {
        if (post.likes.find((like) => like.username === user.username)) {
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          );
        } else {
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();

        return post;
      } else {
        throw new GraphQLError(`Post not found`, {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    },
  },
};

export default Post_Mutation;
