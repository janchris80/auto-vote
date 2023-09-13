import React from "react";
import ChartistGraph from "react-chartist";
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
import Watcher from 'hooks/Watcher'; // TODO: this import is need to comment to remove the bug

function Dashboard() {

  const goAuthSc = () => {
    console.log('test');
  }

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
                <a className="btn btn-button" href="#" onClick={() => goAuthSc()}>Hive Keychain (recommended)</a>
              </Card.Body>
              <Card.Footer>
              </Card.Footer>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Watcher />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
