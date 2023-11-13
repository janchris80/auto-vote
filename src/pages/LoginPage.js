import { useRef, useState, useEffect } from 'react';
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { login } from 'slices/auth';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      return <Navigate to="/" />;
    }

    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMessage('');
  }, [username])

  const handleLogin = async (event) => {
    try {
      await dispatch(login({ username }));
      setUsername('');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage(`${err.message}`);
      errRef.current.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    await handleLogin();
  };

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row>
        <p ref={errRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
      </Row>
      <Row>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              ref={userRef}
              value={username}
              onChange={handleUsername}
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Button type="submit" onClick={handleLogin}>Login</Button>
    </Form>
  );
}
