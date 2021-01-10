const express = require("express")
const router = express.Router()
const badRequest = require('../../responses/badRequest')
const created = require('../../responses/created')
const ok = require('../../responses/ok')
const notFound = require('../../responses/notFound')
const serverError = require('../../responses/serverError')
const unauthorized = require('../../responses/unauthorized')
const tokenExpire = require('../../responses/tokenExpire')
const AuthController = require('../../controllers/User/AuthController')

router.use(function(req, res, next){
    res.badRequest = badRequest,
    res.created = created,
    res.ok = ok,
    res.notFound = notFound,
    res.serverError = serverError,
    res.unauthorized = unauthorized,
    res.tokenExpire = tokenExpire
    next()
})

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);


module.exports = router