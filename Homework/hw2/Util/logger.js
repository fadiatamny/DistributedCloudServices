const fs = require('fs');

class Log{

    static write(data){
        fs.appendFile( process.env.LOG_FILE || './log.txt', data+'\n', (err)=>{
            if(err) throw err;
        })
    }

    static read(){
        fs.readFile( process.env.LOG_FILE || './log.txt',(err,data)=>{
            if(err) throw err;
            return data;
        });
    }

}

module.exports = Log;