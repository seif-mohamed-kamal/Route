import { userModel, postModel, commentModel } from './index.js';

userModel.hasMany(postModel, { foreignKey: "userId", as: "posts"});
postModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

userModel.hasMany(commentModel, { foreignKey: "userId", as: "comments" });
commentModel.belongsTo(userModel, { foreignKey: "userId", as: "user" });

postModel.hasMany(commentModel, { foreignKey: "postId", as: "comments"});
commentModel.belongsTo(postModel, { foreignKey: "postId", as: "post" });
