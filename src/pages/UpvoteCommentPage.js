import UpvoteCommentForm from 'components/common/UpvoteCommentForm';
import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Table, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UpvoteCommentPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [commentUpvoteList, setCommentUpvoteList] = useState([]); // Assuming userData is an array of user data
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleFormToggle = () => setShowForm(!showForm);


  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3>Welcome {username},</h3>
              <p>
                This page lets you upvote on users comments automatically when they comment on your posts!
                {/* ... rest of the content ... */}
              </p>
              <center>
                <Button variant="success" style={{ marginTop: '8px' }} onClick={() => handleFormToggle()}>
                  Add a User to the List
                </Button>
              </center>

              <UpvoteCommentForm show={showForm} onHide={() => handleFormToggle()}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Check if user data exists and render accordingly */}
      {commentUpvoteList.length > 0 && (
        <Row className="row" style={{ margin: '0 !important' }}>
          <Col>
            <Card>
              <Card.Body>
                <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '10px' }}>You Are following:</h3>
                <div style={{ maxHeight: '600px', overflow: 'auto' }} className="table-responsive-vertical shadow-z-1">
                  <Table hover className="table table-mc-light-blue">
                    {/* Table headers and body */}
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default UpvoteCommentPage;
