import Post from '../../models/PostModel';

const Post_Query = {
  Query: {
    getPosts: async (_: any, __: any) => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });

        return posts;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    getPost: async (_: any, args: { id: string }) => {
      try {
        const post = await Post.findById(args.id);
        if (post) {
          return post;
        } else {
          throw new Error('Post is not exit');
        }
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};

export default Post_Query;
