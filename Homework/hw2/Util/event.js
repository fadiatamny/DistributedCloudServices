const con = new (require('../Database/connector'))();

const max = process.env.MAX_COUNT || 10;

class Event{
    static async addTicket(name){
        let sql = "SELECT MIN(number) \
        FROM ticket \
        WHERE valid = 0";
        let num = (await con.getData(sql))[0]['MIN(number)'];
        if(!num){
            sql = "SELECT COUNT(id) \
            FROM ticket";
            num = (await con.getData(sql))[0]['COUNT(id)'];
            if(num >= max)
                throw({'status':406,'message':'OVERFLOW IN TICKETS'});
            else
                num++;
        }else{
            sql = "DELETE FROM ticket WHERE number = '"+num+"'";
            con.query(sql);
        }
    
        sql = "INSERT INTO `ticket` (id,name,timestamp,number,valid) \
        VALUES(NULL,'"+name+"',CURRENT_TIMESTAMP,"+num+",1)";
        con.query(sql);
    }

    static deleteTicket(id){
        let sql = "DELETE FROM ticket WHERE id = '"+id+"'";
        con.query(sql);
    }

    static updateTicket(id,name,number,valid = 1){
        let sql = "UPDATE ticket\
        SET name = '"+name+"', number = '"+number+"', valid= '"+valid+"' \
        WHERE id = '"+id+"'";
        con.query(sql);

    }

    static async getAllTickets(){
        let sql = "SELECT * FROM `ticket`";
        return await con.getData(sql);
    }

    static async getTicket(id){
        let sql = "SELECT * FROM `ticket` WHERE id = '"+id+"'";
        return await con.getData(sql)[0];

    }

    static clearEvent(){

    }
}

module.exports = Event;