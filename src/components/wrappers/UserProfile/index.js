import Profile from 'components/elements/Profile';
import Missing from '../../elements/Missing';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import hiveService from 'api/services/hiveService';
import followerService from 'api/services/followerService';

function UserProfileWrapper() {
  const { username, trail } = useParams();
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);

  const [followers, setFollowers] = useState([]);

  const getFollowers = async () => {
    try {
      let searchUsername = filterUsername();
      const response = await followerService.getFollowers(searchUsername, trail);
      setFollowers(response?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  const filterUsername = () => username.startsWith("@") ? username.substring(1) : username;

  const checkUsernameExists = async () => {
    try {
      setLoading(true)
      let searchUsername = filterUsername();

      const result = await hiveService.searchUsername(searchUsername, trail);
      const user = result?.data?.data;

      if (user?.hive_user.length !== 0) {
        setAccount(user);
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUsernameExists();
  }, [username]);

  useEffect(() => {
    if (userExists) {
      getFollowers();
    }
  }, [userExists])

  useEffect(() => {
    if (userExists) {
      console.log('loading', loading, userExists);
      setLoading(false);
    }
  }, [loading, userExists])

  return (
    loading ? 'Loading...' : (userExists ? <Profile account={account} followers={followers} /> : <Missing />)
  );
}

export default UserProfileWrapper