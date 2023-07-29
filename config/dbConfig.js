const sequalize=require('sequelize')
const dotenv=require('dotenv')
dotenv.config()
const database=new sequalize(process.env.database,process.env.user,process.env.password,{
    host:process.env.host,
    dialect:'mysql',
    define:{freezeTableName:true},
    logging:false

})

module.exports=database