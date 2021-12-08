# GoStack10.0 || Desafio-02

* [1. Conceitos abordados](#1-conceitos-abordados)
* [2. Iniciando o projeto](#2-iniciando-o-projeto)
* [3. Color pallette](#3-color-pallette)
* [4. Criando o projeto](#4-criando-o-projeto)

##  1. Conceitos abordados:

1. Migration a DB SQL.</br>
2. Criação de Models.</br>
3. Criação de Controllers (POST / PUT / GET / DELETE).</br>
3. Gerando Hash de senha.</br>
4. Autenticação/Middleware de sessão JWT.</br>
5. Validação de dados de cadastro via schema YUP.</br>


##  2. Iniciando o projeto

1.  docker start database5
2.  yarn dev
3.  Iniciar Insomnia
4.  Iniciar Postbird (Port: 5436)


 ##  3. Color pallette

<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<p>Esse desafio faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack, por isso é fundamental que ele seja feito com muito empenho!</p>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.

Nesse primeiro desafio vamos criar algumas funcionalidades básicas que aprendemos ao longo das aulas até aqui. Esse projeto será desenvolvido aos poucos até o fim da sua jornada onde você terá uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**, então, bora pro código!

### **Um pouco sobre as ferramentas**

Você deverá criar a aplicação do zero utilizando o [Express](https://expressjs.com/), além de precisar configurar as seguintes ferramentas:

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (Utilize PostgreSQL ou MySQL);

### **Funcionalidades**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação.

### **1. Autenticação**

Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.

Crie um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criarmos registros na base de dados de forma automatizada.

Para criar um seed utilize o comando:

    yarn sequelize seed:generate --name admin-user

No arquivo gerado na pasta `src/database/seeds` adicione o código referente à criação de um usuário administrador:

    const bcrypt = require("bcryptjs");

    module.exports = {
      up: QueryInterface => {
        return QueryInterface.bulkInsert(
          "users",
          [
            {
              name: "Distribuidora FastFeet",
              email: "admin@fastfeet.com",
              password_hash: bcrypt.hashSync("123456", 8),
              created_at: new Date(),
              updated_at: new Date()
            }
          ],
          {}
        );
      },

      down: () => {}
    };

Agora execute:

    yarn sequelize db:seed:all

Agora você tem um usuário na sua base de dados, utilize esse usuário para todos os logins que você fizer.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

### 2. Gestão de destinatários

Você agora precisa permitir que destinatários sejam mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o **nome** do destinatário e campos de endereço: **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**.

Utilize uma nova tabela no banco de dados chamada `recipients` para guardar informações do destinatário.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

## 📅 Entrega

Esse desafio **não precisa ser entregue** e não receberá correção. Além disso, o código fonte **não está disponível** por fazer parte do **desafio final**, que será corrigido para **certificação** do bootcamp. Após concluir o desafio, adicionar esse código ao seu Github é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Rocketseat :wave: [Entre na nossa comunidade!](https://discordapp.com/invite/gCRAFhc)


##  4. Criando o projeto

1. Iniciando o projeto.
   1. Criar src/app.js
   2. Configurar express server e adicionar atualização automática:
      ```
      yarn add express
      yarn add nodemon -D
      ```
   3. Criar server.js e routes.js

2. Nodemon & Sucrase
   1. Para utilizar a nova sintaxe do JS dentro do NodeJS:
   2. Atualizar package.json, launch.json</br>
   3. Criar nodemon.json</br>
      ```
      yarn add sucrase -D
      ```

3. Conceitos do Docker
   1. Instalar Docker para a criação de containers (para DB, notifications e envio de e-mails).
      1. https://docs.docker.com/install/
   2. Criar um serviço do docker em Postgres
      1. https://hub.docker.com/_/postgres
      2. Terminal:
         ```
         docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5433:5432 -d postgres
         ```
      3. Containers em execução: docker ps
      4. Todos os Containers:    docker ps -a
   3. Download Postbird: https://electronjs.org/apps/postbird
      1. Create Database: Fastfeet

4. Sequelize & MVC
   1. Sequelize: ORM NodeJS para DB's relacionais (MySQL, Postgres, SQLite).
      1. Tabelas viram models.
      2. Migrations: Cada arquivo contém instruções para criação, alteração ou remoção de tabelas ou colunas.
      3. Seeds: População de DB para **desenvolvimento**.

5. ESLint, Prettier & EditorConfig
   1. ESLint: "linting" do código (uso do padrão AirBNB).
      ```
      yarn add eslint -D
      yarn eslint --init
      ```
      1. Delete package-lock.json, yarn.
      2. Instalar extensão eslint no VSCode, alterar settings.json, .eslintrc.js.
   2. Prettier: Formatação de código.
      ```
      yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
      ```
      1. alterar .eslintrc.js, criar .prettierrc e EditorConfig.

6. Configurando Sequelize
   1. Criar src/config/database.js, src/database/migrations, app/controllers, app/models.
      ```
      yarn add sequelize
      yarn add sequelize-cli -D
      yarn add pg pg-hstore
      ```
   2. Criar .sequelizerc e alterar database.js

7. Migration
   1. Criar tabelas, migrate, undo, undo all
      ```
      yarn sequelize migration:create --name=create-users
      yarn sequelize db:migrate
      yarn sequelize db:migrate:undo
      yarn sequelize db:migrate:undo:all
      ```
   2. Criar Seeds:
      ```
      yarn sequelize seed:generate --name admin-user
      yarn sequelize db:seed:all
      ```

8. Models

9. Loader de models
   1. Criar database/index.js, alterar app.js, routes.js

10. Cadastro de usuários
    1. Criar controllers/UserController.js, alterar routes.js
    2. Insomnia: Criar Workspace: Fastfeet, pasta: Users, Request: POST

11. Gerando Hash de senha
    1. Gerar Hash e criptografar a senha
       ```
       yarn add bcryptjs
       ```
    2. Alterar models/User.js

12. Autenticação JWT
    1. Criar SessionController.js
    2. Instalar o gerador de token JWT.
       ```
       yarn add jsonwebtoken
       ```
    3. Criar o método checkPassword() no model User.js
    4. Gerar Hash aleatório: https://www.md5online.org/
    5. Criar config/auth.js, alterar User.js, SessionController.js, Routes.js

13. Middleware de autenticação
    1. Bloquear User ao acessar algum tipo de rota se ele ainda não estiver logado.
    2. Criar método update no UserController.js.
    3. Criar app/middlewares/auth.js.
    4. Criar middleware global em routes.js

14. Update de usuário

15. Validando dados de entrada
    1. Biblioteca yup: schema validation - forma simples de definir os campos presentes no campo da req e passa através de funções o tipo daquele campo. Ex: é uma string, obrigatório, no mínimo 6 letras.
    2. Add Yup
       ```
       yarn add yup
       ```
    3. UserController.js
       1. Criar métodos Store e Update.
    4. SessionController.js
       1. Criar método Store.

