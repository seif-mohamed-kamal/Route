import { postModel, userModel, commentModel } from "../../DB/model/index.js";
import { Sequelize } from "sequelize";

export const createPost = async (inputs) => {
  const post = new postModel(inputs);
  await post.save();
  return post;
};

export const deletePost = async (postId, userId) => {
  const post = await postModel.findByPk(postId);
  if (!post) throw new Error("Post not found");
  if (post.userId !== userId) {
    throw new Error("Not authorized to delete this post");
  }
  await post.destroy();
  return post;
};

export const getPostsWithDetails = async (req, res) => {
  const posts = await postModel.findAll({
    attributes: ["id", "title"], 
    include: [
      {
        model: userModel,
        as: "user", 
        attributes: ["id", "name"],
      },
      {
        model: commentModel,
        as: "comments",
        attributes: ["id", "content"],
      },
    ],
  });

  return posts;
};


export const getCommentsCount = async (req, res) => {
  const posts = await postModel.findAll({
    attributes: [
      "id",
      "title",
      [Sequelize.fn("COUNT", Sequelize.col("comments.id")), "commentCount"],
    ],
    include: [
      {
        model: commentModel,
        as: "comments",
        attributes: [],
      },
    ],
    group: ["post.id"],
  });

  return posts;
};
