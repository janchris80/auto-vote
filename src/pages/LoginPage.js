// Your React component file

import { useEffect, useState } from 'react';
import { Col, Form, Row, Button, InputGroup } from 'react-bootstrap';
import { requestHiveLogin } from 'hooks/login.js';
import { redirect, useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [validated, setValidated] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard"
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/login', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  }, [])

  const handleLogin = async (event) => {
    try {
      const { message, success } = await requestHiveLogin(username);

      if (success) {
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    await setValidated(true);
    await handleLogin();
  };

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
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
        <Button type="submit">Login</Button>
      </Form>
      <Row>
        <Col>

          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div> */}
          {/* <button onClick={handleLogin} className='btn btn-primary'>Login</button> */}
          {/* <NavLink to='/' className='btn btn-primary'>Back</NavLink> */}
        </Col>
      </Row>
    </>
  );
}
