const { raw, json } = require("body-parser");
const modelStudents = require("../model/Students");
const modelAuth = require("../model/Auth");
const { INTEGER, where } = require("sequelize");


function getStudents(req,res){
    
    modelStudents
        .findAll({ raw: true, order:[['ra','DESC']]})
        .then((student)=>{

            if(student.length < 0){
                res.statusCode = 404;
                res.send("PT - Nenhum aluno encontrado  banco de  dados / EN - No students found database ");
            }else{
                res.statusCode = 200;
                res.send(student)
            }
            
        })
        .catch((failed)=>{            
            res.send("PT - Falha ao realizar consulta / EN - Failed to perform query " + failed);
        })
        
};


function postStudents(req,res){

    let {name, email, cpf} =  req.body;
    let convertCpf = parseInt(cpf);  

    let validateEmail = /\S+@\S+\.\S+/;
    let validateCpf = `${cpf}`;

    if(validateEmail.test(email) && validateCpf.length == 11 && !isNaN(validateCpf)){
        modelStudents
        .findOne({
            where:{cpf:cpf}
        })
        .then((students)=>{
            if(!students){

                if(name == '' || name == ' ' || email == '' || email == ' ' || cpf == '' || cpf == ' ' || isNaN(cpf)){
                    res.statusCode = 400;
                    res.send("PT - Preencha todos os campos / EN - Fill in all fields");
        
            }else if(name == undefined || email == undefined || cpf == undefined || undefined){
                     res.statusCode = 400;
                     res.send("PT - Preencha todos os campos / EN - Fill in all fields");
        
            }else{
                    
                modelStudents
                .create({
                    name: name,
                    email:email,
                    cpf: cpf
                })
                .then(()=>{
                    res.statusCode = 200;
                    res.send("PT - Cadastro do aluno realizado com sucesso / EN - Students registration completed successfully");
                })
                .catch((failed)=>{
                    res.statusCode = 400;
                    res.send("PT - Falha ao realizar cadastro do aluno / EN - Failed to register the student " + failed);
                })
        
            }
                
            }else{          
                res.send('PT- CPF já cadastrado / EN - CPF already registered')                
            }
            
        })
        .catch()
    }else{
        res.send("PT - Verifique seu Email ou CPF  / EN - Check your Email or CPF")
    }       
 
  
};


function putStudents(req,res){

    let {ra, name, email, cpf} = req.body;

    parseInt(ra);

    if(name == '' || name == ' ' || email == '' || email == ' '){
        res.statusCode = 400;
        res.send("PT - Preencha todos os campos corretamente / EN - Complete all the fields correctly");

    }else{

        modelStudents
        .update({
            name: name,
            email: email,
        },{ where:{
            ra:ra
        }})
        .then((student)=>{

            if(student <= 0){
                res.statusCode = 404;
                res.send("PT - Aluno não encontrado para ser atualizado / EN - Student not found to be updated ")
            }else{
                res.statusCode = 200;
                res.send("PT - Aluno atualizado com sucesso / EN - Student updated successfully " + student)
            }

        })
        .catch((failed)=>{
            res.statusCode = 400;
            res.send("PT - Falha na alteração do aluno / EN - Student change failure " + failed);
        })

    }

};


function deleteStudents(req,res){

    let ra = req.body.ra;   
   
   if(ra != undefined){

                    
            modelStudents
                .destroy({
                    where:{
                        ra: ra
                    }
                })
                .then((students)=>{


                    if(students == 0){
                        res.statusCode = 404;
                        res.send("PT - Aluno não encontrado para excluir / EN - Student not found to delete ")
                    }else{
                        res.statusCode = 200;
                        res.send("PT - Aluno excluido com sucesso / EN - Student deleted successfully ");
                    }
                                        
                })
                .catch(()=>{
                    res.statusCode = 400;
                    res.send("PT - Falha ao excluir Aluno / EN - Failed to delete Student ");
                })



    }else{
        res.statusCode = 400;
        res.send("PT - É undefined / EN - is undefined");
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

    getStudents,
    postStudents,
    putStudents,
    deleteStudents,
    record

}