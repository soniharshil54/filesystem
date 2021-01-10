const { MESSAGE } = require("../configs/message")
const QueryService = require("../services/query")

module.exports = {

    /**
    * @function isDuplicate
    * @description A function to check for duplications in db which expects unique records.
    * @param {Object} params 
    * @returns {Object} - will return flag true or false if duplication found or not
    */
    async isDuplicate(params) {
        if (params.email) {

            let query = { "email": params.email }
            let usersCount = await QueryService.countRecords('user', query)
            if (usersCount && usersCount > 0) {
                return {
                    flag: true,
                    response: MESSAGE.EMAIL_REGISTERED
                }
            }
            else {
                return {
                    flag: false
                }
            }
        }
        return {
            flag: false
        }
    }
}