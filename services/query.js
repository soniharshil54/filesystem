const _ = require('lodash');
let db = require('../configs/db');

module.exports = {
    /**
    * @function create
    * @description create file/folder
    * @param {Object} options 
    */
    async insert(tableName, data) {
        try {
            let insertId = await this.insertRef(tableName, data)
            if(insertId){
                let whereObj = {
                    id: insertId
                }
                let insertedRecord = await this.findOne(tableName, whereObj)
                if(insertedRecord){
                    return insertedRecord
                }
                return null
            }
            return null
        } catch(e) {
            console.log("e", e)
            return null
        }
    },

    async update(tableName, whereObj, updateData){
        return new Promise(function(resolve, reject){
            let sql = `UPDATE ${tableName} SET ? WHERE ?`;
            db.query(sql, [updateData, whereObj], (err, result) => {
                if (err) {
                    reject(err)
                }
                // console.log(result);
                resolve(result)
            });
        })
    },

    async findOne(tableName, whereObj){
        return new Promise(function(resolve, reject){
            let sql = `SELECT * FROM ${tableName} WHERE ?`;
            db.query(sql, whereObj, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return
                }
                // console.log(result);
                if(result && result[0]){
                    resolve(result[0])
                    return
                }
                resolve(null)
                return
            });
        })
    },

    async find(tableName, whereObj){
        return new Promise(function(resolve, reject){
            let sql = `SELECT * FROM ${tableName} WHERE ?`;
            db.query(sql, whereObj, (err, result) => {
                if (err) {
                    reject(err)
                }
                // console.log(result);
                resolve(result)
            });
        })
    },

    async countRecords(tableName, whereObj){
        return new Promise(function(resolve, reject){
            let sql = `SELECT * FROM ${tableName} WHERE ?`;
            db.query(sql, whereObj, (err, result) => {
                if (err) {
                    reject(err)
                }
                let count = result && result.length ? result.length : 0
                resolve(count)
            });
        })
    },

    async insertRef(tableName, data){
        return new Promise(function(resolve, reject){
            let sql = `INSERT INTO ${tableName} SET ?`;
            db.query(sql, data, (err, result) => {
                if (err) {
                    console.log("err", err)
                    reject(err)
                }
                // console.log(result);
                resolve(result.insertId)
            });
        })
    },

    async runQuery(query){
        return new Promise(function(resolve, reject){
            let sql = `${query}`;
            db.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                }
                // console.log(result);
                resolve(result)
            });
        })
    },

    async runFindFolderQuery(query){
        return new Promise(function(resolve, reject){
            let {name, type} = query
            let sql = `SELECT * FROM filesystem WHERE name = ? AND type = ?`;
            db.query(sql, [name, type], (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                    return
                }
                // console.log(result);
                if(result && result[0]){
                    resolve(result[0])
                    return
                }
                resolve(null)
                return
            });
        })
    },

    buildSortString(sortObj){
        let sortString = ""
        for (var key of Object.keys(sortObj)) {
            let str = sortString ? ',' : ''
            str += `${key} ${sortObj[key]}`
            sortString += str
        }
        return sortString
    },

    buildWhereString(whereObj){
        let whereString = ""
        for (var key of Object.keys(whereObj)) {
            let str = whereString ? ' AND' : ''
            str += ` ${key} = ${whereObj[key]}`
            whereString += str
        }
        return whereString
    }
}