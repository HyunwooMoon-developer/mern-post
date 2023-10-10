import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { LIKE_POST } from '../utils/graphql';
import { FaThumbsUp } from 'react-icons/fa';

const LikeButton = ({ user, post }: { user: any; post: PostType }) => {
  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    if (
      user &&
      post.likes.find(
        (like: Partial<PostType>) => like.username === user.username
      )
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, post.likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postID: post.id },
  });

  return (
    <Button
      href={!user ? '/login' : undefined}
      disabled={!user}
      variant={!user || !liked ? 'secondary' : 'primary'}
      onClick={(e: any) => user && likePost(e)}
    >
      <FaThumbsUp className="icon" />
    </Button>
  );
};

export default LikeButton;
