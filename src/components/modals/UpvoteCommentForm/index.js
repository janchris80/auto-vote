import instance from 'api/axios/instance';
import hiveService from 'api/services/hiveService';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

const UpvoteCommentForm = ({ show, onHide, data }) => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [display, setDisplay] = useState(false);
  const [weight, setWeight] = useState(0);
  const [searchMessage, setSearchMessage] = useState({color: 'success', text: ''});
  const [username, setUsername] = useState(null);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {

  }, [show])

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    // Use the state values id, status, method, type, weight, waitTime
    const cancelTokenSource = instance.createCancelToken();
    try {

      setIsSubmitted(true)
    } catch (error) {
      setIsSubmitted(false)
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      onHide();
      setDisplay(false);
    }
  }, [isSubmitted])

  const handleSetUsername = (e) => {
    setUsername(e.target.value);
    if (timerId) clearTimeout(timerId);
    // fetch after 1 sec not typing
    const newTimerId = setTimeout(() => fetchUser(e.target.value), 1000);
    setTimerId(newTimerId);
  };

  const fetchUser = async (username) => {
    setDisplay(true);
    try {
      const result = await hiveService.getAccounts([username]);
      if (result[0]) {
        console.log(result);
        setSearchMessage({
          text: 'User found.',
          color: 'success',
        });
      } else {
        setSearchMessage({
          text: 'No User found.',
          color: 'danger',
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Fill the form and Click on Submit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Commenter's Username without @</Form.Label>
            <Form.Control maxLength={16} type="text" placeholder="For example: dbuzz" required onChange={(e) => handleSetUsername(e)} />
            {
              display && <Form.Text className={`text-muted text-${searchMessage.color}`}>
                {searchMessage.text }
              </Form.Text>
            }
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Upvote Weight (%)</Form.Label>
            <Form.Control type="number" min={0.01} max={100} step={0.01} onChange={(e) => setWeight(e.target.value)} required placeholder="For example: 20" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpvoteCommentForm;
