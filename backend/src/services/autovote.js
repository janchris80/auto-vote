const axios = require('axios');
const Follower = require('../models/follower'); // Adjust the path as needed
const sequelize = require('../sequelize'); // Import your Sequelize setup

async function broadcastVotes(votes, postingPrivateKey) {
  for (let vote of votes) {
    const currentDateTime = new Date();
    currentDateTime.setMinutes(currentDateTime.getMinutes() + 70);

    const username = vote.follower.username;
    const accountWatcher = vote.user.username;
    const method = vote.voting_type;
    const userWeight = vote.weigth;

    // Making HTTP request to get account history
    const accountHistoryStartTime = Date.now();
    const response = await axios.post('https://rpc.d.buzz/', {
      jsonrpc: '2.0',
      method: 'condenser_api.get_account_history',
      params: [accountWatcher, -1, 100],
      id: 1
    });
    const accountHistories = response.data.result || [];
    const accountHistoryEndTime = Date.now();
    console.log(`Account history time: ${accountHistoryEndTime - accountHistoryStartTime} ms`);

    // Process vote operations
    let lastProcessedTxId = -1;
    let data = [];
    for (let tx of accountHistories) {
      if (tx[0] <= lastProcessedTxId) continue;
      lastProcessedTxId = tx[0];

      const op = tx[1]['op'];
      if (op[0] === 'vote' && op[1]['voter'] === accountWatcher) {
        const postAuthor = op[1]['author'];
        const postPermlink = op[1]['permlink'];
        const postWeight = op[1]['weight'];

        const weight = calculateVotingWeight(userWeight, postWeight, method);

        const vote = {
          voter: username,
          author: postAuthor,
          permlink: postPermlink,
          weight: weight,
        };

        // Check if already voted
        const voteResponse = await axios.post('https://rpc.d.buzz/', {
          jsonrpc: '2.0',
          method: 'condenser_api.get_active_votes',
          params: [postAuthor, postPermlink],
          id: 1
        });
        const activeVotes = voteResponse.data.result || [];

        const hasVoted = activeVotes.some(v => v.voter === username);
        if (!hasVoted) {
          data.push(vote);
          // Implement your vote broadcasting logic here
        }
      }
    }

    console.log(`Total votes: ${data.length}`);
  }
}

function calculateVotingWeight(userWeightOption, authorWeight, votingType) {
  if (votingType === 'fixed') {
    return userWeightOption * 100;
  } else if (votingType === 'scaled') {
    return ((userWeightOption * 100) * (authorWeight / 100));
  }
}

// Main function to initiate the vote processing
async function main() {
  const startTime = Date.now();
  const postingPrivateKey = process.env.POSTING_PRIVATE_KEY; // Set this in your environment variables

  try {
    const followers = await Follower.findAll({
      where: { enable: 1 },
      include: ['user', 'follower'] // Adjust these relations based on your Sequelize models
    });

    for (let i = 0; i < followers.length; i += 200) {
      const chunk = followers.slice(i, i + 200);
      await broadcastVotes(chunk, postingPrivateKey);
    }

    const endTime = Date.now();
    console.log(`Total time taken: ${endTime - startTime} ms`);
  } catch (error) {
    console.error('Error processing votes:', error);
  }
}

module.exports = main;