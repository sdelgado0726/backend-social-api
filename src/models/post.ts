import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare postId: number;
    declare post: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function PostFactory(sequelize: Sequelize) {
    Post.init({
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });
}

export function AssociateUserPost() {
    User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(User, { foreignKey: 'userId' });
}