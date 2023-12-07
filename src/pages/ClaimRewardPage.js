import {
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update as updateUser } from 'slices/auth';

const ClaimRewardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [authorizeAccount, setAuthorizeAccount] = useState('');
  const [isAutoClaimReward, setIsAutoClaimReward] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAuthorizeAccount(user.authorizeAccount);
      setIsAutoClaimReward(user.isAutoClaimReward);
    }
  }, [user]);

  const handleSubmit = () => {
    try {
      setLoading(true);
      if (window.confirm('Are you sure?')) {
        dispatch(updateUser({
          requestType: 'is_auto_claim_reward',
          isAutoClaimReward: !isAutoClaimReward,
        }))
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

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
                    <span style={{ color: isAutoClaimReward ? 'green' : 'red' }}>
                      {isAutoClaimReward ? 'Enabled' : 'Disabled'}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      style={{ marginTop: '5px' }}
                      disabled={loading}
                      variant={!isAutoClaimReward ? "success" : "danger"}
                      onClick={() => handleSubmit()}
                    >
                      {loading ? 'Loading...' : (!isAutoClaimReward ? 'Click to Enable' : 'Click to Disable')}
                    </Button>
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