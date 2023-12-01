import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ClaimRewardPage = () => {
  const { user } = useSelector((state) => state.auth);

  const [claimReward, setClaimReward] = useState(false);
  const [username, setUsername] = useState('');
  const [authorizeAccount, setAuthorizeAccount] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAuthorizeAccount(user.authorizeAccount);
      setClaimReward(user.claimReward);
    }
  }, [user]);

  useEffect(() => {
    // You can also add your logic here for automatic updates or API calls
  }, [claimReward]);

  const handleEnable = () => {
    setClaimReward(true);
    // Add your logic to enable the reward
  };

  const handleDisable = () => {
    setClaimReward(false);
    // Add your logic to disable the reward
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <h3>Welcome {username},</h3>
                    <p>Here you can enable or disable <strong>{authorizeAccount}</strong> from automatically claiming your rewards.</p>
                    <p><strong>More info:</strong> Usually you redeem your curation and author rewards by clicking on a button in your wallet on Hive Keychain Extension.</p>
                    <p>This handy tool means you don't need to click on that button manually, since it does that job for you automatically!</p>
                    <p>Every 15 minutes this tool will check your account and will transfer your pending rewards to your balance.</p>
                    <p>
                      This tool is safe to use because <strong>{authorizeAccount}</strong> only has access to your posting authority. That means it can only claim your rewards and cannot access any of the funds in your wallet.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Status:</strong>
                    <span style={{ color: claimReward ? 'green' : 'red' }}>
                      {claimReward ? 'Enabled' : 'Disabled'}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {claimReward ? (
                      <Button style={{ marginTop: '5px' }} variant="danger" onClick={handleDisable}>Click to Disable</Button>
                    ) : (
                      <Button style={{ marginTop: '5px' }} variant="success" onClick={handleEnable}>Click to Enable</Button>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ClaimRewardPage