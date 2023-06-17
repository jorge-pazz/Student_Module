# Student Module
O módulo aluno online, permite que a gestão acadêmica realize o cadastro do aluno, visualize os alunos cadastrado, faça a alteração do seu cadastro e a exclusão do aluno.

### Download
Caso não queria fazer o passo a passo da instalação basta realizar o download do arquivo ( system.zip ), e rodas o comando na pasta ( api ) ( nodemon server.js ) e na pasta ( app ) ( npm run serve )

## Instalação

#### Configurando banco de dados
1 - É necessário que tenha o MYSQL instalado pois a API tem integração com banco de dados, caso não tenha o MYSQL instalado basta acessar o site https://www.mysql.com/downloads/ ou https://dev.mysql.com/downloads/installer/ e realizar o download do MYSQL.

2 - Realize o clone do repositório ou baixe os arquivos em ZIP.

3 - Acesse a pasta API, em seguida vá até o diretório (src/database/), abra o arquivo (index.js) e realize a edição do arquivo de configuração do bando de dados alterando o (usuario e senha) para o que você definiou na instalação do seu MYSQL, na API por padrão encontra-se usuario ( root ) e senha ( Vital20 ).

[imagem]

#### Configurando API
1 - Depois que realizou a instalação e configuração do banco de dados, abra a pasta da API através do terminal e em seguida rode o comando ( npm install ) para baixar todas as dependências utilizadas.

[Imagem]

2 - Com as dependências instaladas abra a pasta da API através do terminal e rode o comando ( nodemon server.js ), para startar o servidor da API.

[imagem]

#### Configurando Aplicação 

1 - Depois que realizou a instalação e configuração da API, abra a pasta da ( app ) através do terminal e em seguida rode o comando ( npm install ) para baixar todas as dependências utilizadas.

[imagem]

2 - Com as dependências instaladas abra a pasta ( app ) através do terminal e rode o comando ( npm run serve ), para startar a aplicação.

[imagem]

## Endpoint API

### GET URL/students/

(Precisa está logado para realizar a listagem)

Esse endpoint é responsavél por listar todos os usuários cadastrado no banco de dados.

#### Parâmetros

Não necessita de parâmetros.

#### Status

##### OK | 200
Caso esse status acontece você irá obter a listagem de todos os Alunos cadastrado

[Imagem]

##### Não Encontrado | 404
Caso esse status acontece significa que não tem nenhum aluno cadastrado

[Imagem]

##### Bad Request | 400

Caso esse status acontece significa falha ao realizar conssulta de alunos

[Imagem]

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

[imagem]

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao tentar cadastrar!


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

[imagem]

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao tentar atualizar o aluno!

##### Bad Request | 404
Caso esse status aconteca não foi encontrado nenhum aluno para realizar a atualização!


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

[imagem]

##### Bad Request | 404
Caso esse status aconteca não foi encontrado nenhum aluno para realizar a exclusão!

[imagem]

##### Bad Request | 400
Caso esse status aconteca ocorreu um erro ao realizar a exclusão!

[imagem]

## Testes
Caso queira realizar algum teste automatizado nas rotas, basta tirar o Middleware das rotas

[imagem]

Para realizar teste automatizado basta abrir o terminal no diretorio raiz da pasta ( API ) e rodar o seguinte comando ( npm run test )

## Tecnologia

Para realizar a criação do sistema, foi utilizadas as seguintes tech (NODE, VUE), com suas seguintes dependências (Express, Nodemon, BodyParser, Sequelize, MYSQL, Jest, cors, Bulma, JWT).
 - Para atualização futuras pode ser utiliza ostras dependências como ( Bcrypt, Knex, Cookie Parser ).
