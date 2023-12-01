import FollowerList from 'components/common/FollowerList';
import React, { useEffect } from "react";

import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import Profile from './Profile';

const UserProfile = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Profile />
        </Col>
      </Row>
      <Row>
        <Col>
          <FollowerList />
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
