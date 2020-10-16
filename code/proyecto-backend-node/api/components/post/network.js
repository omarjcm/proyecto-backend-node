const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

// Routes
router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)

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

module.exports = router