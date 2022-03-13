const express = require('express')
const router = express.Router()

const multer = require('multer')
const path = require('path')

const verifyToken = require('../middlewares/auth');
const {
    v4: uuid
} = require('uuid')

const createPost = require('../services/post.create')

const {
    addUpVote,
    getUpVotes,
    removeUpVote,
    getDownVotes,
    addDownVote,
    removeDownVote
} = require('../services/post.metrics')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage
})

router.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            message: 'Get all posts'
        })
    })
    .post(verifyToken, upload.single('post'), (req, res, next) => {
        let post = {
            caption: req.body.caption,
            image: req.file.path.split('\\')[1],
            user: req.user._id
        }
        console.log(post)
        createPost(post)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })

//add and get upvotes
router.route('/:id/upvotes')
    .get((req, res, next) => {
        getUpVotes(req.params.id)
            .then(upvotes => {
                res.status(200).json({
                    upvotes,
                    count: upvotes.length
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })
    .post(verifyToken, (req, res, next) => {
        addUpVote(req.params.id, req.user._id)
            .then(upvote => {
                res.status(200).json(upvote)
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })
    .delete(verifyToken, (req, res, next) => {
        removeUpVote(req.params.id, req.user._id)
            .then(upvote => {
                res.status(200).json(upvote)
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })

//add downvotes
router.route('/:id/downvotes')
    .get((req, res, next) => {
        getDownVotes(req.params.id)
            .then(downvotes => {
                res.status(200).json({
                    downvotes,
                    count: downvotes.length
                })
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })
    .post(verifyToken, (req, res, next) => {
        addDownVote(req.params.id, req.user._id)
            .then(downvote => {
                res.status(200).json(downvote)
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })
    .delete(verifyToken, (req, res, next) => {
        removeDownVote(req.params.id, req.user._id)
            .then(downvote => {
                res.status(200).json(downvote)
            })
            .catch(err => {
                res.status(400).json({
                    message: err
                })
            })
    })


module.exports = router