import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Define your API base URL here
const POSTING_AUTHORITY = 'Posting';
const LOGIN_REASON = 'Login using Hive';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const requestHiveLogin = async (username) => {
  try {
    const keychain = window.hive_keychain;
    if (!keychain) {
      throw new Error('Hive Keychain not found');
    }

    const response = await signBufferWithKeychain(username);
    await authenticateWithServer(username, response.result);
  } catch (error) {
    throw new Error(error.message);
  }
};

const signBufferWithKeychain = async (username) => {
  return new Promise((resolve, reject) => {
    const proof_payload = {
      account: username,
      reason: LOGIN_REASON,
    };
    const keychain = window.hive_keychain;
    keychain.requestSignBuffer(
      username,
      JSON.stringify(proof_payload),
      POSTING_AUTHORITY,
      (response) => {
        // console.log('response', response);
        if (response.success) {
          resolve(response);
        } else {
          reject(new Error('Keychain sign request failed'));
        }
      },
      null,
      LOGIN_REASON
    );
  });
};

const authenticateWithServer = async (username, result) => {
  const proof_payload = {
    account: username,
  };

  const data = {
    username: username,
    network: 'hive',
    authority_type: POSTING_AUTHORITY,
    proof_payload: JSON.stringify(proof_payload),
    proof: result,
  };

  try {
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.post('/authenticate', data);
    // console.log('_response', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
