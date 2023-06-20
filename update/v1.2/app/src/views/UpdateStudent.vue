<template>

    <NavBar />

    <h3>Atualizar Aluno</h3>

    <div id="form">

        <label>
            <span class="spanForm">Nome:</span>
            <input type="text" name="name" id="name" placeholder="Informe seu nome completo" required>   
            <h6 v-if="msgName == true" class="showmsg">Nome inválido</h6>       
        </label>

        <label>
            <span class="spanForm">Email:</span>
            <input type="text" name="email" id="email" placeholder="Informe seu email" required>   
            <h6 v-if="msgEmail == true" class="showmsg">Email inválido</h6>     
        </label>

        <label>
            <span class="spanForm">RA:</span>
            <input type="text" name="ra" id="ra" placeholder="Seu RA completo"  disabled>  
        </label>

        <label>
            <span class="spanForm">CPF:</span>
            <input type="text" name="cpf" id="cpf" placeholder="Seu CPF"  disabled>  
            <h6 v-if="msgSuccess == true" class="showmsg">Atualizado com Sucesso</h6>  
        </label>
        

    </div><!--Fechamento da DIV FORM-->

        <router-link to="/"><button class="cancelButton">Cancelar</button></router-link>        
        <button @click="editStudent" id="editBtn">Alualizar</button>

</template>

<script>

import axios from 'axios';
import NavBar from '../components/NavBar';

 
export default{

        components:{
            NavBar
        },

                
        created: function(){

            this.parameter = this.$route.params.ra;
            

            axios.get("http://localhost:8100/students", this.axiosConfig)
                .then((res)=>{
                   
                    let listing = res.data;
                    console.log(listing)

                    listing.forEach((el)=>{

                       
                        let convert = parseInt(this.parameter)
                        

                        if(el.ra == convert){
                            let editName = document.getElementById("name");
                            let editEmail = document.getElementById("email");
                            let editRa = document.getElementById("ra");
                            let editCpf = document.getElementById("cpf");
                            editName.value = el.name;
                            editEmail.value = el.email;
                            editRa.value = el.ra;
                            editCpf.value = el.cpf;

                            let editBtn = document.getElementById("editBtn");
                            editBtn.addEventListener("click", ()=>{

                                let validateEmail = /\S+@\S+\.\S+/;
                                let specialCharacter  = /\W|_/;
            
                                    if(!editName.value || editName.value == ' ' || validateEmail.test(editName) == true || specialCharacter.test(editName[0]) == true ){
                                        this.msgName = true;

                                        setTimeout(() => {
                                            this.msgName = false
                                        }, 4000);

                                    }else if(!editEmail.value || editEmail.value == ' ' || validateEmail.test(editEmail.value) == false || specialCharacter.test(editEmail.value[0]) == true){
                                        this.msgEmail = true;
                                        console.log()

                                        setTimeout(() => {
                                            this.msgEmail = false
                                        }, 4000);

                                    }else{

                                        let student = {
                                        ra: editRa.value,
                                        name: editName.value,
                                        email: editEmail.value,
                                    }
                                         console.log(student)

                                    axios.put("http://localhost:8100/students", student, this.axiosConfig )
                                        .then(()=>{

                                            this.msgSuccess = true
                                            setTimeout(() => {
                                             this.msgSuccess = false
                                            }, 4000);
                                            
                                        })
                                        .catch((failed)=>{
                                            console.log("PT - Falha ao realizar a atualização / EN Failed to perform the update" + failed);
                                        })


                                    }                                        
                                  })
                                }         
                            })

                }).catch()

                
        },

        data(){
            return{

                parameter: "",
                raField: "",
                nameField: "",
                EmailField: "",
                CpfField: "",
                showmsg: false,
                msgName: false,
                msgEmail: false,
                msgCpf: false,
                axiosConfig : {headers: { authorization: "Bearer " + localStorage.getItem("token") }},
                msgSuccess: false
           
            }
        },

        methods:{
            

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
    flex-wrap: wrap;
    border: 1px solid #ccc;
    align-items: center;
    padding:15px;
    box-sizing: border-box;


}

input{
    width: 80%;
    padding: 3px;
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
    color: #94761F;  
}


#form{
    border: 1px solid #ccc;
    padding: 10px 0;
}

#form label h6{
    float: left;
    align-items: center;
    width: 100%;
   
}

#form label{
    width: 100%;
    display: inline-block;
    padding-bottom: 10px;

}
.spanForm{

    float: left;
    width: 20%;
    text-align: right;
    margin-right: 10px;
    background-color: #fff;
}


#form label input{
    width: 70%;
    padding: 3px;
    margin-top: 5px;
    float: left ;
   
}



</style>