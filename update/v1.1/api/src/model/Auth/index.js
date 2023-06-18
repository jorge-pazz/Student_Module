const sequelize = require("sequelize");
const connection = require("../../database");


const auth = connection.define('auth',{

  
    email:{
        type: sequelize.STRING,
        allowNull: false
    },

    password:{
        type:sequelize.STRING,
        allowNull: false
    },
  

});

auth
    .sync({force:false})
    .then((res)=>{
        res.statusCode = 200;
        console.log("PT - Tabela criada com sucesso / EN - Table created successfully " + res.statusCode);
    })
    .catch((failed, res)=>{
        res.statusCode = 400;
        console.log("PT - falha ao criar tabela / EN - failed creating table " + failed + res.statusCode);
    });


module.exports = auth;