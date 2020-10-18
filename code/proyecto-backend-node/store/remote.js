const request = require('request')

function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port

    function list(table) {
        return req('GET', table)
    }

    function get(table, id) {

    }
    
    function upsert(table, data) {

    }
    
    function query(table, q, join) {

    }

    function req(method, table, data) {
        let url = URL + '/' + table 
        body = ''

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url, 
                body,
            }, (error, req, body) => {
                if (error) {
                    console.error('Error con la Base de Datos remota', error)
                    return reject( error.message )
                }
                const resp = JSON.parse( body )
                return resolve( resp.body )
            })
        })
     }

     return {
         list,
     }
}

module.exports = createRemoteDB