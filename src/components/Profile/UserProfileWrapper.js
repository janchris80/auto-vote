import Missing from '../common/Missing';
import UserProfile from 'components/Profile/UserProfile';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProfileWrapper() {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const checkUsernameExists = async () => {
      // const exists = await api.checkUsernameExists(username);
      setUserExists(true);
    };

    checkUsernameExists();
  }, [username]);

  return (
    userExists ? <UserProfile /> : <Missing />
  );
}

export default UserProfileWrapper