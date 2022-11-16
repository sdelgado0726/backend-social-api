"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserPost = exports.PostFactory = exports.Post = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
function PostFactory(sequelize) {
    Post.init({
        postId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        post: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
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
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });
}
exports.PostFactory = PostFactory;
function AssociateUserPost() {
    user_1.User.hasMany(Post, { foreignKey: 'userId' });
    Post.belongsTo(user_1.User, { foreignKey: 'userId' });
}
exports.AssociateUserPost = AssociateUserPost;
