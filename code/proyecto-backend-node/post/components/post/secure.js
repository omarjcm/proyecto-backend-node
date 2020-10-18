const auth = require('../../../auth')
const controller = require('./index') 

module.exports = function checkAuth( action ) {

    async function middleware(req, res, next) {
        switch(action) {
            case 'add':
            case 'list_own':
                auth.check.logged(req)
                next()
                break
            case 'update':
                const post = await controller.get(req.body.id)
                auth.check.own(req, post.user)
                next()
            default:
                next()
        }
    }

    return middleware
}