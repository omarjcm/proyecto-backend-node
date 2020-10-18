const express = require('express')
const bodyParser = require('body-parser')

const config = require('../config')
const post = require('./components/post/network')
const error = require('../network/errors')

const app = express()
app.use( bodyParser.json() )

// Router
app.use('/api/post', post)

app.use( error )

app.listen( config.post.port, () => {
    console.log('Servicio POST escuchando en el puerto ', config.post.port)
} )