import { useState } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { GET_POSTS, DELETE_POST, DELETE_COMMENT } from '../utils/graphql';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({
  postID,
  commentID,
  redirect,
}: {
  postID: string;
  commentID?: string;
  redirect?: boolean;
}) => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const mutation = commentID ? DELETE_COMMENT : DELETE_POST;

  const [deleteMutation] = useMutation(mutation, {
    variables: commentID ? { postID, commentID } : { id: postID },
    update(cache: ApolloCache<any>) {
      setConfirmOpen(false);
      if (redirect) {
        navigate('/');
      }
    },
    refetchQueries: [GET_POSTS, 'getPosts'],
  });

  const closeModal = () => setConfirmOpen(false);

  return (
    <>
      <Button variant="danger" onClick={() => setConfirmOpen(true)}>
        <FaTrash className="icon" />
      </Button>
      <Modal show={confirmOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {commentID ? 'Comment' : 'Post'} ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={(e: any) => deleteMutation(e)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;
