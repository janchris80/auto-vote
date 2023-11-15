// Search/SearchResultModal.js
import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResultModal = ({ show, handleClose, user }) => {

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Header as="h3">{`@${user?.name}` || user}</Card.Header>
          <Card.Body>
            <Card.Title className='mb-2'>
              Website:
              <Link to={user?.json_metadata?.profile?.website} target='_blank'>
                {user?.json_metadata?.profile?.website}
              </Link>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user?.json_metadata?.profile?.about}</Card.Subtitle>
            <Card.Text>
              {/* <img src={user.json_metadata.profile.cover_image} /> */}
              {/* <img src={user.json_metadata.profile.profile_image} /> */}
              Post Count: {user?.post_count || 0}
              {/* <p>Follower: {user?.post_count}</p> */}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchResultModal;
