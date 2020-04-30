# Curso Introdução ao Node.js com Express

- Autor: Henrique Schreiner
- Origem: Digital Innovation One

## Módulo I - Introdução ao Node.js com Express

### Aula I - Aprenda sobre os conceitos de Node.js e crie um ambiente

#### Conceitos

- V8 + libuv = Node.js
- OpenSource
- Executado em várias plataformas (Windows, Linux, Unix, Mac OS X...)
- Javascript no servidor
- Event Loop (Loop de Eventos, Single thread)
- Assincronicidade
- Processo de I/O não bloqueante
- Alta performance (quando bem estruturada)

#### Criação do ambiente

- [Download do Node.js](https://nodejs.org/pt-br/download/)
- [Instalando Node.js via gerenciador pacotes](https://nodejs.org/pt-br/download/package-manager/)

```javascript
// index.js
console.log('Hello world');

node index.js
```

### Aula II - Criando uma API em Express

#### O que é o Express

- Framework web minimalista e rápido para Node.js
- Fornece uma estrutura e conjuto de recursos robustos para aplicações web e mobile
- Dispõe de métodos utilitários HTTP e middlewares para criar uma API rápida e segura

#### Instalação do Express

```javascript
// inicializando um projeto node
npm init -y
// instalando do express
npm install express --save
```

### Criando a API

- Para executar a API: node index.js
- Acessar no  browser localhost:3000

```javascript
//index.js
//hello world

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello world pelo Express!'))

app.listen(port, () => console.log('API executando na porta 3000'))
```

```javascript
//index.js
//API node com express salvando dados no arquivo users.json

const express = require('express')
const bodyParser = require('body-parser') // middleware transforma o corpo do HTTP em objeto

const userRoute = require('./routes/userRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false })) // middleware

userRoute(app)

app.get('/', (req, res) => res.send('Hello world pelo Express!'))

app.listen(port, () => console.log('API executando na porta 3000'))
```

```javascript
//userRoutes.js

const fs = require('fs') // manipula diretorios
const { join } = require('path') // manipula caminhos de diretorios

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
  const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

  try {
    return JSON.parse(data)
  } catch(error) {
    return []
  }
}

const saveUser = (users) => { fs.writeFileSync(filePath, JSON.stringify(users, null, '\t')) }

const userRoute = (app) => {
  app.route('/users/:id?')
    .get((req, res) => {
      const users = getUsers()
      res.send({ users })
    })
    .post((req, res) => {
      const users = getUsers()

      users.push(req.body)
      saveUser(users)

      res.status(201).send('OK')
    })
    .put((req, res) => {
      const users = getUsers()

      saveUser(users.map(user => {
        if (user.id === req.params.id) {
          return {
            ...user,
            ...req.body
          }
        }

        return user
      }))

      res.status(200).send('OK')
    })
    .delete((req, res) => {
      const users = getUsers()

      saveUser(users.filter(user => user.id !== req.params.id))

      res.status(200).send('OK')
    })
}

module.exports = userRoute
```

### Exercícios - Módulo I

Quais destas afirmações estão corretas em relação ao Node.js?

I - Usa a JVM do Java.

II - É JavaScript no servidor.

III - Pode ser executado em várias plataformas como Linux, Windows e Mac OS.

- As alternativas II e III estão corretas.

Qual é o comando para iniciar um novo projeto em Node.js usando o NPM?

- npm init

O que é o NPM?

- Gerenciador de pacotes e dependências de um projeto em Node.js.

A assincronicidade no Node.js se dá ao fato de que:

- Não é necessário esperar finalizar uma tarefa para iniciar outra.

Qual é o nome da pasta padrão gerada pelo NPM para armazenar o código fonte das dependências instaladas no projeto?

- node_modules

Quais são os principais métodos HTTP suportados pelo Express?

- GET, POST, PUT e DELETE.

São características do Event Loop:

I - Registro de callbacks.

II - Execução de tarefas síncronas de maneira assíncrona usando a libuv.

III - Usa o V8 do Chrome para executar tarefas bloqueantes.

- I e II estão corretas.

O que é o Express?

- Framework web minimalista e rápido para Node.js.

Em qual arquivo são registradas as informações e dependências de um projeto em Node.js?

- package.json

Qual linguagem de programação é usada para desenvolver aplicações em Node.js?

- JavaScript.

## Módulo II - Desenvolvendo ferramentas de linha de comando

### Aula I - Criando uma ferramenta com CLI

### Aula II - Aprenda a trabalhar com Commander.js

## Módulo III - Criação de templates com Pug

### Aula I - Como usar Pug em projetos

### Aula II - Integrando Pug com Express
