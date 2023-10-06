import { gql } from 'graphql-tag';
import Post_Type from './Post/Post_Type';
import User_Type from './User/User_Type';
import Comment_Type from './Comment/Comment_Type';

const misc_Schema = gql`
  scalar Date
  scalar DateTime
`;

const typeDefs = [misc_Schema, Post_Type, User_Type, Comment_Type];

export default typeDefs;
