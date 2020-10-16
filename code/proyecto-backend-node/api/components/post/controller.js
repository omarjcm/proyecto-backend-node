const auth = require('../auth')

const TABLA = 'post'

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
        const post = {
            text: body.text,
            user: body.user,
        }
        if (body.id) {
            post.id = body.id
        }

        if (body.text || body.user) {
            await auth.upsert({
                username: body.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, post)
    }

    return {
        list,
        get, 
        upsert,
    }
}