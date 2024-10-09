import sequelize from './config.js';
import { DataTypes } from 'sequelize';
// import Quote from './Quote.model.js';

const User = sequelize.define(
  'User',
  {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }, 
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    // profilepic: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    auth_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true, 
  }
);

// User.hasMany(Quote, {
//   foreignKey: 'userId',
//   sourceKey: '_id',
//   as: 'quotes',
// });

export default User;