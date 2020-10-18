const error = require('../../../utils/error')

const TABLA = 'post'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/mysql') 
    }

    function list() {
        return store.list( TABLA )
    }

    async function get(idUser) {
        const user = await store.get(TABLA, idUser)
        if (!user) {
            throw error('No existe el post', 404)
        }
        return user
    }

    async function upsert(body) {
        const post = {
            text: body.text,
            user: body.user,
        }
        if (body.id) {
            post.id = body.id
        }

        return store.upsert(TABLA, post)
    }

    async function like(post, user) {
        const like = await store.upsert( TABLA + '_like', { user: user, post: post } )
        return like
    }

    async function postsLiked(user) {
        const users = await store.query( TABLA + '_like', { user: user }, { post: post } )
        return users
    }

    async function postLikers(post) {
        const users = await store.query( TABLA + '_like', { post: post }, { post: post } )
        return users
    }

    return {
        list,
        get, 
        upsert,
        like,
        postsLiked,
        postLikers,
    }
}