import { InferAttributes, InferCreationAttributes, Model, Sequelize, DataTypes } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare userId: number;
    declare username: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare state: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function() {
                return this.getDataValue('createdAt')
                ?.toLocaleString('en-US', {timeZone: 'UTC'});
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get: function() {
                return this.getDataValue('updatedAt')
                ?.toLocaleString('en-US', {timeZone: 'UTC'});
            }
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}