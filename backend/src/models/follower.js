// models/Follower.js
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the name of your User table
        key: 'id'
      }
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // This should match the name of your User table
        key: 'id'
      }
    },
    votingType: {
      type: DataTypes.STRING, // 'scaled', 'fixed'
      allowNull: false
    },
    followerType: {
      type: DataTypes.STRING, // 'curation', 'downvote', 'fanbase'
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    afterMin: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dailyLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    limitLeft: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'followers',
    timestamps: false
  });

  Follower.associate = (models) => {
    // Assuming your User model is named 'User'
    Follower.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Follower.belongsTo(models.User, { foreignKey: 'followerId', as: 'follower' });
  };

  return Follower;
};
