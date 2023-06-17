const { raw, json } = require("body-parser");
const modelAuth = require("../../model/Auth");
const { INTEGER, where } = require("sequelize");

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
                res.send("Token Invalido " + failed);
            }else{
                res.statusCode = 200;
                req.authToken = authToken;
                next()
            }
        })

    }else{
        res.statusCode = 401;
        res.send("Faça sua autenticação para realizar essa operação")
    }

    
}

function auth(req,res){

    let{email, password} = req.body;

    if(email != undefined){

        let user = modelAuth
                    .findOne({raw: true, where:{ email: email}})
                    .then((user)=>{

                        if(user.lenght != 0 && user.password == password){
                           
                           jwt.sign({email: user.email}, jwtSecret,{expiresIn:'48h'},(failed, token)=>{
                                if(failed){
                                    res.statusCode = 401;
                                    res.send("Falha ao gerar token " + failed)
                                }else{
                                    res.statusCode = 200;
                                    res.json({ token: token})
                                }
                           })
  
                        }else{
                            res.statusCode = 401;
                            res.send("Email não existe na base de dados")
                        }

                        
                    })
                    .catch((failed)=>{
                        res.statusCode = 404;
                        res.send("Email não existe na base de dados");
                    })

    }else{
        res.statusCode = 401;
        res.send("Credenciais Invalidas");
    }
  
};


function record(req,res){

    let {email, password} = req.body;
    let validateEmail = /\S+@\S+\.\S+/;

    if(email == "" || email == " " || validateEmail.test(email) == false){  
        res.statusCode = 400;         
        res.send("Email invalido");
    }else if(password == "" || password == " "){  
        res.statusCode = 400;         
        res.send("Senha invalida");
    }else{
       
        modelAuth.create({
            email: email,
            password: password
        })
        .then(()=>{
            res.statusCode = 200
            res.send("Cadastrado com Sucesso");
        })
        .catch((failed)=>{
            console.log(failed)
        })
        
    }
    
}


module.exports ={
    
    record,
    auth,
    jwtAuth,


}