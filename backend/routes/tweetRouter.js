const express = require("express");
const { Comment } = require("../models/Comment.js");
const { User } = require("../models/User.js");
const { Tweet } = require("../models/Tweet.js");

const tweetRouter = express.Router();

tweetRouter.get("/:username", async (req, res) => {
  // get a user's tweets
  const username = req.params.username;
  const user = await User.findOne({ username: username }); // find user by username
  if (!username) {
    return res
      .status(404)
      .send({ success: false, message: `${username}'s tweets not found` }); // if user not found, return 404
  }
  const tweets = await Tweet.find({ user: user._id })
    .populate("user")
    .sort({ last_modified: -1 }); // find all tweets by user
  const result = [];
  for (const tweet of tweets) {
    const info = {
      // return tweet info
      content: tweet.content,
      last_modified: tweet.last_modified,
      user: tweet.last_modified,
      comments: tweet.comments,
      images: tweet.images,
      videos: tweet.videos,
      likes: tweet.likes.count(),
      dislikes: tweet.dislikes.count(),
      retweets: tweet.retweets.count(),
    };
    result.push(info); // push tweet info to result
  }
  res.send({ success: true, content: result });
});

tweetRouter.post("/like", async (req, res) => {
  // like a tweet by a user
  const { username, tweetId } = req.body;

  const user_info = await User.findOne({ username: username });
  if (!user_info) {
    return res.status(404).send({ success: false, message: "User not found" });
  }
  // tweet to be updated
  const tweet_info = await Tweet.findById(tweetId, async function (err, docs) {
    // check the user has already liked or disliked the tweet
    if (err) {
      return res
        .status(404)
        .send({ success: false, message: "tweets not found" });
    }
    const user_disliked = await Tweet.find({ dislike: user_info._id });
  });
});

module.exports = { tweetRouter };
