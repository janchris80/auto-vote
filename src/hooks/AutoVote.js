import React, { useState, useEffect } from 'react';
import hive from '@hiveio/hive-js';

const AutoVote = () => {
  const [lastProcessedTxId, setLastProcessedTxId] = useState(-1);

  const watcherAccount = 'dbuzz'; // Account to watch votes from
  const voterAccount = 'iamjc93'; // Account which will cast votes
  const voterPrivateKey = '5Ji9X9tD2BXYesYz6PJAGZX1AERNHu4j4951Z91HFJHiYcwDcei'; // Private posting key of the account you want to vote with

  useEffect(() => {
    // Connect to a Hive node
    hive.api.setOptions({ url: 'https://rpc.ecency.com/' });

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

        for (const voteOp of voteOps) {
          const postAuthor = voteOp[1].author;
          const postPermlink = voteOp[1].permlink;
          const weight = voteOp[1].weight; // Capture the weight from the original vote

          // Check if our voter account has already voted on this post
          const votes = await hive.api.getActiveVotesAsync(postAuthor, postPermlink);
          console.log('votes', votes);

          const hasVoted = votes.some((v) => v.voter === voterAccount);
          if (!hasVoted) {
            await votePost(postAuthor, postPermlink, weight);
          }
        }
        console.log(result);
      } catch (err) {
        console.error('Error fetching account history:', err);
      }
    };

    // Function to vote for a post
    const votePost = async (author, permlink, weight) => {
      try {
        // TODO: uncomment to activate the voting.
        // const result = await hive.broadcast.voteAsync(
        //   voterPrivateKey,
        //   voterAccount,
        //   author,
        //   permlink,
        //   weight
        // );

        console.log(
          `Successfully voted for post by ${author} with permlink ${permlink} and weight ${weight}`
        );
      } catch (err) {
        console.error('Error voting:', err);
      }
    };



    // Start watching for votes
    watchAccount();

    // Run watchAccount every 10 seconds
    const intervalId = setInterval(watchAccount, 20000);

    // Cleanup the interval on unmount
    return () => clearInterval(intervalId);
  }, [lastProcessedTxId, voterAccount, voterPrivateKey]);

  return <div>Watching for votes...</div>;
};

export default AutoVote;
