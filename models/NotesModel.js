import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js"

const { DataTypes } = Sequelize;

const ProgressNotes = db.define('notes', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    }, status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true

        }
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },

}, {
    freezeTableName: true
});

Users.hasMany(ProgressNotes);
ProgressNotes.belongsTo(Users, { foreignKey: 'userId' });
export default ProgressNotes;