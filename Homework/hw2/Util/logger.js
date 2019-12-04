const { EventEmitter } = require('events');
const fs = require('fs');
var path = require('path');

class Log extends EventEmitter {

    static _moveLog(filename) {
        let date = new Date();
        let distPath = process.env.LOG_BACKUPS || './backup/';
        let f = path.basename(filename).split('.');
        f = f[0] + date.getTime() + '.' + f[1];
        let dest = path.resolve(distPath, f);
        fs.rename(filename, dest, (err) => {
            if (err) throw err;
        });
    }

    static initialize() {
        let date = new Date();
        let filename = process.env.LOG_FILE || './log.txt';
        if (fs.existsSync(filename) && process.env.BACKUP_MODE == 'true') {
            this._moveLog(filename);
        }

        let startMessage = date.getDate() + "/" + (date.getMonth() + 1) + "/\
        " + date.getFullYear() + "\t" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "\
        \n--------------------\n";

        fs.writeFile(process.env.LOG_FILE || './log.txt', startMessage, function (err) {
            if (err) throw err;
        });
    }

    static write(data) {
        fs.appendFile(process.env.LOG_FILE || './log.txt', data + '\n', (err) => {
            if (err) throw err;
        })
    }

    static read() {
        fs.readFile(process.env.LOG_FILE || './log.txt', (err, data) => {
            if (err) throw err;
            return data;
        });
    }

}

const log = (new Log())
    .on('write', (data) => { Log.write(data); return;})
    .on('initialize', ()=>{ Log.initialize(); return;})
    .on('read', ()=>{ Log.read(); return;});

module.exports = Log;