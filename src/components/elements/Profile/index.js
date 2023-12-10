import FollowerList from 'components/elements/FollowerList';
import React, {  useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Button
} from "react-bootstrap";
import { useParams } from 'react-router-dom';

const Profile = ({ account, followers }) => {
  const { username } = useParams();
  const { json_metadata } = account?.hive_user
  const jsonMetadata = JSON.parse(json_metadata);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="card-user">
            <div className="card-image">
              <img
                alt="..."
                src={jsonMetadata?.profile?.cover_image}
              />
            </div>
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={jsonMetadata?.profile?.profile_image}
                  ></img>
                  <h5 className="title">@{username}</h5>
                </a>
                <p className="description">{jsonMetadata?.profile?.website}</p>
              </div>
              <p className="description text-center">
                {jsonMetadata?.profile?.about}
              </p>
            </Card.Body>
            {/* <hr></hr>
            <div className="button-container mr-auto ml-auto">
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-google-plus-square"></i>
              </Button>
            </div> */}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <FollowerList followers={followers} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
