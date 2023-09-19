import AutoVote from 'hooks/AutoVote';
import { useEffect } from "react";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";


export default function DashboardPage() {

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
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="card-stats text-center">
              <Card.Header>
                <h5 className='text-danger'>
                  Please leave HiveVote if you don't understand how it works or what it does.
                  You could harm your Hive account if you change settings that you do not understand
                </h5>
                <h3>Welcome iamjc93,</h3>
              </Card.Header>
              <Card.Body className='mb-3'>
                <a className="btn btn-button login-button" disabled href="#">Hive Keychain (recommended)</a>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <AutoVote />
          </Col>
        </Row>
      </Container>
    </>
  );
}


