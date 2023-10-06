import gql from 'graphql-tag';

const Comment_Type = gql`
  type Comment {
    id: ID!
    createdAt: DateTime!
    username: String!
    body: String!
  }

  type Mutation {
    createComment(postID: ID!, body: String!): Post!
    deleteComment(postID: ID!, commentID: ID!): Post!
  }
`;

export default Comment_Type;
