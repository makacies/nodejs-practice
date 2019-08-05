const MongoClient = require('mongodb').MongoClient

class Connection {
    static connectToMongo() {
        if (this.db) return Promise.resolve(this.db)
        return MongoClient.connect(this.url, this.options)
            .then(client => this.db = client.db("nodejs-blog"));
    }
}

Connection.db = null
Connection.url = 'mongodb://127.0.0.1:27017/'
Connection.options = {
    autoReconnect: true,
    reconnectTries: 300,
    useNewUrlParser: true,
    reconnectInterval: 1000
}

module.exports = {
    Connection
}
