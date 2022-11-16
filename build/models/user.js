"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function UserFactory(sequelize) {
    User.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            get: function () {
                var _a;
                return (_a = this.getDataValue('createdAt')) === null || _a === void 0 ? void 0 : _a.toLocaleString('en-US', { timeZone: 'UTC' });
            }
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
            get: function () {
                var _a;
                return (_a = this.getDataValue('updatedAt')) === null || _a === void 0 ? void 0 : _a.toLocaleString('en-US', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}
exports.UserFactory = UserFactory;
