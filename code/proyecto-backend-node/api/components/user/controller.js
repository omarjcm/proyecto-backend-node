const { nanoid } = require('nanoid')
const auth = require('../auth')

const TABLA = 'user'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/mysql') 
    }

    function list() {
        return store.list( TABLA )
    }

    function get(idUser) {
        return store.get( TABLA, idUser )
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }
        if (body.id) {
            user.id = body.id
        }

        if (body.password || body.username) {
            await auth.upsert({
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user)
    }

    return {
        list,
        get, 
        upsert,
    }
}