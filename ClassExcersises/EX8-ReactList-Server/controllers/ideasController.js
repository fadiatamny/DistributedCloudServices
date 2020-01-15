const model = require('../database/ideasModel');
const errHandler = require('../util/errorHandler');

class Ideas {
    static async getIdeas(req,res){
        try {
            let obj = await model.getIdeas();
            if (!obj || obj.length == 0) throw {
                status: 204,
                message: 'There are no record'
            };
            res.status(200).json(obj);
        } catch (err) {
            errHandler.Error(res, err);
        }
    };
};

module.exports = Ideas;
