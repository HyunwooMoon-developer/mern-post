import jwt from 'jsonwebtoken';
import UserInterface from '../interfaces/UserInterface';

const validateRgisterInput = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: { [key: string]: any } = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }

  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  } else {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!email.match(regex)) {
      errors.email = 'Unvalid Email';
    }
  }

  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Password is not matched';
  }

  return errors;
};

const validateLoginInput = (username: string, password: string) => {
  const errors: { [key: string]: any } = {};

  if (username.trim() === '') {
    errors.username = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }

  return errors;
};

const generateToken = (user: UserInterface) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_TOKEN as string,
    { expiresIn: '24h' }
  );
};

export { validateRgisterInput, validateLoginInput, generateToken };
