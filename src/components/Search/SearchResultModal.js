// Search/SearchResultModal.js
import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResultModal = ({ show, handleClose, user, type, loadingStates, handleUnfollow, handleFollow }) => {
  const [jsonMetadata, setJsonMetadata] = useState({});
  const [hiveUser, setHiveUser] = useState({});
  const [webUser, setWebUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (user) {
      const parser = JSON.parse(user?.hive_user?.json_metadata);
      setJsonMetadata(parser);
      setHiveUser(user?.hive_user);
      setWebUser(user?.user);
    }
  }, [show, user])

  useEffect(() => {
    if (webUser) {
      setIsFollowed(webUser?.isFollowed ? true : false)
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
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Header as="h3">{`@${hiveUser?.name}`}</Card.Header>
          <Card.Body>
            <Card.Title className='mb-2'>
              Website:
              <Link to={jsonMetadata?.profile?.website} target='_blank'>
                {jsonMetadata?.profile?.website}
              </Link>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{jsonMetadata?.profile?.about}</Card.Subtitle>
            <div>
              <p>Post Count: {hiveUser?.post_count || 0}</p>
              <p>Followed: {hiveUser?.post_count || 0}</p>
            </div>
            <div>
              <Row>
                <Col>
                  <p>
                    Has Curation Trail: {webUser.curation_trailer ? 'Yes' : 'No'}
                  </p>
                </Col>
                <Col>
                  {
                    webUser.curation_trailer
                      ? <Button size='sm' variant='success'>Follow Trail</Button>
                      : null
                  }
                </Col>
              </Row>

              <Row className=''>
                <Col>
                  <p>Has Downvote Trail: {webUser.downvote_trailer ? 'Yes' : 'No'}</p>
                </Col>
                <Col>
                  {
                    webUser.downvote_trailer
                      ? <Button size='sm' variant='success'>Follow Trail</Button>
                      : null
                  }
                </Col>
              </Row>
            </div>
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
