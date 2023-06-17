<template>

    <NavBar />

    <h3>Cadastro de Aluno</h3>

    <div class="registrationForm">
        <input type="text" name="name" id="name" placeholder="Informe seu nome completo" required v-model="nameField">
        <span v-if="msgName == true" class="showmsg">Nome inválido</span>
        <input type="text" name="name" id="name" placeholder="Informe seu email" v-model="EmailField">
        <span v-if="msgEmail == true" class="showmsg">Email inválido</span>
        <input type="text" name="name" id="name" placeholder="Seu RA completo" value="*****" disabled>
        <input type="text" name="name" id="name" placeholder="Informe seu CPF" v-model="CpfField" maxlength="11">
        <span v-if="msgCpf == true" class="showmsg">CPF inválido</span>
        <span v-if="showmsg == true">Cadastrado com sucesso</span>
        <span v-if="showCpfregistered == true" class="showmsg">CPF já Cadastrado</span>
        
    </div>
        <router-link to="/"><button class="cancelButton">Cancelar</button></router-link>        
        <button @click="registerStudent">Cadastrar</button>
</template>

<script>
import axios from 'axios';
import NavBar from '../components/NavBar';

 
export default{

        components:{
            NavBar
        },
        
        created: function(){
            axios.get("http://localhost:8100/students", this.axiosConfig)
                .then((res)=>{
                    console.log(res);
                })
                .catch((failed=>{
                    console.log("PT - Falha ao lista alunos / EN - Failed to list students" + failed);
                }))
        },

        data(){
            return{

                nameField: "",
                EmailField: "",
                CpfField: "",
                Cpfregistered: false,
                showmsg: false,
                msgName: false,
                msgEmail: false,
                msgCpf: false,
                showCpfregistered: false,
                axiosConfig : {headers: { authorization: "Bearer " + localStorage.getItem("token") }}
           
            }
        },

        methods:{
            registerStudent: function(){

                let validateEmail = /\S+@\S+\.\S+/;

                let specialCharacter  = /\W|_/;
            
                if(!this.nameField || this.nameField == ' ' ){
                    this.msgName = true;

                    setTimeout(() => {
                        this.msgName = false
                    }, 4000);

                }else if(!this.EmailField || this.EmailField == ' ' || validateEmail.test(this.EmailField) == false || specialCharacter.test(this.EmailField[0]) == true){
                    this.msgEmail = true;

                    setTimeout(() => {
                        this.msgEmail = false
                    }, 4000);

                }else if(!this.CpfField || this.CpfField  == ' '|| isNaN(this.CpfField) || this.CpfField.length < 11 || specialCharacter.test(this.CpfField) == true){
                    this.msgCpf = true;

                    setTimeout(() => {
                        this.msgCpf = false
                    }, 4000);

                }else{

                    let student = {
                        name: this.nameField,
                        email: this.EmailField,
                        cpf: this.CpfField 
                    }

                    ///

                    axios.get("http://localhost:8100/students" ,this.axiosConfig)
                         .then((res)=>{

                            let valida  = res.data;
                            valida.forEach(element => {
                                        
                            if(element.cpf === student.cpf){
                                 this.Cpfregistered  = true;
                               }

                            });

                            })
                           .catch((failed)=>{
                            console.log("PT - Falha ao lista alunos / EN - Failed to list students" + failed)
                           })


                    ///   
                       
                    axios.post("http://localhost:8100/students", student, this.axiosConfig)
                        .then((res)=>{

                           
                            if(res.status == 200){

                                if(this.Cpfregistered ==  false){

                                    this.showmsg = true;
                                    this.nameField = "";
                                    this.EmailField = "";
                                    this.CpfField = "";
                                }

                                if(this.Cpfregistered ==  true){
                                    this.showCpfregistered = true;
                                }

                                setTimeout(() => {
                                    this.showCpfregistered = false
                                  }, 3000);

                                setTimeout(() => {
                                    this.showmsg = false
                                  }, 3000);

                            }
    
                        })
                        .catch((failed)=>{
                            console.log("PT - Falha ao lista alunos / EN - Failed to list students " + failed);
                        })

                    

                }
       
            
            },

            registrationcancel: function(){
                window.location.href = '/';
            } 
        

        }
}

    

</script>



<style scoped>

.registrationForm{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #ccc;
    align-items: center;
    padding:15px;
    box-sizing: border-box;


}

input{
    width: 80%;
    padding: 8px 3px;
    margin-top: 5px;
}

button{
    margin-top: 7px;
    margin-left: 10px;
    padding: 4px 40px;
    border: 0;
    border-radius: 7px;
    color: #fff;
    background-color:#28A745;
    cursor: pointer;
    
}


button:hover{
    background-color:#158A30;
}

.cancelButton{
    background-color:#D1565A;
}

.cancelButton:hover{
    background-color:#C43140;
}

span{
    width: 90%;
    padding: 5px 0;
    margin-top: 5px;
    background-color: #D4EDDA;
    color: #2E573C;
    
}

.showmsg{
    width: 90%;
    padding: 5px 0;
    margin-top: 5px;
    background-color: #FFF3CD;
    color: #94761F  
}

</style>