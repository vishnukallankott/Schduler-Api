const database = require('../config/dbConfig')
const candidatesModel = require('../models/candidatesModel')
const connection = async () => {
    try {
        await database.authenticate()
        await database.sync({ alter: true })
        console.log("DataBase Connection Established Successfully")
    }
    catch (e) {
        console.log("error occured", e.message)
    }
}

module.exports = connection