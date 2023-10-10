import { useContext } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';
import { GET_POSTS } from '../utils/graphql';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { user } = useContext(AuthContext) as AuthContextType;

  const { loading, data } = useQuery(GET_POSTS);

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  return (
    <Container className="main">
      <Row>
        <p className="h1">Recent Posts</p>
      </Row>
      <Row>
        {user ? (
          <Col>
            <PostForm />
          </Col>
        ) : null}
      </Row>
      <Row xs={1} md={3} className="g-4">
        {data?.getPosts
          ? data.getPosts.map((post: PostType) => (
              <PostCard post={post} key={post.id} />
            ))
          : null}
      </Row>
    </Container>
  );
};

export default Home;
