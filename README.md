# Student Module
O módulo aluno online, permite que a gestão acadêmica realize o cadastro do aluno, visualize os alunos cadastrado, faça a alteração do seu cadastro e a exclusão do aluno.

- Para realizar qualquer tipo de ação no sistema é necessário que esteja logado.

### Download

<strong><h3>Nova versão v1.2.1</h3> </strong> Encontra-se mais atual e com novas fucionalidades (Alertas, Style, criptografia).
<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/nova_versao1_2.png" /></div>

- Nesse passo também necessita instalar o banco de dados MYSQL e criar um banco com o nome ( students ).

Caso não queria fazer o clonar o repositório basta realizar o download <strong>( click em code e depois em Download zip )</strong> e roda o comando na pasta ( api ) - ( npm install e npm install -g nodemon ) e depois ( nodemon server.js ) e na pasta ( app ) - ( npm install e npm install validar-cpf ) e depois ( npm run serve )

## Instalação

- A versão do nodejs utilizada no momento de desenvolvimento da aplicação foi ( V18.16.0 ).

#### Configurando banco de dados
1 - É necessário que tenha o MYSQL instalado pois a API tem integração com banco de dados, caso não tenha o MYSQL instalado basta acessar o site https://www.mysql.com/downloads/ ou https://dev.mysql.com/downloads/installer/ e realizar o download do MYSQL.

2 - Realize o clone do repositório ou baixe os arquivos em ZIP.

3 - Depois de instalar o MYSQL crie um banco de dados com o nome ( students )

4 - Acesse a pasta API, em seguida vá até o diretório (src/database/), abra o arquivo (index.js) e realize a edição do arquivo de configuração do bando de dados alterando o (usuário e senha) para o que você definiou na instalação do seu MYSQL, na API por padrão encontra-se usuário ( root ) e senha ( Vital20 ).

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/config_db.png" /></div>

#### Configurando API
1 - Depois que realizou a instalação e configuração do banco de dados, abra a pasta da API através do terminal e em seguida rode o comando ( npm install e npm install -g nodemon) para baixar todas as dependências utilizadas.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/npmInstall_api.png" /></div>

2 - Com as dependências instaladas abra a pasta da API através do terminal e rode o comando ( nodemon server.js ), para startar o servidor da API.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/start_api.png" /></div> 

#### Configurando Aplicação 

1 - Depois que realizou a instalação e configuração da API, abra a pasta da ( app ) através do terminal e em seguida rode o comando ( npm install e npm install validar-cpf ) para baixar todas as dependências utilizadas.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/npmInstall_app.png" /></div>

2 - Com as dependências instaladas abra a pasta ( app ) através do terminal e rode o comando ( npm run serve ), para startar a aplicação.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/start_app.png" /></div>

## Endpoint API

### GET URL/students/

(Precisa está logado para realizar a listagem)

Esse endpoint é responsavél por listar todos os usuários cadastrado no banco de dados.

#### Parâmetros

Não necessita de parâmetros.

#### Status

##### OK | 200
Caso esse status acontece você irá obter a listagem de todos os Alunos cadastrado

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/200_get.png" /></div>

##### Não Encontrado | 401
Caso esse status acontece significa que precisa see autenticar para realizar a consulta

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/falha_401_get.png" /></div>

##### Bad Request | 400

Caso esse status acontece significa falha ao realizar consulta de alunos

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_get.png" /></div>

### POST URL/students/

(Precisa está logado para realizar o cadastro de aluno)

Esse endpoint é responsavél por cadastrar aluno no banco de dados.

#### Parâmetros
name, email, cpf

´´´
{

    "name": "Pedro Santos",
    "email": "pedro@hotmail.com",
    "cpf": "05048748228"

}

´´´
#### Status

##### OK | 200
Caso esse status acontece o cadastro do aluno foi realizado com sucesso!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/200_post.png" /></div> 

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao tentar cadastrar!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_post.png" /></div>

### PUT URL/students/

(Precisa está logado para realizar a atualização do cadastro de aluno)

Esse endpoint é responsavél por atualizar o cadastro do aluno no banco de dados.

#### Parâmetros
ra, name, email

´´´
{

    "name": "Pedro Santos",
    "email": "pedro@hotmail.com",
    "cpf": "05048748228"

}

´´´

##### OK | 200
Caso esse status acontece o cadastro do aluno será atualizado com sucesso!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/200_put.png" /></div>

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao tentar atualizar o aluno!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_post.png" /></div>

##### Bad Request | 404
Caso esse status aconteca não foi encontrado nenhum aluno para realizar a atualização!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/404_put.png" /></div>

### DELETE URL/students/

(Precisa está logado para realizar a exclusão do aluno)

Esse endpoint é responsavél por atualizar o cadastro do aluno no banco de dados.

#### Parâmetros
ra

´´´
{
    
    "ra": "46"

}
´´´

##### OK | 200
Caso esse status acontece a excllusão do aluno terá feita com sucesso!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/200_delete.png" /></div>

##### Bad Request | 404
Caso esse status aconteca não foi encontrado nenhum aluno para realizar a exclusão!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/404_delete.png" /></div>

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao realizar a exclusão!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_delete.png" /></div>

### POST URL/students/record

Esse endpoint é responsavél por ( cadastrar ) usuário administrador que pode manipular os dados dos alunos no banco de dados.

#### Parâmetros
email, password

´´´
{

    "email": "santos@hotmail.com",
    "password": "admin123"

}

´´´

##### OK | 200
Caso esse status acontece o usuário administrador estará cadastrado com sucesso.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/record_200.png" /></div>

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao cadastrar email ou senha invalido!

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_get.png" /></div>


### POST URL/students/auth

Esse endpoint é responsavél por ( logar ) usuário administrador que pode manipular os dados dos alunos no banco de dados.

#### Parâmetros
email, password

´´´
{

    "email": "santos@hotmail.com",
    "password": "admin123"

}

´´´

##### OK | 200
Caso esse status acontece o usuário administrador estará logado com sucesso para manipular os dados dos alunos!
Dessa forma o token é gerado

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/auth_200.png" /></div>

##### Bad Request | 404
Caso esse status aconteca email ou password está invalido.
<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/auth_404.png" /></div>

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao logar

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/400_get.png" /></div>

## Token
Caso deseje alterar o tempo que expira o token basta acessa a pasta ( API ) depois os diretório ( src/controller/admin ) e acesse o arquivo ( index.js ), encontrar ( JWT.sign ), então basta colocar o tempo desejado.

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/tempo_token.png" /></div>

## Testes
Caso queira realizar algum teste automatizado nas rotas, basta tirar o Middleware das rotas

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/router.png" /></div>

Para realizar teste automatizado basta abrir o terminal no diretorio raiz da pasta ( API ) e rodar o seguinte comando ( npm run test )

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/terminal_test.png" /></div>

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/test.png" /></div>

## Tecnologia

Para realizar a criação do sistema, foi utilizadas as seguintes tech (NODE, VUE), com suas seguintes dependências (Express, Nodemon, BodyParser, Sequelize, MYSQL, Jest, cors, Bulma, JWT).
 - Para atualização futuras pode utiliza outras dependências como ( Bcrypt(criptografia) - Já implementada na versão v1.2, Knex, Cookie Parser, mongo(mongoose) ), restringir acesso por setorr administrativo ex: Módulo aluno, Módulo financeiro.

## Screenshot

### v1.0 

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/home.png" /></div>

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/Cadastro_aluno.png" /></div>

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/Cadastro_admin.png" /></div>

### v1.1 - Sistema de Busca

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/search.png" /></div>

### v1.2 - Alertas, Style e criptografia

<div align="center"><img src="https://jorgepaz.com.br/downloads/imagem/versao1_2.png" /></div>
