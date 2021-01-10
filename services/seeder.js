const bcrypt = require('bcrypt')
const {FILE_SYSTEM} = require('../configs/constant/fileSystem')
const QueryService = require('../services/query')
const saltRounds = 10

module.exports =  {
    seedRootUser: async function () {
        try {
            let rootUsersCount = await QueryService.countRecords('user', {is_root_user: true})
            if (rootUsersCount > 0) {
                console.log('root user is seeded successfully.');
                return;
            }
            const hash = bcrypt.hashSync("root123", saltRounds);
            await QueryService.insert('user',{
                name: 'root user',
                email: "root@filesystem.com",
                password: hash,
                is_root_user: true
            });
            console.log('admin user is seeded successfully.');
            return;
        } catch (e) {
            console.log(e);
            return { error: e };
        }
    },
    seedRootFolder: async function () {
        try {
            let rootCount = await QueryService.countRecords('filesystem', {is_root: true})
            if (rootCount > 0) {
                console.log('root folder is seeded successfully.');
                return;
            }
            let rootUser = await QueryService.findOne('user',{is_root_user: true})
            if(!rootUser){
                return
            }
            let inserted = await QueryService.insert('filesystem',{
                type: FILE_SYSTEM.TYPE.FOLDER,
                is_root: true,
                name: 'root',
                parent: null,
                added_by: rootUser.id
            });
            // console.log("inserted", inserted)
            console.log('root folder is seeded successfully.');
            return;
        } catch (e) {
            console.log(e);
            return { error: e };
        }
    },
    async seedAllConfigs() {
        await this.seedRootUser();
        await this.seedRootFolder();
    } 
}