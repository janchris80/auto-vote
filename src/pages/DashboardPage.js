import { useState, useEffect } from 'react';
import hiveService from 'api/services/hiveService';
import hive from '@hiveio/hive-js';
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
  const dispatch = useDispatch();
  const { user, isAuthorizeApp } = useSelector((state) => state.auth);

  const [authorizeAccount, setAuthorizeAccount] = useState('');
  const [upvotingStatus, setUpvotingStatus] = useState({});
  const [downvotingStatus, setDownvotingStatus] = useState({});
  const [currentUpvoteMana, setCurrentUpvoteMana] = useState(100);
  const [currentDownvoteMana, setCurrentDownvoteMana] = useState(100);
  const [showUpvoteForm, setShowUpvoteForm] = useState(false);
  const [showDownvoteForm, setShowDownvoteForm] = useState(false);
  const [updateLimitUpvoteMana, setUpdateLimitUpvoteMana] = useState(1);
  const [updateLimitDownvoteMana, setUpdateLimitDownvoteMana] = useState(1);

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [limitUpvoteMana, setLimitUpvoteMana] = useState(100);
  const [limitDownvoteMana, setLimitDownvoteMana] = useState(100);
  const [isPause, setIsPause] = useState(true);
  const [isEnable, setIsEnable] = useState(false);
  const [isAutoClaimReward, setIsAutoClaimReward] = useState(false);
  const [account, setAccount] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAuthorizeAccount(user.authorizeAccount);
      setIsAutoClaimReward(user.isAutoClaimReward);
      setIsPause(user.isPause);
      setIsEnable(user.isEnable);
      setLimitUpvoteMana(user?.limitUpvoteMana / 100)
      setLimitDownvoteMana(user?.limitDownvoteMana / 100)
    }
  }, [user]);

  useEffect(() => {
    console.log('fetching getHiveAccount()');
    getHiveAccount();
  }, [])

  useEffect(() => {
    if (account) {
      console.log('setAuthorized', isUserAuthorized(authorizeAccount));
      setAuthorized(isUserAuthorized(authorizeAccount));
    }
  }, [account])


  useEffect(() => {
    if (authorized) {
      console.log('Authorized! Updating database');
      try {
        dispatch(updateUser({
          isEnable: true,
          requestType: 'is_enable',
        }))
        console.log('done');
      } catch (error) {
        console.error('Error: Updating dabase ', error);
      }
    }
  }, [authorized])

  const getHiveAccount = async () => {
    try {
      const result = await hiveService.getAccounts([user.username]);
      if (result[0]) {
        setAccount(result[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const isUserAuthorized = (keyToCheck) => {
    if (account) {
      // Extracting active and posting keys and account authorizations from the user data
      const postingAccounts = account.posting.account_auths.map(accountAuth => accountAuth[0]);

      // Checking if the provided key is in either the active or posting keys or accounts
      return postingAccounts.includes(keyToCheck);
    }

    return false;
  }

  useEffect(() => {
    console.log('computing', isAuthorizeApp, authorized);
    if (isAuthorizeApp || authorized) {
      const handleSettings = async () => {
        setLoading(true);

        try {

          if (account) {
            let delegated = parseFloat(account.delegated_vesting_shares.replace('VESTS', ''));
            let received = parseFloat(account.received_vesting_shares.replace('VESTS', ''));
            let vesting = parseFloat(account.vesting_shares.replace('VESTS', ''));
            let withdrawRate = 0;

            if (parseInt(account.vesting_withdraw_rate.replace('VESTS', '')) > 0) {
              withdrawRate = Math.min(
                parseInt(account.vesting_withdraw_rate.replace('VESTS', '')),
                parseInt((account.to_withdraw - account.withdrawn) / 1000000)
              );
            }

            let totalvest = vesting + received - delegated - withdrawRate
            let maxMana = Number(totalvest * Math.pow(10, 6))

            setCurrentUpvoteMana(calculatePercent(account.voting_manabar.current_mana, account.voting_manabar.last_update_time, maxMana));
            setCurrentDownvoteMana(calculatePercent(account.downvote_manabar.current_mana, account.downvote_manabar.last_update_time, maxMana));
          }
        } catch (error) {
          console.error('Error making the request:', error);
        } finally {
          setLoading(false);
        }
      };

      console.log("handleSettings()");
      handleSettings();

      if (parseFloat(currentUpvoteMana) < parseFloat(limitUpvoteMana)) {
        setUpvotingStatus({
          text: 'Paused',
          color: 'danger',
        });
      } else {
        setUpvotingStatus({
          text: 'Normal',
          color: 'success',
        });
      }

      if (parseFloat(currentDownvoteMana) < parseFloat(limitDownvoteMana)) {
        setDownvotingStatus({
          text: 'Paused',
          color: 'danger',
        });
      } else {
        setDownvotingStatus({
          text: 'Normal',
          color: 'success',
        });
      }
    }
  }, [isAuthorizeApp, account, limitUpvoteMana, currentUpvoteMana, limitDownvoteMana, currentDownvoteMana]);

  const calculatePercent = (mana, lastUpdateTime, maxMana) => {
    let delta = (Date.now() / 1000 - lastUpdateTime);
    let currentMana = Number(mana) + (delta * maxMana / 432000)
    let percentage = Math.round(currentMana / maxMana * 10000)
    let percent = (Math.min(Math.max(percentage, 0), 10000) / 100).toFixed(2)
    return parseFloat(percent);
  }

  useEffect(() => {
    if (showUpvoteForm) {
      setShowDownvoteForm(false)
    }

    if (showDownvoteForm) {
      setShowUpvoteForm(false)
    }

  }, [showUpvoteForm, showDownvoteForm])

  const handleUpvoteFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm('Are you sure?')) {
        dispatch(updateUser({
          limitPower: updateLimitUpvoteMana,
          isPause: isPause,
          isEnable: isEnable,
          requestType: 'upvote',
        }))
        setShowUpvoteForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleDownvoteFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm('Are you sure?')) {
        dispatch(updateUser({
          limitPower: updateLimitDownvoteMana,
          isPause: isPause,
          isEnable: isEnable,
          requestType: 'downvote',
        }))
        setShowDownvoteForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handleSetUpdateLimitUpvoteMana = (e, type) => setUpdateLimitUpvoteMana(e.target.value);
  const handleSetUpdateLimitDownvoteMana = (e, type) => setUpdateLimitDownvoteMana(e.target.value);

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
                  <div className={currentUpvoteMana ? 'none' : ''}>
                    <h5 className='font-weight-bold'>
                      Upvoting status:
                      {!loading ? <span className={`text-${upvotingStatus?.color} ml-1`}>{upvotingStatus?.text}</span> : 'Loading...'}
                    </h5>
                    <h5 className='font-weight-bold'>
                      Current Upvote Mana: {!loading ? `${currentUpvoteMana}%` : 'Loading...'}
                    </h5>
                    <h5 className='font-weight-bold mx-auto'>
                      Upvote Mana threshold:
                      <span> {!loading ? `${limitUpvoteMana}%` : 'Loading...'}
                        <Button size='sm' variant="Link" className='ml-1' onClick={() => setShowUpvoteForm(!showUpvoteForm)}>
                          (Click to edit)
                        </Button>
                      </span>
                    </h5>
                  </div>
                  <Form onSubmit={(e) => handleUpvoteFormSubmit(e)} style={{ display: showUpvoteForm ? 'block' : 'none' }}>
                    <Form.Group>
                      <Form.Label htmlFor="powerlimit">Mana limitation (%):</Form.Label>
                      <Form.Control
                        id="powerlimit"
                        name="powerlimit"
                        type="number"
                        min="1"
                        max="100"
                        step="0.01"
                        value={updateLimitUpvoteMana}
                        onChange={(e) => handleSetUpdateLimitUpvoteMana(e)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" style={{ marginTop: '5px' }} variant="primary">
                      Submit
                    </Button>
                  </Form>
                  <div>
                    <h5 className='font-weight-bold'>
                      Downvoting status:
                      {!loading ? <span className={`text-${downvotingStatus?.color} ml-1`}>{downvotingStatus?.text}</span> : 'Loading...'}
                    </h5>
                    <h5 className='font-weight-bold'>
                      Current Downvote Mana: {!loading ? `${currentDownvoteMana}%` : 'Loading...'}
                    </h5>
                    <h5 className='font-weight-bold mx-auto'>
                      Downvote Mana threshold:
                      <span> {!loading ? `${limitDownvoteMana}%` : 'Loading...'}
                        <Button size='sm' variant="Link" className='ml-1' onClick={() => setShowDownvoteForm(!showDownvoteForm)}>
                          (Click to edit)
                        </Button>
                      </span>
                    </h5>
                  </div>
                  <Form onSubmit={(e) => handleDownvoteFormSubmit(e)} style={{ display: showDownvoteForm ? 'block' : 'none' }}>
                    <Form.Group>
                      <Form.Label htmlFor="powerlimit">Mana limitation (%):</Form.Label>
                      <Form.Control
                        id="powerlimit"
                        type="number"
                        min="1"
                        max="100"
                        step="0.01"
                        value={updateLimitDownvoteMana}
                        onChange={(e) => handleSetUpdateLimitDownvoteMana(e)}
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
