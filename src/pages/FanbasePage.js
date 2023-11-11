import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

export default function FanbasePage() {

  const accounts = () => {
    // hive.api.lookupAccountNames(['iamjc93'], function (err, result) {
    //   console.log(err, result);
    // }); 2470502
    // hive.api.getAccountReferences(2470502, function (err, result) {
    //   console.log(err, result);
    // });
  }
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Fanbase</h1>
          <Button onClick={accounts}>Click me</Button>
        </Col>
      </Row>
    </Container>
  );
}