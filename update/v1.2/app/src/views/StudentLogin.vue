<template>
    <div>
        <div id="login">

        <div class="card">

            <h2>Tela de Cadastro</h2>

            <div class="card-content">

                <div class="card-content-area">

                    <label>Email</label>

                    <input type="text" id="fieldEmailAuth" name="emailAuth" v-model="emailAuthField" >
                    <span v-if="msgShowEmail == true">Email inválido</span>

                </div>

                <div class="card-content-area">

                    <label>Senha</label>

                    
                    <input type="password" id="fieldPasswordAuth" name="passwordAuth" v-model="passwordAuthField" >
                    <span v-if="msgShowPassword == true">Senha inválida</span>

                </div>

            </div>

            <div class="card-footer">


                <button @click="auth()" class="submit">Logar</button>

                <ul id="list" style="display:none;"></ul>

                <router-link to="/"><a href="#">Já sou cadastrado</a></router-link> 

            </div>

        </div>


        </div>

    </div>
</template>

<script>

import axios from 'axios'



export default{

    

    data(){
        return{

            emailAuthField: this.emailAuthField,
            passwordAuthField: this.passwordAuthField,
            msgShowEmail: false,
            msgShowPassword: false            

        }

    },

    created: function(){

        axios.get("http://localhost:8100/students")
                .then((res)=>{
                    console.log(res);
                })
                .catch((failed=>{
                    console.log("PT - Falha ao lista alunos / EN - Failed to list students " + failed);
                }))
            
    },

    methods:{

     auth: function(){

        let emailAuth = this.emailAuthField;
        let passwordAuth = this.passwordAuthField;

        let validateEmail = /\S+@\S+\.\S+/;
        const specialCharacter = /\W|_/;
        
        if(emailAuth == "" || emailAuth == " " || validateEmail.test(emailAuth) == false || specialCharacter.test(emailAuth[0]) == true){
            console.log("PT - Email inválido / EN Invalid email"); 
            this.msgShowEmail = true; 
           
            
        }else if(passwordAuth == "" || passwordAuth == " " || passwordAuth == undefined ){
            console.log("PT - Senha inválida / EN Invalid password");  
            this.msgShowPassword = true; 

        }else{

        

            ///
            let authEmailSenha = {
                    email: emailAuth,
                    password : passwordAuth
                }

            axios.post("http://localhost:8100/students/record",authEmailSenha)
                .then(()=>{
                    console.log("PT - Cadastrado com Sucesso / EN Registered successfully");
                    alert("PT - Cadastrado com Sucesso / EN Registered successfully")
                    window.location.href = '/';
                })
                .catch((failed)=>{
                    console.log("PT - Falha ao Cadastrar / EN Failed to Register " + failed)
                })   

            
            }

            setTimeout(() => {
                    this.msgShowPassword = false
                }, 3000);

            setTimeout(() => {
                    this.msgShowEmail = false
                }, 3000);

            ///     

        }

       

    }


}
    
</script>

<style scoped>

    #login {

    display: flex;

    align-items: center;

    justify-content: center;

    height: 80vh;

    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

    }

    span{
        color: #fff;
    }

    .card {

    background-color: #333;

    padding: 40px;

    border-radius: 2px;

    width:280px;

    }

    .card h2{
        color: #fff;
    }

    .list{
        display: none;
    }
  

    .card-content label {

    color: #fff;

    font-size: 12px;

    opacity: 0.8;

    }

    .card-content-area {

    display: flex;

    flex-direction: column;

    padding:10px 0;

    }

    .card-content-area input {

    margin-top: 10px;

    padding:0 5px;

    background-color: transparent;

    border:none;

    border-bottom: 1px solid #e1e1e1;

    outline: none;

    color: #fff;

    }

    .card-footer {

    display: flex;

    flex-direction: column;

    }

    .card-footer .submit{

    width: 100%;

    height: 40px;

    background-color: #158A30;

    border:none;

    color:#e1e1e1;

    margin: 10px 0;
    cursor: pointer;

    }

    .card-footer a {

    text-align: center;

    font-size: 12px;

    opacity: 0.8;

    color: #fff;

    text-decoration: none;

    }

    

</style>