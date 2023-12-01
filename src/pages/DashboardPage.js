import hiveService from 'api/services/hiveService';
import { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { update as updateUser } from 'slices/auth';
import { removeAccountAuthority, addAccountAuthority } from 'slices/auth';

export default function DashboardPage() {
  const { user, isAuthorizeApp } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [authorizeAccount, setAuthorizeAccount] = useState('');
  const [upvotingStatus, setUpvotingStatus] = useState('Normal');
  const [upvotingStatusColor, setUpvotingStatusColor] = useState('success');
  const [votingPower, setVotingPower] = useState(0.00);
  const [powerLimit, setPowerLimit] = useState(false);
  const [limitPower, setLimitPower] = useState(100);
  const [updateLimitPower, setUpdateLimitPower] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(user?.username);
    setAuthorizeAccount(user?.authorizeAccount);
  }, [user]);

  // only run if isAuthorizeApp = 1, default is 0
  useEffect(() => {
    if (isAuthorizeApp) {
      const handleSettings = async () => {
        setLoading(true);

        try {
          const result = await hiveService.getAccounts([username]);
          const userAcc = result[0];

          if (userAcc) {
            let delegated = parseFloat(userAcc.delegated_vesting_shares.replace('VESTS', ''));
            let received = parseFloat(userAcc.received_vesting_shares.replace('VESTS', ''));
            let vesting = parseFloat(userAcc.vesting_shares.replace('VESTS', ''));
            let withdrawRate = 0;

            if (parseInt(userAcc.vesting_withdraw_rate.replace('VESTS', '')) > 0) {
              withdrawRate = Math.min(
                parseInt(userAcc.vesting_withdraw_rate.replace('VESTS', '')),
                parseInt((userAcc.to_withdraw - userAcc.withdrawn) / 1000000)
              );
            }

            let totalvest = vesting + received - delegated - withdrawRate
            let maxMana = Number(totalvest * Math.pow(10, 6))
            let delta = Date.now() / 1000 - userAcc.voting_manabar.last_update_time
            let current_mana = Number(userAcc.voting_manabar.current_mana) + (delta * maxMana / 432000)
            let percentage = Math.round(current_mana / maxMana * 10000)

            if (!isFinite(percentage)) percentage = 0
            if (percentage > 10000) percentage = 10000
            else if (percentage < 0) percentage = 0

            let percent = (percentage / 100).toFixed(2)

            setVotingPower(percent);
          }
        } catch (error) {
          console.error('Error making the request:', error);
        } finally {
          setLoading(false);
        }
      };

      handleSettings();

      if (parseFloat(votingPower) < parseFloat(limitPower)) {
        setUpvotingStatus('Paused');
        setUpvotingStatusColor('danger');
        setPaused(true)
      } else {
        setUpvotingStatus('Normal');
        setUpvotingStatusColor('success');
        setPaused(false)
      }

      setLimitPower(user?.limitPower)

    }
  }, [user, limitPower, isAuthorizeApp, votingPower]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm('Are you sure?')) {
        dispatch(updateUser({
          currentPower: parseFloat(votingPower),
          limitPower: parseFloat(updateLimitPower),
          paused
        }))
        setPowerLimit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleLogin = () => {
      console.log('Logging in');
    };

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

  const handleAddAuthority = async () => {
    try {
      await dispatch(addAccountAuthority({ username, authorizeAccount }));
    } catch (error) {
      console.error({ error });
    }
  };

  const handleRemoveAuthority = async () => {
    try {
      await dispatch(removeAccountAuthority({ username, authorizeAccount }));
    } catch (error) {
      console.error({ error });
    }
  };

  const handleSetUpdateLimitPower = (e) => setUpdateLimitPower(e.target.value);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h5 style={{ color: "red" }}>
                Please leave Autovote if you don't understand how it works or what it does. You could harm your hive account if you change settings that you do not understand.
              </h5>
              <h3>Welcome {username},</h3>
              <hr />
              <div className=''>
                {isAuthorizeApp
                  ? <>
                    <p>You can remove <strong>{authorizeAccount}</strong>'s access from your account by using Hive Keychain (extension/mobile) or you can click the button <strong>Unauthorize</strong>.</p>
                    <Button variant='danger' onClick={() => handleRemoveAuthority()}>
                      Unauthorize (Leave {authorizeAccount})
                    </Button>
                  </>
                  : <>
                    <p>Please add @{authorizeAccount} to your account's posting auths using one of the following apps:</p>
                    <Button variant="success" onClick={() => handleAddAuthority()}>
                      Authorize {authorizeAccount}
                    </Button>
                    <p>If you don't add @{authorizeAccount} to your posting auths, you will not be able to use our site.</p>
                  </>}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {isAuthorizeApp
        ? <>
          <Row>
            <Col>
              <Card id="settings">
                <Card.Body>
                  <center>
                    <h4 style={{ borderBottom: '1px solid #000', paddingBottom: '10px' }}>Settings</h4>
                  </center>
                  <h5 className='font-weight-bold'>
                    Upvoting status:
                    {!loading ? <span className={`text-${upvotingStatusColor} ml-1`}>{upvotingStatus}</span> : 'Loading...'}
                  </h5>
                  <h5 className='font-weight-bold'>
                    Current Mana: {!loading ? `${votingPower}%` : 'Loading...'}
                  </h5>
                  <h5 className='font-weight-bold mx-auto'>
                    Limit on Mana:
                    <span> {!loading ? `${limitPower}%` : 'Loading...'}
                      <Button size='sm' variant="Link" className='ml-1' onClick={() => setPowerLimit(!powerLimit)}>
                        (Click to edit)
                      </Button>
                    </span>
                  </h5>
                  <Form onSubmit={handleFormSubmit} style={{ display: powerLimit ? 'block' : 'none' }}>
                    <Form.Group>
                      <Form.Label htmlFor="powerlimit">Mana limitation (%):</Form.Label>
                      <Form.Control
                        id="powerlimit"
                        name="powerlimit"
                        type="number"
                        min="1"
                        max="99"
                        step="0.01"
                        value={updateLimitPower}
                        onChange={(e) => handleSetUpdateLimitPower(e)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: '5px' }} variant="primary">
                      Submit
                    </Button>
                  </Form>
                  <br />
                  <p>All your upvotes will be paused if your Mana is lower than the Mana limitation.</p>
                  <p>Read more about Mana in the Steemit FAQ.</p>
                  <p>
                    You can check your Mana here: <a href={`https://hiveblocks.com/${username}`}>https://hiveblocks.com/{username}</a>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
        : ''
      }
    </Container>
  );
}
