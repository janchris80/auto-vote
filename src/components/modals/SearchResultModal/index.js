// Search/SearchResultModal.js
import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResultModal = ({ show, handleClose, user, loadingStates, handleUnfollow, handleFollow }) => {
  const [hiveUser, setHiveUser] = useState({});
  const [webUser, setWebUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user?.hive_user) {
      setHiveUser(user?.hive_user);
      setWebUser(user?.user);
      setUsername(`@${user?.hive_user?.name}`)
    }
  }, [show, user])

  useEffect(() => {
    if (webUser) {
      setIsFollowed(webUser.follower ? true : false)
    }
  }, [webUser])

  useEffect(() => {
    setIsFollowed(!isFollowed);
  }, [handleFollow, handleUnfollow])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card>
          <Card.Header as="h3">{username}</Card.Header>
          <Card.Body>
            <Card.Title className='mb-2'>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Visit <a target='_blank' href={`https://d.buzz/${username}`}>{`d.buzz/${username}`}</a>
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {isFollowed
          ? <Button variant='danger' onClick={() => handleUnfollow(webUser.id)}>
            {loadingStates[webUser.id] ? 'Unfollowing...' : 'Unfollow'}
          </Button>
          : <Button variant='success' onClick={() => handleFollow(webUser.id)}>
            {loadingStates[webUser.id] ? 'Following...' : 'Follow'}
          </Button>
        }
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;
