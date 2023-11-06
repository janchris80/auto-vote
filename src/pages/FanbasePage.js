import hiveJs from 'lib/hive-js';
import React from "react";
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

export default function FanbasePage() {

  const hive = hiveJs();

  const accounts = () => {
    // hive.api.lookupAccountNames(['iamjc93'], function (err, result) {
    //   console.log(err, result);
    // }); 2470502

    hive.api.getAccountReferences(2470502, function (err, result) {
      console.log(err, result);
    });


  }


  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <h1>Fanbase</h1>
            <Button onClick={accounts}>Click me</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}