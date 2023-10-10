import { useContext } from 'react';
import moment from 'moment';
import { Card, Button, Col, ButtonGroup } from 'react-bootstrap';
import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import { FaEdit } from 'react-icons/fa';

const PostCard = ({ post }: { post: PostType }) => {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Col>
      <Card className="mt-5 g-4">
        <Card.Img variant="top" src="https://picsum.photos/200" />
        <Card.Body>
          <Card.Title>{post.username}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
          <ButtonGroup style={{ float: 'right' }}>
            <Button variant="success" href={`/post/${post.id}`}>
              <FaEdit className="icon" />
            </Button>
            <LikeButton user={user} post={post} />
            {user && user.username === post.username ? (
              <DeleteButton postID={post.id} />
            ) : null}
          </ButtonGroup>
        </Card.Body>
        <Card.Footer>{moment(post.createdAt).fromNow(true)} ago</Card.Footer>
      </Card>
    </Col>
  );
};

export default PostCard;
