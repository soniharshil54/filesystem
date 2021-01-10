const express = require("express")
const router = express.Router()
const badRequest = require('../../responses/badRequest')
const created = require('../../responses/created')
const ok = require('../../responses/ok')
const notFound = require('../../responses/notFound')
const serverError = require('../../responses/serverError')
const unauthorized = require('../../responses/unauthorized')
const tokenExpire = require('../../responses/tokenExpire')
const checkAuth = require('../../middlewares/checkAuth')
const FileSystemController = require('../../controllers/User/FileSystemController')

router.use(function (req, res, next) {
	res.badRequest = badRequest,
		res.created = created,
		res.ok = ok,
		res.notFound = notFound,
		res.serverError = serverError,
		res.unauthorized = unauthorized,
    res.tokenExpire = tokenExpire
	next()
})

router.post('/add',checkAuth, FileSystemController.add);

router.post('/view',checkAuth, FileSystemController.view)

router.put('/move',checkAuth, FileSystemController.move)

router.delete('/remove',checkAuth, FileSystemController.remove)



module.exports = router