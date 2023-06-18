const sequelize = require("sequelize");

const connection = new sequelize('students','root','Vital20',{

    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'

});

connection
    .authenticate()
    .then(()=>{
        console.log("PT - Banco de dados conectado com sucesso / EN - Database successfully connected");
    })
    .catch((failed)=>{
        console.log("PT - Falha ao conectar Banco de dados / EN - Failed to connect database " + failed);

    })


module.exports = connection;    