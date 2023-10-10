import { useState } from 'react';
import { Button, Col, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/graphql';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const navigate = useNavigate();

  const [register] = useMutation(REGISTER_USER, {
    variables: { input: userInfo },
    update(cache, { data: { register } }) {
      if (register.success) {
        navigate('/login');
      }
    },
    onError(err) {
      if (err.graphQLErrors) {
        let errorList = err.graphQLErrors.map(
          (e) =>
            e.extensions.argumentName && {
              [e.extensions.argumentName as string]: e.message,
            }
        );
        setErrors(Object.assign({}, ...errorList));
      }
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <Container className="main">
      <p className="h1 mb-5">Register</p>
      <Form onSubmit={onSubmit}>
        <Form.Group
          controlId="register_username"
          as={Col}
          md="4"
          className="mb-3"
        >
          <Form.Label>Username </Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Type Username"
            value={userInfo.username}
            isInvalid={!!errors['username']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="register_email" as={Col} md="4" className="mb-3">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Type Email"
            value={userInfo.email}
            isInvalid={!!errors['email']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          controlId="register_password"
          className="mb-4"
          as={Col}
          md="4"
        >
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Type Password"
            value={userInfo.password}
            isInvalid={!!errors['password']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          controlId="register_confirm_passwor"
          className="mb-5"
          as={Col}
          md="4"
        >
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Type Confirm Password"
            value={userInfo.confirmPassword}
            isInvalid={!!errors['confirmPassword']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
