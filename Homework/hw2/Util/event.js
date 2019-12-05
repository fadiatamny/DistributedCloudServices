const con = new(require('../Database/connector'))();

const max = process.env.MAX_COUNT || 10;

class Event {

    static async checkMax(num) {
        let sql = "SELECT SUM(ticketsNumber) \
        FROM `Order`";
        let b;
        let count = await con.getData(sql);
        if (count.errno) {
            throw {
                'status': 500,
                'message': 'Error performing query',
            };
        }
        if (count) {
            count = count[0]['SUM(ticketsNumber)'];
            if ((count + num) > max) {
                throw {
                    'status': 406,
                    'message': 'Max number of orders reached'
                };
            }
        }
    }
    static async addOrder(obj) {
        try {
            await Event.checkMax(obj.ticketsNumber);
            let sql = "INSERT INTO `Order` (id,name,created_at,updated_at,ticketsNumber) VALUES ('" + obj.id + "','" + obj.name + "',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP," + obj.ticketsNumber + ")";

            let err = await con.query(sql);
            if (err)
                throw {
                    'status': 500,
                    'message': 'Error performing query',
                };
        } catch (err) {
            throw err;
        };
    }

    static async deleteOrder(id) {
        let sql = "DELETE FROM `Order` WHERE id = '" + id + "'";
        try {
            let err = await con.query(sql);
            if (err)
                throw {
                    'status': 500,
                    'message': 'Error performing query',
                };
        } catch (err) {
            throw err;
        };
    }

    static async updateOrder(obj,oldNumber) {
        try {
            let val = obj.ticketsNumber;
            if(oldNumber)
                val = val - oldNumber; 
            await Event.checkMax(val);
            let sql = "UPDATE `Order`\
            SET name = '" + obj.name + "', ticketsNumber = '" + obj.ticketsNumber + "', updated_at = CURRENT_TIMESTAMP \
            WHERE id = '" + obj.id + "'";
            let err = await con.query(sql);
            if (err) throw err;
        } catch (err) {
            throw err;
        };
    }

    static async getAllOrders() {
        let sql = "SELECT * FROM `Order`";
        try {
            let data = await con.getData(sql);
            if (data.errno) {
                throw {
                    'status': 500,
                    'message': 'Error performing query',
                };
            }
            return data;
        } catch (err) {
            throw err;
        };
    }

    static async getOrder(id) {
        let sql = "SELECT * FROM `Order` WHERE id = " + id;
        try {
            let data = await con.getData(sql);
            if (data.errno) {
                throw {
                    'status': 500,
                    'message': 'Error performing query',
                };
            }
            return data;
        } catch (err) {
            throw err;
        };
    }

    static async clearOrders() {
        let sql = 'DELETE FROM `Order`';
        let err = await con.query(sql);
        if (err)
            throw {
                'status': 500,
                'message': 'Error performing query',
            };
    }
}

module.exports = Event;