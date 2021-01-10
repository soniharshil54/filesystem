const UserRoutes = require("./User/Auth")
const UserFileSystemRoutes = require("./User/FileSystem")


module.exports = function (app) {

    app.use("/user/file-system", UserFileSystemRoutes)

    app.use("/user", UserRoutes)

}