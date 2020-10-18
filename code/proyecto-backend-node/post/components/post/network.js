const express = require('express')

const auth = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// Routes
router.get('/', auth('list'), list)
router.get('/like', auth('list_own'), postsLiked)
router.get('/:id', auth('get'), get)
router.post('/', auth('add'), upsert)
router.put('/', auth('update', {owner:'user'}), upsert)
router.post('/:id/like', auth('add'), like)
router.post('/:id/like', auth('list'), postLikers)

// Functions
function list(req, res, next) {
    controller.list()
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch( next )
}

function get(req, res, next) {
    controller.get( req.params.id )
        .then((post) => {
            response.success(req, res, post, 200)
        })
        .catch( next )
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((post) => {
            response.success(req, res, post, 201)
        })
        .catch( next )
}

function like(req, res, next) {
    controller.like(req.params.id, req.user.sub)
        .then( (post) => {
            response.success(req, res, post, 201)
        })
        .catch( next )
}

function postLikers(req, res, next) {
    controller.postLikers(req.params.id)
        .then( (post) => {
            response.success(req, res, post, 200)
        })
        .catch( next )
}

function postsLiked(req, res, next) {
    controller.postLiked(req.user.sub)
        .then( (post) => {
            response.success(req, res, post, 201)
        })
        .catch( next )
}

module.exports = router