const Post = require('../models/model.post')

module.exports = (post) => new Promise(async( resolve, reject) => {
    try {
        const {
            caption,
            image,
            user
        } = post;

        // Validate user input
        if (!(caption && image)) {
            reject("All input is required");
        }

        // Create new post
        const newPost = new Post({
            caption: caption,
            image: image,
            user: user
        });

        // Save post to database
        await newPost.save();

        // Return new post
        resolve(newPost);
    } catch (err) {
        reject(err);
    }
})