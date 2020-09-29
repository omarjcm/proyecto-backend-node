const nanoid = require('nanoid')

const TABLA = 'user'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/test') 
    }

    function list() {
        return store.list( TABLA )
    }

    function get(idUser) {
        return store.get( TABLA, idUser )
    }

    function upsert(body) {
        const user = {
            name: body.name
        }
        if (body.id) {
            user.id = body.id
        } else {
            user.id = nanoid()
        }
        return store.upsert(TABLA, user)
    }

    return {
        list,
        get, 
    }
}