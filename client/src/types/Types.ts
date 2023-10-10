type PostType = {
  id: string;
  body: string;
  username: string;
  comments: {
    id: string;
    body: string;
    username: string;
    createdAt: string;
  }[];
  likes: {
    username: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

type UserType = {
  id: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
};

type AuthContextType = {
  user: null | UserType;
  login: (userInfo: { username: string; password: string }) => void;
  logout: () => void;
};
