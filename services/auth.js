const { MESSAGE } = require('../configs/message')
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const QueryService = require('../services/query')
const TOKEN_DURATION =  5 * 24 * 60 * 60 
const jwtSecret = "asd"

module.exports = {
    login: async function (options) {
        try {
            let {email, password} = options
            let user = await QueryService.findOne('user',{email:email})
            if (!user) {
                return {
                    flag: false,
                    response: MESSAGE.EMAIL_PASS_NOT_MATCHED
                }
            }
            let passwordhash = user.password
            let match = await bcrypt.compare(password, passwordhash)
            if(!match){
                return {
                    flag: false,
                    response: MESSAGE.EMAIL_PASS_NOT_MATCHED
                }
            }
            let payload = {
                id: user.id,
                name : user.name,
                email : user.email
            }
            let tokenRef = jwt.sign(payload, jwtSecret, { expiresIn: TOKEN_DURATION });
            let token = `JWT ${tokenRef}`
            let data = {
                token: token,
                user: user
            }
            return {
                flag: true,
                data: data,
                response: MESSAGE.OK
            }
        } catch (e) {
            console.log(e)
            return {
                flag: false,
                response: MESSAGE.SERVER_ERROR
            }
        }
    }
}