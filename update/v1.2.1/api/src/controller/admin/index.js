const { raw, json } = require("body-parser");
const modelAuth = require("../../model/Auth");
const { INTEGER, where, useInflection } = require("sequelize");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtSecret = "dzxf1zQ1dfh78uCVEG68u4Ese68dbVv5zrxzdrh5";

function jwtAuth(req,res,next){

    const authToken = req.headers['authorization'];
    console.log(authToken);
    
    if(authToken != undefined){

        bearer = authToken.split(" ");
        console.log(bearer);

        tokenAuth = bearer[1];
        console.log(tokenAuth);

        jwt.verify(tokenAuth, jwtSecret,(failed, data)=>{

            if(failed){
                res.statusCode = 400;
                res.send("PT - Token Invalido / EN - Invalid Token" + failed);
            }else{
                res.statusCode = 200;
                req.authToken = authToken;
                next()
            }
        })

    }else{
        res.statusCode = 401;
        res.send("PT - Faça sua autenticação para realizar essa operação / EN - Authenticate to perform this operation")
    }

    
}

function auth(req,res){

    let{email, password} = req.body;
   

    if(email != undefined){

        let user = modelAuth
                    .findOne({raw: true, where:{ email: email}})
                    .then((user)=>{

                      let correctPasswword = bcrypt.compareSync(password, user.password);
                      if(correctPasswword){

                        if(user.lenght != 0){
                           
                            jwt.sign({email: user.email}, jwtSecret,{expiresIn:'48h'},(failed, token)=>{
                                 if(failed){
                                     res.statusCode = 401;
                                     res.send("PT - Falha ao gerar token / EN - Failed to generate token" + failed)
                                 }else{
                                     res.statusCode = 200;
                                     res.json({ token: token})
                                 }
                            })
   
                         }else{
                             res.statusCode = 401;
                             res.send("PT - Email não existe na base de dados / EN - Email does not exist in the database")
                         }

                      }else{
                        res.statusCode = 401;
                        res.send("PT - Credenciais Invalidas / EN - Invalid Credentials");
                      }


                        

                        
                    })
                    .catch((failed)=>{
                        res.statusCode = 404;
                        res.send("PT - Email não existe na base de dados / EN - Email does not exist in the database");
                    })

    }else{
        res.statusCode = 401;
        res.send("PT - Credenciais Invalidas / EN - Invalid Credentials");
    }
  
};


function record(req,res){

    let {email, password} = req.body;
    let validateEmail = /\S+@\S+\.\S+/;
    const regex = /\W|_/;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);


    modelAuth.findOne({where: {email:email}}).then(user =>{

        if(user == undefined){
            
            if(email == "" || email == " " || validateEmail.test(email) == false || regex.test(email[0]) == true){  
                res.statusCode = 400;         
                res.send("Email invalido");
            }else if(password == "" || password == " " || password == undefined){  
                res.statusCode = 400;         
                res.send("Senha invalida" + password.lenght);
            }else{
               
                modelAuth.create({
                    email: email,
                    password: hash
                })
                .then(()=>{
                    res.statusCode = 200
                    res.send("PT - Cadastrado com Sucesso / EN - Registered successfully");
                })
                .catch((failed)=>{
                    res.statusCode = 400;
                    res.send("PT - Falha ao cadastrar / EN - failed to register")
                })
                
            }

        }else{
            res.statusCode = 400;
            res.send("PT - Usuário já cadastrado / EN - User already registered ")
        }

    }).catch((failed)=>{
        statusCode = 400;
        res.send("PT - Falha ao cadastrar / EN Failed to register " + failed)
    })

    
}


module.exports ={
    
    record,
    auth,
    jwtAuth,


}