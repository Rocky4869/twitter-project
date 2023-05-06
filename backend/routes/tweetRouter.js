/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

This is a Node.js module that exports an Express Router object called tweetRouter. This router contains two routes that handle tweet-related actions.

The first route is a GET route that takes in a username in the URL parameter and returns a list of all tweets made by the user with the provided username. If no user with the provided username is found, a 404 Not Found status code is returned. The tweets are returned in descending order based on the last_modified field in the Tweet model. The tweet information includes the tweet content, last_modified timestamp, user username, comments, images, videos, likes, dislikes, and retweets counts.

The second route is a POST route that takes in a username and a tweetId in the request body and allows the user with the provided username to like the tweet with the provided tweetId. If no user with the provided username is found, a 404 Not Found status code is returned. If the tweet with the provided tweetId cannot be found, a 404 Not Found status code is returned. If the user has already disliked the tweet, the dislike is removed before the like is added.
*/

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
