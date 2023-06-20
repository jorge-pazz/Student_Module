<template>
    
    <div class="box">
        
      <div class="boxConteiner">

            <div class="sidebar">
                <h3>Módulo Acadêmico</h3>
                <router-link to="/"><button>Alunos</button></router-link>

            </div><!--Fechamento da div SIDEBAR-->


            <div class="showcase">
                <h4>Consulta de Alunos</h4>

                <div class="login">
                    <span>Login Administrativo: </span>
                    <input type="text" name="jwtEmail" id="jwtEmail" placeholder="Digite seu Email!" v-model="authEmailField"> |
                    <input type="password" name="jwtPassword" id="jwtPassword" placeholder="Digite seu senha"  v-model="authPasswordField">
                    <button class="btnLogin" @click="login">Logar</button>
                    <router-link to="/studentLogin"><button class="btnAdminRegistration">Cadastro Administrador</button></router-link> 
                    <button class="Logout" @click="logout">Logout</button>
                </div><!--Fechamento da DIV Login-->

                <div class="showcaseHeader">                    
                    

                    <div class="search">

                        <input type="text" placeholder="Buscar aluno por CPF" v-model="search">
                        <button class="btnSearch" @click="filterStudent">Pesquisar</button>

                        <div class="contentBtnRegister">
                            <router-link to="/register"><button class="btnRegister">Cadastrar Aluno</button></router-link>
                        </div>

                    </div><!--Fechamento da div SEARCH-->

                    
                    
                   

                </div><!--Fechamento da div SHOWCASE Header-->


                <div class="searchStudent">

                        <h3>Resultado da Busca</h3>

                        <h6 v-if="consultSearch == true">Nenhum resultado na busca</h6>

                        <ul id="listSearch"></ul>

                </div><!--Fechamento da div SEARCH STUDENT-->

                <div class="showcaseContent">

                    <ul id="list"></ul>


                </div><!--Fechamento da div SHOWCASE Content :value="list.ra"-->

            </div><!--Fechamento da div SHOWCASE-->

      </div><!--Fechamento da div BOX Conteiner--> 
     

    </div><!--Fechamento da div BOX-->
    
    
    
</template>

<script>


import axios from 'axios';

    function deleteStudentSearch(item){
                                            
        let confirmation = confirm("Deseja deletar?");

            if(confirmation){
                axios.delete("http://localhost:8100/students", { data: { ra: item.getAttribute("data-ra")}})
                    .then(()=>{
                            console.log("PT - Foi excluido o aluno com sucesso / EN EN - The student was successfully deleted")
                            window.location.href = '/';
                    })
                    .catch((failed)=>{
                            console.log("PT - Falha ao excluir o aluno / EN  - Failed to delete student" + failed);
                            })
                            }else{
                                  console.log("PT - Não confirmou a exclusão / EN  - Did not confirm deletion")
                            }
                    } 
   
 


  export default{
        
    data(){
        return{

            authEmailField: this.authEmailField,
            authPasswordField: this.authPasswordField,
            axiosConfig : {headers: { authorization: "Bearer " + localStorage.getItem("token") }},
            search:"",
            searchResult: "",
            consultSearch: false,
        }
    },

    created: function(){

        
        axios.get("http://localhost:8100/students",this.axiosConfig)
            .then((res) =>{

                let listing = res.data;
                console.log(listing)
                let list = document.getElementById("list");
                console.log(list)


                if(listing.length > 0){
                    let item = document.createElement("li");
                    item.innerHTML = `` ;
                }
                                    
                
                listing.forEach((el)=>{

                console.log(el)
                let item = document.createElement("li");
                item.setAttribute("data-ra", el.ra);
                item.setAttribute("data-name", el.name);
                item.setAttribute("data-email", el.email);
                item.setAttribute("data-cpf",  el.cpf);

                item.innerHTML = `<strong> Registro Acadêmico: </strong>   <span class="tablee"> ${el.ra} </span>  | <strong> Nome: </strong>   ${el.name}  | <strong>  CPF: </strong>  ${el.cpf} ` ;
                item.style.cssText = 'color: #333; width: 90%;  border: 1px solid #ccc; padding: 5px 0; margin-bottom: 4px;'

               
                           
                //UPDATE
                let updateBtn = document.createElement("button");
                updateBtn.innerHTML = "Editar";
                updateBtn.className = "btnUpdateList";
                updateBtn.style.cssText = 'margin-right: 5px; margin-left: 5px; padding: 5px 8px; border: 1px solid #FFD454; border-radius: 5px; cursor: pointer; background-color: #FEC12C;'
                item.appendChild(updateBtn);


                updateBtn.addEventListener("click", function(){
                    console.log(item.getAttribute("data-ra"));
                    let ra = item.getAttribute("data-ra");                    
                    window.location.href = '/update/'+ ra;
                })

                            

                //DELETE
                let deleteBtn = document.createElement("button");
                deleteBtn.innerHTML = 'Excluir';
                deleteBtn.style.cssText = 'color: #fff; margin-right: 5px; margin-left: 5px; padding: 5px 8px; border: 1px solid #E46773; border-radius: 5px; cursor: pointer; background-color: #DC3545;'
                item.appendChild(deleteBtn);
                deleteBtn.setAttribute("delete", "Botao delatar aqui");

                deleteBtn.addEventListener("click", function(){
                    deletee(item)
                })

                list.appendChild(item);
      
                function deletee(item){
                 
                    let confirmation = confirm("Deseja deletar?");

                    if(confirmation){
                        axios.delete("http://localhost:8100/students", { data: { ra: item.getAttribute("data-ra")}})
                        .then(()=>{
                            console.log("PT - Foi excluido o aluno com sucesso / EN EN - The student was successfully deleted")
                            window.location.href = '/';
                        })
                        .catch((failed)=>{
                            console.log("PT - Falha ao excluir o aluno / EN  - Failed to delete student" + failed);
                        })
                    }else{
                        console.log("PT - Não confirmou a exclusão / EN  - Did not confirm deletion")
                    }
  
                }

             })
 
           })
          .catch((failed)=>{
            console.log(failed)
          })
    },

    methods:{

        login: function login(){
            let jwtEmailField = this.authEmailField;
            let jwtPasswordField = this.authPasswordField;

            let authEmailPassword = {
                email: jwtEmailField,
                password: jwtPasswordField
            }
       
            axios.post("http://localhost:8100/students/auth", authEmailPassword)
                .then((res)=>{

                    let token = res.data.token;
                    localStorage.setItem("token",token);
                    this.axiosConfig.headers.authorization = "Bearer " + localStorage.getItem("token");
                    window.location.href = '/';
                    console.log(token);
                    alert("PT - Logado com sucesso / EN - Logged in successfully ")
                })
                .catch(()=>{
                    alert("PT - Falha ao realizar o login / EN Failed to login ")
                })

            console.log(jwtEmailField + jwtPasswordField);

        },

        logout: function(){

            alert("PT - Deslogado com sucesso / EN - Logged out successfully ")
            this.axiosConfig.headers.authorization = "Bearer " + localStorage.removeItem("token");
            window.location.href = '/';

        },


        filterStudent: function(){

            if(this.search == "" || this.search == " "){
                console.log("vazio a busca")
                this.consultSearch = true;

                setTimeout(() => {
                    this.consultSearch = false
                }, 3000);

            }else{

                axios.get("http://localhost:8100/students",this.axiosConfig)
                    .then((res)=>{
                        
                        let filterSearch = res.data;

                        filterSearch.forEach((el)=>{


                            if(el.cpf == this.search){
                                console.log(el.name);

                                if(filterSearch > 0){
                                let item = document.createElement("li");
                                    item.innerHTML = `` ;
                                }

                                let listSearch = document.getElementById("listSearch")
                                listSearch.innerHTML = '';

                                let item = document.createElement("li");
                                    item.setAttribute("data-ra", el.ra);
                                    item.setAttribute("data-name", el.name);
                                    item.setAttribute("data-email", el.email);
                                    item.setAttribute("data-cpf",  el.cpf);

                                    item.innerHTML = `<strong> Registro Acadêmico: </strong>   <span class="tablee"> ${el.ra} </span>  | <strong> Nome: </strong>   ${el.name}  | <strong>  CPF: </strong>  ${el.cpf} ` ;
                                    item.style.cssText = 'color: #FFF; width: 90%;  border: 1px solid #ccc; padding: 5px 0; margin-bottom: 4px; background-color: #333'

                                    listSearch.appendChild(item)

                                    //UPDATE
                                    let updateBtn = document.createElement("button");
                                        updateBtn.innerHTML = "Editar";
                                        updateBtn.style.cssText = 'margin-right: 5px; margin-left: 5px; padding: 5px 8px; border: 1px solid #FFD454; border-radius: 5px; cursor: pointer; background-color: #FEC12C;'
                                        item.appendChild(updateBtn);


                                        updateBtn.addEventListener("click", function(){
                                        console.log(item.getAttribute("data-ra"));
                                        let ra = item.getAttribute("data-ra");                    
                                        window.location.href = '/update/'+ ra;

                                    })


                                         //DELETE
                                         let deleteBtn = document.createElement("button");
                                            deleteBtn.innerHTML = 'Excluir';
                                            deleteBtn.style.cssText = 'color: #fff; margin-right: 5px; margin-left: 5px; padding: 5px 8px; border: 1px solid #E46773; border-radius: 5px; cursor: pointer; background-color: #DC3545;'
                                            item.appendChild(deleteBtn);
                                            deleteBtn.setAttribute("delete", "Botao delatar aqui");

                                            deleteBtn.addEventListener("click", function(){
                                                deleteStudentSearch(item)
                                            })
                                                                                                    

                            }else{
                                this.consultSearch = true;
                                setTimeout(() => {
                                    this.consultSearch = false
                                }, 3000);
                            }//END else EL
                           
                        })

                    })
                    .catch((failed)=>{
                        console.log("PT - Falha ao realizar buscar / EN " + failed)
                    })

            }
            
        },
           

    }

  }
  
  
</script>

<style scoped>

.box{
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

}

.boxConteiner{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center; 
}

.sidebar{
    width: 20%;
    height: 500px;
    border: 1px solid #F2F2F2;
    background-color: #FFF;
}

.sidebar h3{
    margin-top: 0;
    padding: 3px 0;
    color: #fff;
    background-color: #4D4D4D;
}

.sidebar button{
    width: 100%;
    color: #FFF;
    border: 0;
    border-right: 20px solid #06B540;
    padding: 3px 0;
    cursor: pointer;
    background-color:#1E51BD;

}

.sidebar button:hover{
    background-color: #0967E3;
}

.showcase{
    width: 79%;
   
}

.showcase h4{
    margin-top: 0;
    padding: 5px 0;
    color: #FFF;
    background-color:#1877F2;
}

.showcaseHeader{
    width: 100%;
    height: 100px;
    
}

.search{
    width: 100%;
    height: 100px;
    float: left;
}

.search input{
    width: 70%;
    padding: 5px 2px;
    border: 1px solid #EDEDED;
    
}

.btnSearch{
    padding: 5px 5px;
    color: #fff;    
    border: 0;
    cursor: pointer;
    background-color: #6060D1;
}

.btnSearch:hover{
    background-color: #3838AB;
}
.contentBtnRegister{
    width: 20%;
    height: 100px;
    float: right;

}

.btnRegister{
    width: 79%;
    color: #fff;
    padding: 5px 3px;
    border: 1px solid #069937;
    border-radius: 5px;
    cursor: pointer;
    background-color: #06B540;
}

.btnRegister:hover{
    background-color: #069937;;
}

.showcaseContent{
    width: 100%;
}

.login{
    margin-bottom: 10px;
}

.login span{
    font-weight: bold;
    color: #777;
}

.btnLogin{
    color: #FFF;
    padding: 3px 7px;
    border: 0;
    cursor: pointer;
    background-color: #5C5CCC;
}
.btnLogin:hover{
    background-color: #3838AB;
}

.btnAdminRegistration{
    text-decoration: none;
    margin-left: 30px;
    background-color: #ED375E;
    border: 1px solid #D3334B;
    border-radius: 5px;
    color: #FFF;
    padding: 3px 6px;
    cursor: pointer;
}

.btnAdminRegistration:hover{
    background-color: #D3334B;;
}

.Logout{
    float: right;
    color: #FFF;
    padding: 3px 6px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #333;
    cursor: pointer;
}

.Logout:hover{
    background-color: #555;
}

.searchStudent{
    margin-bottom: 20px;
    color: #fff;
    border-bottom: 1px solid #ccc;
    padding: 2px 0;
    background-color: #1877F2;
}

.btnUpdateList:hover{
    background-color: #069937;
}


ul{
    list-style: none;
}

ul li{
    border: 1px solid #ccc;
}



</style>