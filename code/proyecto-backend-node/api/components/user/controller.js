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

    return {
        list,
        get, 
    }
}