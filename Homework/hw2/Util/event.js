const con = new (require('../Database/connector'))();

const max = process.env.MAX_COUNT || 10;

class Event{
    static async addTicket(name){
        console.log(name);
        let sql = "SELECT MIN(number) \
        FROM ticket \
        WHERE valid = 0";
        let res = await con.getData(sql);
        let num = res[0];
        console.log(res);
        console.log(num['MIN(number)']);
        if(num[0])
            num = num[0];
        else{
            sql = "SELECT COUNT(id) \
            FROM table_name";
            res = await con.getData(sql);
            console.log(res);
            // if(res[0][0] <= max)
            //     num = res[0][0];
            else
                throw('OVERFLOW IN TICKETS');
        }
        console.log(num);

        

        // sql = "INSERT INTO `ticket` (id,name,timestamp,number,valid) \
        // VALUES(NULL,'"+name+"',CURRENT_TIMESTAMP,"+num+",1)";
        // con.query(sql);
    }

    static deleteTicket(id){
        let sql = "DELETE FROM ticket WHERE id = '"+id+"'";
        con.query(sql);
    }

    static updateTicket(id,name,number){
        let sql = "UPDATE ticket\
        SET name = '"+name+"', number = '"+number+"' \
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