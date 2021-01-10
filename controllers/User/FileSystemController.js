const { MESSAGE } = require('../../configs/message')
const { FILE_SYSTEM } = require('../../configs/constant/fileSystem')
const FileSystemService = require('../../services/fileSystem')
const QueryService = require('../../services/query')
const _ = require('lodash');

module.exports = {

	/**
    * @function view
    * @description View fileSystem.
    * @param {*} req 
    * @param {*} res 
    */
	async view(req, res) {
		try {
			let params = _.extend(req.params || {}, req.body || {})
			if (!params || !params.filter) {
				return res.badRequest(null, MESSAGE.BAD_REQUEST);
			}
			if(!params.filter.name){
				params.filter.name = "root"
			}
			let whereObj = {
                name: params.filter.name,
                type: FILE_SYSTEM.TYPE.FOLDER
			}
            let folder = await QueryService.runFindFolderQuery(whereObj)
            if(!folder){
                return res.notFound({}, {...MESSAGE.RECORD_NOT_FOUND, message: "directory not found."});
			}
			let sortObj = params.sort ? params.sort : {path: "ASC"}
			let search = params.search ? params.search : undefined
			let fileSystem = await FileSystemService.get(folder.id, sortObj, search)
			if (fileSystem) {
				return res.ok(fileSystem, MESSAGE.OK)
			}
			return res.notFound({}, {...MESSAGE.RECORD_NOT_FOUND, message: "No child directories found."});
		} catch (error) {
			console.log(error)
			return res.serverError(null, MESSAGE.SERVER_ERROR)
		}
	},

	/**
    * @function add
    * @description Add fileSystem.
    * @param {*} req 
    * @param {*} res 
    */
	async add(req, res) {
		try {
			let params = req.body
			let loggedInUser = req.user
			if (!params || !params.name || !params.parentName) {
				return res.badRequest(null, MESSAGE.badRequest)
			}
			let isDuplicate = await FileSystemService.isDuplicate({name: params.name})
			if (isDuplicate.flag) {
                return res.badRequest({}, isDuplicate.response);
			}
			let parent = await QueryService.findOne('filesystem', {name: params.parentName})
			if(!parent){
				return res.badRequest(null, {...MESSAGE.badRequest, message: "Parent directory doesn't exist"})
			}
			params.parent = parent.id
			params.added_by = loggedInUser.id
			delete params.parentName
			let fileSystem = await QueryService.insert('filesystem' ,params)
			if (fileSystem) {
				let typeName = FILE_SYSTEM.TYPE_ARRAY[params.type]
				let socketMessage = `${typeName} '${params.name}' added in '${parent.name}' by ${loggedInUser.name}.`
				let socketObj = {
					message: socketMessage,
					color: "green"
				}
				io.emit('fileSystemModified', socketObj);
				let fileSystemAdded = await FileSystemService.get(parent.id)
				let message = `${typeName} '${params.name}' added in '${parent.name}'.`
				return res.ok(fileSystemAdded, {...MESSAGE.OK, message: message})
			}
			return res.serverError({}, MESSAGE.CREATE_FAILED);
		} catch (error) {
			console.log(error)
			return res.serverError(null, MESSAGE.SERVER_ERROR)
		}
	},

	async move(req, res){
		try {
			let params = req.body
			let loggedInUser = req.user
			if (!params || !params.name || !params.moveTo) {
				return res.badRequest(null, MESSAGE.badRequest)
			}
			let source = await QueryService.findOne('filesystem',{name: params.name})
			if (!source) {
                return res.notFound({}, {...MESSAGE.notFound, message: "Source doesn't exist"});
            }
			let destination = await QueryService.findOne('filesystem', {name: params.moveTo})
			if(!destination){
				return res.badRequest(null, {...MESSAGE.badRequest, message: "Destination directory doesn't exist"})
			}
			let whereObj = {
				id: source.id
			}
			let updateData = {
				parent: destination.id
			}
			let fileSystem = await QueryService.update('filesystem', whereObj, updateData)
			if (fileSystem) {
				let typeName = FILE_SYSTEM.TYPE_ARRAY[source.type]
				let socketMessage = `${typeName} '${params.name}' moved to '${destination.name}' by ${loggedInUser.name}.`
				let socketObj = {
					message: socketMessage,
					color: "blue"
				}
				io.emit('fileSystemModified', socketObj);
				let fileSystemMovedTo = await FileSystemService.get(destination.id)
				let message = `${typeName} '${source.name}' moved to '${destination.name}'.`
				return res.ok(fileSystemMovedTo, {...MESSAGE.OK, message: message})
			}
			return res.serverError({}, MESSAGE.CREATE_FAILED);
		} catch (error) {
			console.log(error)
			return res.serverError(null, MESSAGE.SERVER_ERROR)
		}
	},

	async remove(req, res){
		try {
			let params = req.body
			let loggedInUser = req.user
			if (!params || !params.name) {
				return res.badRequest(null, MESSAGE.badRequest)
			}
			let source = await QueryService.findOne('filesystem',{name: params.name})
			if (!source) {
                return res.notFound({}, {...MESSAGE.notFound, message: "File/Folder doesn't exist"});
            }
			let whereObj = {
				id: source.id
			}
			let updateData = {
				is_deleted: true,
				deleted_by: loggedInUser.id
			}
			let fileSystem = await QueryService.update('filesystem', whereObj, updateData)
			if (fileSystem) {
				let typeName = FILE_SYSTEM.TYPE_ARRAY[source.type]
				let socketMessage = `${typeName} '${source.name}' removed by ${loggedInUser.name}.`
				let socketObj = {
					message: socketMessage,
					color: "red"
				}
				io.emit('fileSystemModified', socketObj);
				let rootFileSystem = await FileSystemService.viewRootFileSystem()
				let message = `${typeName} ${source.name} removed.`
				return res.ok(rootFileSystem, {...MESSAGE.OK, message: message})
			}
			return res.serverError({}, MESSAGE.CREATE_FAILED);
		} catch (error) {
			console.log(error)
			return res.serverError(null, MESSAGE.SERVER_ERROR)
		}
	},

}