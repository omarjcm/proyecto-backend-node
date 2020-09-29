const db = {
    'user': [
        { id: 1, name: 'Guillermo Omar' },
    ]
}

async function list(tabla) {
    return db[tabla]
}

async function get(tabla, id) {
    let colData = await list(tabla)
    // filter regresa todos los que cumplan con esa condición.
    return colData.filter((item) => item.id == id)[0] || null
    // find retorna el primero que cumpla con esa condición.
    //return colData.find(item => item.id == id)[0] || null
}

async function upsert(tabla, data) {
    db[tabla].push(data)
}

async function remove(tabla, id) {
    return true
}

module.exports = {
    list,
    get,
    upsert,
    remove,
}