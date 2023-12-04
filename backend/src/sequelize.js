// backend/src/sequelize.js
const Sequelize = require('sequelize');
const config = require('./config/config.js').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql'
});

const modelDefiners = [
  // Import model definition functions here
  // require('./models/user'),
  require('./models/follower')(sequelize, Sequelize),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

module.exports = sequelize;
