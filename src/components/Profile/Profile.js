import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Profile = () => {
  // Get the username from the route parameters
  const { username } = useParams();

  useEffect(() => {

    // return () => {};
  }, [username])

  return (
    <Card className="card-user">
      <div className="card-image">
        <img
          alt="..."
          src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
        ></img>
      </div>
      <Card.Body>
        <div className="author">
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="avatar border-gray"
              src={require("assets/img/faces/face-3.jpg")}
            ></img>
            <h5 className="title">{username}</h5>
          </a>
          <p className="description">{username}</p>
        </div>
        <p className="description text-center">
          description text
        </p>
      </Card.Body>
      <hr></hr>
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
      </div>
    </Card>
  );
};

export default Profile;
