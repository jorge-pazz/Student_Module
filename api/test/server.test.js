const supertest = require("supertest");
let request = supertest("http://localhost:8100/students");

test("PT - Deve responder statusCCode 200 / EN - Must reply statusCCode 200",async ()=>{

       return await request
        .get("/")
        .then((res)=>{
            expect(res.statusCode).toEqual(200)
        })
  
});