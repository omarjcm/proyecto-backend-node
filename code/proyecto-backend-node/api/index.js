const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const auth = require('./components/auth/network')
const user = require('./components/user/network')
const error = require('../network/errors')

const app = express()
app.use( bodyParser.json() )

// Router
app.use('/api/user', user)
app.use('/api/auth', auth)

const swaggerDoc = require('./swagger.json')
const errors = require('../network/errors')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use( errors )

app.listen( config.api.port, () => {
    console.log('API escuchando en el puerto ', config.api.port)
} )