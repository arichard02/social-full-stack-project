import express from "express";

const router = express.Router();

import Post from "../models/Post.js";

import { authMiddleware } from "../utils/auth.js";

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    // NOTE: our post needs to know what user it's related to...
    const post = await Post.create({
      ...req.body,
      author: req.user._id,
    });

    // turn the author field from an id into a user document (that includes the username)
    await post.populate("author", "username");

    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // this gets all posts, but you can filter posts based of logged in user: { author: req.user._id }
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      // turn the author field from an id into a user document (that includes the username)
      .populate("author", "username");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/posts/43980mkdsf9043m03gd
router.delete("/:id", async (req, res) => {
  try {
    // find the post based of route parameter
    const post = await Post.findById(req.params.id);

    // check if the post's id is NOT the same as the logged in user's id
    if (post.author.toString() !== req.user._id) {
      return res.status(403).json({ message: "User does not own this post" });
    }

    // proceed with deleting the post
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
});

export default router;
