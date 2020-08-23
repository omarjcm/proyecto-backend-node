const db = {
    'user': [
        { id: 1, name: 'Carlos' },
    ]
}

function list(tabla) {
    return db[tabla]
}

function get(tabla, id) {
    let colData = list(tabla)
    // filter regresa todos los que cumplan con esa condición.
    //    return colData.filter(item => item.id == id)[0] || null
    // find retorna el primero que cumpla con esa condición.
    return colData.find(item => item.id == id)[0] || null
}

function upsert(tabla, data) {
    db[tabla].push(data)
}

function remove(tabla, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove,
}