import { gql } from 'graphql-tag';

const User_Type = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: DateTime
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Mutation {
    register(input: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

export default User_Type;
