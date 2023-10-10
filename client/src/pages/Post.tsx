import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Form,
  Spinner,
} from 'react-bootstrap';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { AuthContext } from '../context/auth';
import { CREATE_COMMENT, GET_POST } from '../utils/graphql';

const Post = () => {
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: any }>({});

  const { id: postID } = useParams();
  const { user } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useQuery(GET_POST, { variables: { id: postID } });
  const post = data?.getPost as PostType;
  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postID: postID,
      body: comment,
    },
    update() {
      setComment('');
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
    setComment(e.target.value);
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    createComment();
  };

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Container className="main">
      <Card style={{ width: '30rem' }} className="mx-auto">
        <Card.Img variant="top" src="https://picsum.photos/500/400" />
        <Card.Body>
          <Card.Title>{post.username}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <ButtonGroup style={{ float: 'right' }}>
            <LikeButton user={user} post={post} />
            {user && user.username === post.username ? (
              <DeleteButton postID={post.id} redirect />
            ) : null}
          </ButtonGroup>
          <Form onSubmit={onSubmit} className="pt-5">
            <Form.Group controlId="post_comment" className="mb-3">
              <Form.Label>Create a Comment : </Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={comment}
                isInvalid={!!errors['comment']}
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
        </Card.Body>
      </Card>

      {post.comments.length > 0
        ? post.comments.map((comment) => (
            <Card
              key={comment.id}
              style={{ width: '30rem' }}
              className="mt-3 mx-auto"
            >
              <Card.Body>
                <Card.Title>{comment.username}</Card.Title>
                <Card.Text>{comment.body}</Card.Text>
                {user && user.username === comment.username ? (
                  <ButtonGroup style={{ float: 'right' }}>
                    <DeleteButton
                      postID={postID as string}
                      commentID={comment.id}
                    />
                  </ButtonGroup>
                ) : null}
              </Card.Body>
              <Card.Footer>
                {moment(comment.createdAt).fromNow(true)} ago
              </Card.Footer>
            </Card>
          ))
        : null}
    </Container>
  );
};

export default Post;
