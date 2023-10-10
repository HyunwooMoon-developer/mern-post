import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { CREATE_POST, GET_POSTS } from '../utils/graphql';

const PostForm = () => {
  const [body, setBody] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const [createPost] = useMutation(CREATE_POST, {
    variables: { body: body },
    refetchQueries: [GET_POSTS, 'getPosts'],
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
    setBody(e.target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createPost();
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="post_body" as={Col} md="4" className="mb-3">
          <Form.Label>Create a Post : </Form.Label>
          <Form.Control
            type="text"
            name="body"
            value={body}
            isInvalid={!!errors['body']}
            onChange={onChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.body}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
