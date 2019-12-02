const sqlite = require('sqlite3');

class Connector {

    constructor(fileName = process.env.SQLITE_FILE || "Database/database.sqlite") {
        let self = this;
        this.db = new sqlite.Database(fileName, (err) => {
            if (err) {
              console.log('Could not connect to database', err)
            }else{
                this.createTables();
            }
          });
          
        this.db.configure("busyTimeout", 1000);
    }

    createTables() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS `ticket` (\
            `id` INTEGER PRIMARY KEY AUTOINCREMENT,\
            `name` varchar(64) NOT NULL,\
            `timestamp` timestamp NOT NULL,\
            `number` INTEGER UNIQUE NOT NULL,\
            `valid` boolean DEFAULT 1)"
        );
    }

    async getData(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params, (err, rows) => {
                    if (rows) {
                        resolve(rows);
                        return;
                    } 
                    resolve(undefined);
                });
            })
        })
    }


    query(sql, params) {
        this.db.run(sql, params, (err) => {
            if (err) {
              return console.error(err.message);
            }
        });
    }
}

module.exports = Connector;