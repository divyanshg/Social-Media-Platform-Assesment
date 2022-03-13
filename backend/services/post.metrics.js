const Post = require('../models/model.post');

module.exports = {
    getUpVotes: (postId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            resolve(post.upVotes);
        } catch (error) {
            reject(error);
        }
    }),
    addUpVote: (postId, userId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            post.upVotes.push({userId});
            await post.save();
            resolve(post.upVotes);
        } catch (error) {
            reject(error);
        }
    }),
    removeUpVote: (postId, userId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            post.upVotes.pull({userId});
            await post.save();
            resolve(post.upVotes);
        } catch (error) {
            reject(error);
        }
    }),
    getDownVotes: (postId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            resolve(post.downVotes);
        } catch (error) {
            reject(error);
        }
    }),
    addDownVote: (postId, userId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            post.downVotes.push({userId});
            await post.save();
            resolve(post.downVotes);
        } catch (error) {
            reject(error);
        }
    }),
    removeDownVote: (postId, userId) => new Promise(async(resolve, reject) => {
        try {
            const post = await Post.findOne({_id: postId});
            post.downVotes.pull({userId});
            await post.save();
            resolve(post.downVotes);
        } catch (error) {
            reject(error);
        }
    }),
    getComments: (postId) => new Promise(async(resolve, reject) => {
        try {
            const {comments} = await Post.findOne({_id: postId});
            resolve(comments);
        } catch (error) {
            reject(error);
        }
    }),
    addComment: (postId, userId, text) => new Promise(async(resolve, reject) => {
        try {
            const {comments} = await Post.findOne({_id: postId});
            comments.push({
                by: userId,
                text: text,
            });
            await comments.save();
            resolve(comments);
        } catch (error) {
            reject(error);
        }
    }),
    removeComment: (postId, userId) => new Promise(async(resolve, reject) => {
        try {
            const {comments} = await Post.findOne({_id: postId});
            comments.pull(userId);
            await comments.save();
            resolve(comments);
        } catch (error) {
            reject(error);
        }
    }),
}