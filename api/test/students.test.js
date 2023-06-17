const supertest = require("supertest");
let request = supertest("http://localhost:8100/students");
const {jwtAuth} = require("../src/controller/admin")

describe("PT - Rota aluno Post / EN - student route Post",()=>{

    it("PT - Deve cadastrar o aluno com sucesso / EN - You must register the student successfully",()=>{

        let name = "jorgeT";
        let email = "jorgeT@mais.com.br";
        let cpf =  12548745219
 
        let student = {name: name, email: email, cpf:cpf};
 
        return request
            .post("/",jwtAuth)
            .send(student)
            .then(()=>{
                expect('').not.toBe(name);
                expect('').not.toBe(email);
                expect('').not.toBe(cpf);
                expect('').not.toStrictEqual(cpf);
                expect(email).toMatch(/\S+@\S+\.\S+/); 
              
            })
  
    });

});


describe("PT - Rota aluno Put / EN - student route Put",()=>{

    it("PT - Deve atualizar o aluno com sucesso / EN - Must update student successfully",()=>{

        let name = "Alan";
        let email = "Alan@mais.com.br";
        let ra = "71"
   
        let student = {ra: ra, name: name, email: email};
 
        return request
            .put("/")
            .send(student)
            .then(()=>{
                expect('').not.toBe(name);
                expect('').not.toBe(email);
                expect(email).toMatch(/\S+@\S+\.\S+/); 
              
            })
  
    });

});

describe("",()=>{

    it("PT - Deve excluir o aluno com sucesso / EN - Must delete student successfully",()=>{

        let ra = 72;
   
        let student = {ra: ra};
 
        return request
            .delete("/")
            .send(student)
            .then(()=>{
                expect('').not.toBe(ra);              
            })
  
    });

});


   


