const TABLA = 'auth'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/test') 
    }

    function upsert(data) {
        const authData = {
            id: data.id,
        }
        if (data.username) {
            authData.username = data.username
        }
        if (data.password) {
            authData.password = data.password
        }
        return store.upsert(TABLA, authData)
    }

    return {
        upsert,
    }
}