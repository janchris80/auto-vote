import { useState } from 'react';
import { useEffect } from "react";
// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useSelector } from 'react-redux';


export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(user?.username)
  }, [user])

  const [powerLimit, setPowerLimit] = useState('');
  const [powernow, setPowerNow] = useState('');
  const [name, setName] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure?')) return;
    // Handle your form submission logic here
  };

  useEffect(() => {
    const handleLogin = async () => {
      console.log('login in ');
    }

    const loginButtons = document.querySelectorAll(".login-button");
    loginButtons.forEach((button) => {
      button.addEventListener("click", handleLogin);
    });

    return () => {
      loginButtons.forEach((button) => {
        button.removeEventListener("click", handleLogin);
      });
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5 style={{ color: "red" }}>
                Please leave Steemauto if you don't understand how it works or what it does. You could harm your Steem account if you change settings that you do not understand.
              </h5>
              <h3>Welcome {username},</h3>
              <br />
              Please Choose One:
              <br />
              <a href="#settings" onClick={() => document.getElementById("settings").scrollIntoView()} className="btn btn-warning">
                Settings
              </a>
              <br />
              <br />
              <a href="dash.php?i=1" className="btn btn-primary">
                Curation Trail
              </a>
              <a href="dash.php?i=2" className="btn btn-primary">
                Fanbase
              </a>
              <br />
              <a style={{ marginTop: 5 }} href="dash.php?i=13" className="btn btn-primary">
                Upvote Comments
              </a>
              <a style={{ marginTop: 5 }} href="dash.php?i=11" className="btn btn-primary">
                Schedule Posts
              </a>
              <br />
              <a style={{ marginTop: 5 }} href="dash.php?i=16" className="btn btn-primary">
                Claim Rewards
              </a>
              <br />
              <hr />
              <p>You can remove SteemAuto's access from your account by using SteemConnect</p>
              <a href="https://steemconnect.com/revoke/@steemauto" className="btn btn-danger">
                Unauthorize (Leave SteemAuto)
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card id="settings">
            <Card.Body>
              <center>
                <h4 style={{ borderBottom: '1px solid #000', paddingBottom: '10px' }}>Settings</h4>
              </center>
              <strong>Upvoting status:</strong>
              <span id="upvoting_status"></span>
              <br />
              <strong>Current Mana:</strong>
              <span id="voting_power"></span>
              <br />
              <strong>Limit on Mana:</strong>
              <span>
                100% <Button variant="link" onClick={() => setLimitPower(!limitPower)}>
                  (Click to edit)
                </Button>
              </span>
              <br />
              <Form onSubmit={handleFormSubmit} style={{ display: 'none' }}>
                <Form.Group>
                  <Form.Label htmlFor="powerlimit">Mana limitation (%):</Form.Label>
                  <Form.Control
                    id="powerlimit"
                    name="powerlimit"
                    type="number"
                    min="1"
                    max="99"
                    step="0.01"
                    value={powerLimit}
                    onChange={(e) => setPowerLimit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" style={{ marginTop: '5px' }} variant="primary">
                  Submit
                </Button>
              </Form>
              <br />
              <p>All your upvotes will be paused if your Mana is lower than the Mana limitation.</p>
              <p>Read more about Mana in the Steemit FAQ.</p>
              <p>
                You can check your Mana here: <a href="https://steemd.com/@iamjc93">https://steemd.com/@iamjc93</a>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

  );
}


