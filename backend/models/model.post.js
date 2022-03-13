const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    upVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    downVotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments: [{
        by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('post', postSchema)