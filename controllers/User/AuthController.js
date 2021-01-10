const bcrypt = require('bcrypt')
const services = "../../services"
const { MESSAGE } = require(`../../configs/message`)
const AuthService = require(`../../services/auth`)
const QueryService = require(`../../services/query`)
const UserService = require(`../../services/user`)
const _ = require('lodash')

module.exports = {

    async register(req, res) {
        try {
            let params = req.body
            if (!params || !params.name || !params.email || !params.password) {
                return res.badRequest(null, MESSAGE.BAD_REQUEST);
            }
            let rawPassword = params.password
            let isDuplicate = await UserService.isDuplicate(params)
            if (isDuplicate.flag) {
                return res.badRequest({}, isDuplicate.response);
            }
            let password = await bcrypt.hash(params.password, 10)
            params.password = password
            let user = await QueryService.insert('user',params)
            if (user) {
                let options = {
                    email: user.email,
                    password: rawPassword
                }
                let loginResponse = await AuthService.login(options)
                return res.ok(loginResponse.data, loginResponse.response)
            }
            return res.serverError({}, MESSAGE.USER_REGISTER_FAILED);
        } catch (err) {
            console.log(err);
            return res.serverError(null, MESSAGE.SERVER_ERROR);
        }
    },

    async login(req, res) {
        try {
            let params = req.body
            let options = {
                email: params.email,
                password: params.password
            }
            let loginResponse = await AuthService.login(options)
            if(!loginResponse.flag){
                return res.badRequest(null, loginResponse.response)
            }
            return res.ok(loginResponse.data, loginResponse.response)
        } catch (err) {
            console.log(err);
            return res.serverError(null, MESSAGE.SERVER_ERROR);
        }
    }
}