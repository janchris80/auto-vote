import React, { useState, useEffect } from 'react';
import hive from '@hiveio/hive-js';
import { KeychainSDK } from "keychain-sdk";
import useAuth from './useAuth';

const AutoVote = () => {
  const [lastProcessedTxId, setLastProcessedTxId] = useState(-1);
  const { username } = useAuth();

  const watcherAccount = 'dbuzz'; // Account to watch votes from
  // const voterAccount = ''; // Account which will cast votes
  // const voterPrivateKey = ''; // Private posting key of the account you want to vote with

  useEffect(() => {
    // Connect to a Hive node
    hive.api.setOptions({ url: 'https://rpc.ecency.com/' });
    hive.config.set('alternative_api_endpoints', [
      'https://api.hive.blog',
      'https://rpc.ecency.com/',
      'https://hive-api.3speak.tv/',
      'https://hived.privex.io',
      'https://anyx.io',
      'https://api.deathwing.me',
      'https://hived.emre.sh',
      'https://hive-api.arcange.eu',
      'https://api.openhive.network',
      'https://techcoderx.com',
      'https://hive.roelandp.nl',
      'https://api.c0ff33a.uk',
    ]);


    const keychain = new KeychainSDK(window);

    // Function to watch the account for votes
    const watchAccount = async () => {
      try {
        const result = await hive.api.getAccountHistoryAsync(watcherAccount, -1, 100);

        const voteOps = result
          .filter((tx) => tx[0] > lastProcessedTxId) // Only process new transactions
          .map((tx) => {
            setLastProcessedTxId(tx[0]); // Update the last processed transaction ID
            return tx[1].op;
          })
          .filter((op) => op[0] === 'vote' && op[1].voter === watcherAccount);

        console.log('lastProcessedTxId', lastProcessedTxId);
        console.log('voteOps', voteOps);
        console.log('result', result);

        for (const voteOp of voteOps) {
          const postAuthor = voteOp[1].author;
          const postPermlink = voteOp[1].permlink;
          const weight = voteOp[1].weight; // Capture the weight from the original vote

          // Check if our voter account has already voted on this post
          const votes = await hive.api.getActiveVotesAsync(postAuthor, postPermlink);
          console.log('votes', votes);

          const hasVoted = votes.some((v) => v.voter === username);
          if (!hasVoted) {
            // await votePost(postAuthor, postPermlink, weight);

            console.log({
              username,
              author: postAuthor,
              permlink: postPermlink,
              weight: weight,
            });
            // use this from hive keychain
            await keychain.vote({
              username,
              author: postAuthor,
              permlink: postPermlink,
              weight: weight,
            })
          }
        }
      } catch (err) {
        console.error('Error fetching account history:', err);
      }
    };

    // Start watching for votes
    watchAccount();

    // Run watchAccount every 10 seconds
    const intervalId = setInterval(watchAccount, 60000);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, [lastProcessedTxId, username]);

  return <div>Watching for votes...</div>;
};

export default AutoVote;
