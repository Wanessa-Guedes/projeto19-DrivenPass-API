<h1 align=center> API DOCUMENTATION </h1>

<p align="center">
  <a href="https://github.com/Wanessa-Guedes/projeto19-DrivenPass-API.git">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f512.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Projeto19 DrivenPass
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/Wanessa-Guedes/projeto19-DrivenPass-API.git

$ cd $nome-repositorio

$ npm install

$ npm run dev
```

API:

```
- ROTAS AUTENTICAÇÃO

- POST / signup
    - Rota para criar um usuário (Senha min 10 caracteres)
    - headers: {}
    - body: {"email": "email@email.com",
             "password": "password123"}
    
- POST /signin
    - Rota para logar (token de autenticação é recebido no corpo da resposta)
    - headers: {}
    - body: {"email": "email@email.com",
             "password": "password123"}
 
 - PATCH /logout (autenticada)
   - Rota para deslogar da aplicação (Sessão é "desligada", nesse momento token é invalidado, necessário logar novamente)
   - headers: {"Authorization": "Bearer token"}
   - body: {}
             
 - ROTAS CREDENTIALS
    
- POST /credentials (autenticada)
    - Rota para usuário inserir uma credencial
    - headers: {"Authorization": "Bearer token"}
    - body: {"url": "https://www.teste.com",
             "user_name": "testee",
             "password":"teste",
             "title":"Credencial do teste"}
    
- GET /credentials (autenticada)
    - Rota para listar todas as credenciais cadastradas pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /credentials/:id (autenticada)
    - Rota para listar uma credential específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- DELETE /credentials/:id (autenticada)
    - Rota para deletar uma credential específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
  - ROTAS DE SAFE NOTES
  
  - POST /notes (autenticada)
    - Rota para usuário inserir uma nota segura ("title": max 50 caracteres e "annotation": max 1000 caracteres)
    - headers: {"Authorization": "Bearer token"}
    - body: {"title":"Teste sucesso",
             "annotation":"Testee"}
    
- GET /notes (autenticada)
    - Rota para listar todas as notas seguras cadastradas pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /notes/:id (autenticada)
    - Rota para listar uma nota segura específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- DELETE /notes/:id (autenticada)
    - Rota para deletar uma nota segura específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}

- ROTA CARDS

- POST /cards (autenticada)
    - Rota para usuário inserir informações sobre cartão ("type": débito | crédito | ambos)
    - headers: {"Authorization": "Bearer token"}
    - body: {"title": "Cartão Master" ,
             "name": "Teste Silveira",
             "number": "1010100100100100",
             "securityCode": "123",
             "expirationDate": "02/30",
             "password": "12345",
             "is_virtual": false,
             "type": "débito" }
    
- GET /cards (autenticada)
    - Rota para listar todas os cartões cadastrados pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /cards/:id (autenticada)
    - Rota para listar um cartão específico cadastrado pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- DELETE /cards/:id (autenticada)
    - Rota para deletar um cartão específico cadastrado pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- ROTAS WIFI

- POST /wifi (autenticada)
    - Rota para usuário inserir informações sobre wifi
    - headers: {"Authorization": "Bearer token"}
    - body: {"title": "Wifi da empresa",
             "name": "Net",
             "password": "12345" }
    
- GET /wifi (autenticada)
    - Rota para listar todas as informações sobre wifi cadastradas pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- GET /wifi/:id (autenticada)
    - Rota para listar uma informação sobre wifi específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
- DELETE /wifi/:id (autenticada)
    - Rota para deletar uma informação sobre wifi específica cadastrada pelo usuário
    - headers: {"Authorization": "Bearer token"}
    - body: {}
    
```
