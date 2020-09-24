module.exports = (sequelize, DataTypes) => {
  const Madlib = sequelize.define("Madlib", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updates: {
      type: DataTypes.BOOLEAN,
    },
    rules: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    clickCount: {
      type: DataTypes.INTEGER,
    },
    numberOne: {
      type: DataTypes.INTEGER,
    },
    numberTwo: {
      type: DataTypes.INTEGER,
    },
    schoolSubjectOne: {
      type: DataTypes.STRING,
    },
    schoolSubjectTwo: {
      type: DataTypes.STRING,
    },
    foodOne: {
      type: DataTypes.STRING,
    },
    foodTwo: {
      type: DataTypes.STRING,
    },
    adjectiveOne: {
      type: DataTypes.STRING,
    },
    adjectiveTwo: {
      type: DataTypes.STRING,
    },
    place: {
      type: DataTypes.STRING,
    },
    object: {
      type: DataTypes.STRING,
    },
    yearFromPast: {
      type: DataTypes.STRING,
    },
    halloweenCostume: {
      type: DataTypes.STRING,
    },
    colorOne: {
      type: DataTypes.STRING,
    },
    colorTwo: {
      type: DataTypes.STRING,
    },
    largeNumber: {
      type: DataTypes.INTEGER,
    },
    exclamation: {
      type: DataTypes.STRING,
    },
    noun: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    animal: {
      type: DataTypes.STRING,
    },
    snackFood: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    },
  });

  return Madlib;
};
