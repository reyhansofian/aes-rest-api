module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('messages', {
    messages: DataTypes.TEXT,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
  });

  return Messages;
};
