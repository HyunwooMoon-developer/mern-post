import PostInterface from '../../interfaces/PostInterface';

const Post = {
  Post: {
    likeCount: (parent: PostInterface) => {
      return parent.likes.length;
    },
    commentCount: (parent: PostInterface) => {
      return parent.comments.length;
    },
  },
};

export default Post;
