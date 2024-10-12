import sequelize from "./config.js";
import { DataTypes } from "sequelize";
// import User from "./User.model.js";

const Quote = sequelize.define(
    'Quote',
    {
        quote: {
            type: DataTypes.TEXT,
            allowNull: false
        }, 
        author: {
            type: DataTypes.TEXT,
            defaultValue: "Unkown"
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true
    }
);

// Quote.belongsTo(User, {
//     foreignKey: 'userId',
//     targetKey: '_id',
//     as: 'user',
// });

export default Quote;