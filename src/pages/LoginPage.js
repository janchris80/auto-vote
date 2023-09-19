// Your React component file

import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { requestHiveLogin } from 'hooks/login.js';
import { useHistory, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.js'

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const history = useHistory();
  const { login, isLoggedIn } = useAuth();

  const handleLogin = async () => {
    if (!username) return;

    try {
      await requestHiveLogin(username)
      await login();

      history.push('/dashboard')
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/dashboard')
    }
  }, [])

  return (
    <>
      <Row>
        <Col md="6">
          <div className="form-group">
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
          </div>
          <button onClick={handleLogin} className='btn btn-primary'>Login</button>
          <NavLink to='/' className='btn btn-primary'>Back</NavLink>
        </Col>
      </Row>
    </>
  );
}
