# Nome do Projeto

Descrição curta do projeto.

## Ambientes

Este projeto possui três tipos de ambiente:

### Review

Todo Pull Request aberto ganha uma nova URL que dura 1 dia para revisão.

### Staging

Ambiente de stage para testes.

### Prod

Ambiente de produção.

## Tecnologias Utilizadas

- bcryptjs: ^2.4.3
- dotenv: ^16.4.5
- express: ^4.17.1
- express-graphql: ^0.12.0
- graphql: ^15.3.0
- jsonwebtoken: ^9.0.2
- mongodb: ^6.7.0

## Rotas

### GraphQL Endpoint

```
{{BASE_URL}}/graphql
```

#### SignIn

Autenticação de usuário.

```graphql
mutation {
  signIn(email: "darlysson@ne.team", password: "password123") {
    _id
    email
    token
  }
}
```

#### SignUp

Registro de novo usuário.

```graphql
mutation {
  signUp(email: "darlysson@ne.team", password: "password123")
}
```

## Como Replicar o Projeto

Siga os passos abaixo para replicar o projeto localmente.

1. Faça um fork deste repositório.
2. Configure as variáveis de ambiente:
   - HEROKU_API_KEY
   - HEROKU_APP_NAME_STAGING
   - HEROKU_APP_NAME_PRODUCTION

3. Clone o repositório forkado:

   ```bash
   git clone <URL_do_seu_fork>
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Construa e inicie a aplicação com Docker Compose:

   ```bash
   docker-compose build
   docker-compose up
   ```

---