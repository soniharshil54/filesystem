const QueryService = require('../services/query')
const { MESSAGE } = require("../configs/message")

module.exports = {

    /**
    * 
    * @function get
    * @description get the full file system hierarchy
    *
    */
    async get(folderId, sortObj, searchString) {
        try {
            let search = ""
            if(searchString){
                search = ` WHERE name LIKE '%${searchString}%'`
            }
            let sort = ""
            if(sortObj){
                sort = ' ORDER BY '
                let sortString = QueryService.buildSortString(sortObj)
                sort += sortString
            }
            let query = `select fs.id, fs.name, fs.path, fs.created_at, user.name as added_by from (WITH recursive filepath (id, name, path, created_at, added_by) AS 
            ( 
                   SELECT id, 
                          name, 
                          name AS path, 
                          created_at,
                          added_by
                   FROM   filesystem 
                   WHERE  id=${folderId}
                   UNION ALL 
                   SELECT f.id, 
                          f.name, 
                                 concat(fp.path, ' > ', f.name), 
                          f.created_at,
                          f.added_by
                   FROM   filepath   AS fp 
                   JOIN   filesystem AS f 
                   ON     fp.id = f.parent 
                   WHERE  f.is_deleted=false) 
            SELECT   * 
            FROM     filepath 
            ${search})
             as fs join user on user.id=fs.added_by ${sort};`
            // console.log(query)
            let fileSystem = await QueryService.runQuery(query)
            if (!fileSystem || fileSystem.length < 1) {
                return null
            }
            return fileSystem
        } catch (e) {
            console.log("e", e)
            return null
        }
    },

    /**
    * @function isDuplicate
    * @description A function to check for duplications in db which expects unique records.
    * @param {Object} params - field values of which duplicaton will be checked
    * @returns {Object} - will return object with flag true or false
    */
    async isDuplicate(params) {
        if (params.name) {

            let whereObj = { "name": params.name }
            let fileSystem = await QueryService.find('filesystem', whereObj)
            if (fileSystem && fileSystem.length > 0) {
                return {
                    flag: true,
                    response: { ...MESSAGE.IS_DUPLICATE, message: "Please don't use the same name, its just for the convenient to test the apis." }
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
    },

    async findFolder(options) {
        try {
            let whereObj = {
                name: options.name,
                type: options.type
            }
            let folder = await QueryService.findOne('filesystem', whereObj)
            if (!folder) {
                return null
            }
            return folder
        } catch (e) {
            return null
        }
    },

    async viewRootFileSystem() {
        try {
            let root = await QueryService.findOne('filesystem', { is_root: true })
            let rootFileSystem = await this.get(root.id, {path: 'ASC'}, undefined)
            return rootFileSystem
        } catch (e) {
            return null
        }
    }
}