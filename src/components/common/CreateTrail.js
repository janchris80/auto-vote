import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { create, update } from 'slices/trailer';

const CreateTrail = ({ show, handleClose, curation, title, isUpdate, id }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userRef = useRef();
  const errRef = useRef();
  const [type, setType] = useState('curation');

  const handleCreate = async () => {
    // Handle form submission
    try {
      await dispatch(create({ description, type }))
    } catch (error) {
      setErrorMessage(error.message);
      errRef.current.focus();
      console.error(error);
    }

    // Close the modal after handling the submission
    await handleClose();
  };

  const handleUpdate = async () => {
    // Handle form submission
    try {
      await dispatch(update({ description, type, id }))
    } catch (error) {
      setErrorMessage(error.message);
      errRef.current.focus();
      console.error(error);
    }

    // Close the modal after handling the submission
    await handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    console.log(isUpdate && description);
    if (isUpdate && description) {
      await handleUpdate();
    } else {
      await handleCreate();
    }
  };

  useEffect(() => {
    if (curation) {
      setDescription(curation.description);
    } else {
      setDescription('')
    }
  }, [curation])

  useEffect(() => {
    if (show) {
      userRef.current.focus();
    }
  }, [show])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          errorMessage ?? <Row>
            <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
          </Row>
        }
        <Form noValidate validated={validated} onSubmit={handleSubmit} id="trailForm">
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              ref={userRef}
              required
              rows={4} // You can adjust the number of rows based on your preference
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTrail;
