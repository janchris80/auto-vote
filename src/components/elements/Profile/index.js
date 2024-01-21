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
  const { metadata, name, stats, post_count, reputation } = account?.hive_user;

  const { trail } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    handleTrailTitle();
  }, [trail]);

  const handleTrailTitle = () => {
    const trailTitles = {
      curation: 'Curation Trail',
      downvote: 'Downvote Trail',
      upvote_comment: 'Upvote Comments',
      upvote_post: 'Upvote Posts',
    };

    setTitle(trailTitles[trail] || '');
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card className="card-user">
            <div className="card-image">
              <img
                alt="..."
                src={metadata?.profile?.cover_image}
              />
            </div>
            <Card.Body>
              <div className="author">
                <a href={`https://d.buzz/@${name}`} onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={metadata?.profile?.profile_image}
                  ></img>
                  <h5 className="title">{metadata?.profile?.name}</h5>
                </a>
                <a href={metadata?.profile?.website} className="description">{metadata?.profile?.website}</a>
              </div>
              <p className="description text-center">
                {metadata?.profile?.about}
              </p>
            </Card.Body>
            <hr />
            <h5 className='text-center'>Hive Stats</h5>
            <div className="m-auto">
              <Row>
                <Col>
                  <p>Followers: {stats?.followers ?? 0}</p>
                </Col>
                <Col>
                  <p>Following: {stats?.following ?? 0}</p>
                </Col>
                <Col>
                  <p>Rank: {stats?.rank ?? 0}</p>
                </Col>
                <Col>
                  <p>Reputation: {reputation ?? 0}</p>
                </Col>
                <Col>
                  <p>Post Count: {post_count ?? 0}</p>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h4">Follower of {title}</Card.Title>
              <p className="card-category">List of usernames</p>
            </Card.Header>
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
