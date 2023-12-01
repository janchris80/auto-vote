// Search/SearchResultModal.js
import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Image, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResultModal = ({ show, handleClose, user }) => {
  const [jsonMetadata, setJsonMetadata] = useState({});
  const [hiveUser, setHiveUser] = useState({});
  const [webUser, setWebUser] = useState({});

  useEffect(() => {
    if (user) {
      const parser = JSON.parse(user?.hive_user?.json_metadata);
      setJsonMetadata(parser);
      setHiveUser(user?.hive_user);
      setWebUser(user?.user);
    }
  }, [show, user])

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
            <Card.Text>
              <p>Post Count: {hiveUser?.post_count || 0}</p>
              <p>Followed: {hiveUser?.post_count || 0}</p>
              <div>
                <Row className=''>
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

            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button as={Link} to={`/curation-trail/@${user?.name}`} variant="primary">
          Go to Profile
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;
