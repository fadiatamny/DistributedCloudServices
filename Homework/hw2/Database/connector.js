const sqlite = require('sqlite3');

class Connector {

    constructor(fileName = process.env.SQLITE_FILE || "Database/database.sqlite") {
        this.db = new sqlite.Database(fileName, (err) => {
            if (err) {
                throw {
                    'status': 500,
                    'message': 'Error performing query',
                    'err': err
                };
            } else {
                this.createTables();
            }
        });

        this.db.configure("busyTimeout", 1000);
    }

    createTables() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS `Order` (\
            `id` varchar(64) UNIQUE PRIMARY KEY,\
            `name` varchar(64) NOT NULL,\
            `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,\
            `updated_at` timestamp,\
            `ticketsNumber` INTEGER NOT NULL)"
        );
    }


    async getData(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.all(sql, params, (err, rows) => {
                    if (err) {
                        resolve(err);
                        return;
                    }
                    if (rows) {
                        resolve(rows);
                        return;
                    }
                });
            })
        });
    }


    async query(sql, params) {
        return new Promise((resolve, reject) => {
                this.db.run(sql, params, (err) => {
                    if(err)
                        resolve(err);
                    else
                        resolve(undefined)
                });
            });
        }

    }

    module.exports = Connector;