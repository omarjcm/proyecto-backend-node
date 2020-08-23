const store = require('../../../store/test')

const TABLA = 'user'

function list() {
    return store.list( TABLA )
}

module.exports = {
    list,
}