module.exports = (sequelize, DataTypes) => {
  const Attendant = sequelize.define(
    'Assistant',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Assistant.associate = (models) => {
    // associations can be defined here
  };
  return Assistant;
};
