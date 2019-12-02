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
    /**
     * 10 tickets
     * user1 => request ticket   < ticket1
     * user1 => request ticket   < ticket2
     * user1 => request ticket   < ticket3
     * user1 => request ticket   < ticket4 == invalid
     * user1 => request ticket   < ticket5
     * admin nop. no ticket 4.
     * user1 => request ticket   < ticket4 //drop the invalid// inserting new one.
     * user1 => request ticket   < ticket 6 // no invalids therefore count of table + 1 < MAX COUNT ;
     */
    createTables() {
        this.db.run(
            "CREATE TABLE IF NOT EXISTS `ticket` (\
            `id` INTEGER PRIMARY KEY AUTOINCREMENT,\
            `name` varchar(64),\
            `timestamp` timestamp,\
            `number` INTEGER,\
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