import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      success
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postID: ID!) {
    likePost(postID: $postID) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
