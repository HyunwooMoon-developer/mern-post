import gql from 'graphql-tag';

const Post_Type = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: DateTime!
    username: String!
    comments: [Comment]
    likes: [Like]
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: DateTime!
    username: String!
    body: String!
  }

  type Like {
    id: ID!
    createdAt: DateTime!
    username: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(body: String!): Post!
    deletePost(id: ID!): Post!
    createComment(postID: ID!, body: String!): Post!
    deleteComment(postID: ID!, commentID: ID!): Post!
    likePost(postID: ID!): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;

export default Post_Type;
