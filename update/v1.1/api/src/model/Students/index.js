const sequelize = require("sequelize");
const connection = require("../../database");

const Students = connection.define('registration',{

     
    name:{
        type: sequelize.STRING,
        allowNull: false
    },

    email:{
        type:sequelize.STRING,
        allowNull: false
    },

  ra:{
       type:sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false
   },

    cpf:{
        type:sequelize.STRING(11),
        allowNull:false
    }

});

Students
    .sync({force:false})
    .then((res)=>{
        res.statusCode = 200;
        console.log("PT - Tabela criada com sucesso / EN - Table created successfully " + res.statusCode);
    })
    .catch((failed, res)=>{
        res.statusCode = 400;
        console.log("PT - falha ao criar tabela / EN - failed creating table " + failed + res.statusCode);
    });


module.exports = Students;