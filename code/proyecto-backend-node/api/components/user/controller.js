const TABLA = 'user'

module.exports = function(injectedStore) {
    let store = injectedStore
    if (!store) {
        store = require('../../../store/test') 
    }

    function list() {
        return store.list( TABLA )
    }

    return {
        list,
    }
}