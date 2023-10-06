import GraphQLDate from 'graphql-iso-date';
import GraphQLDateTime from 'graphql-iso-date';
import Post_Mutation from './Post/Post_Mutation';
import Post_Query from './Post/Post_Query';
import Post from './Post/Post';
import Post_Subscription from './Post/Post_Subscription';
import User_Mutation from './User/User_Mutation';
import Comment_Mutation from './Comment/Comment_Mutation';

const misc_resolvers = {
  Date: GraphQLDate,
  DateTime: GraphQLDateTime,
};

const resolvers = [
  misc_resolvers,
  Comment_Mutation,
  Post_Mutation,
  Post_Query,
  Post_Subscription,
  Post,
  User_Mutation,
];

export default resolvers;
