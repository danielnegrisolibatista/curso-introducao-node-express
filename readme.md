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
// instalando o express
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

#### O que é uma CLI

- Ferramenta que disponibiliza uma interface de linha de comando para executar tarefas no terminal
- Normalmente são criadas através de *Shell Script*
- Automatiza uma tarefa atavrés de uma aruqivo executável
- Pode ser facilmente distruído em várias plataformas

#### GUI x CLI

Copiando um arquivo:

##### GUI

- Abrir o gerenciado de arquivos;
- Navegar entre os diretórios até achar o desejado
- Selecionar todos os arquivos que terminam com *.js*
- Copiar os arquivos
- Trocar de diretório no gerenciado de arquivos
- Colar os arquivos

##### CLI

```javascript
- cp *.js ~/Documentos/PastaDestino
```

#### Por que criar uma CLI em Node.js

- A popularidade do Node.js se dá ao rico ecossistema de pacteos
- Mais de 900.000 pacores registrados no NPM
- CLIs podem ser facilmente distribuídas e consumidas em múltiplas plataformas
- Explorar o ecossitema, incluido sua grande quantidade de pacotes focados em CLI

#### CLIs em Node.js

- npm
- yarn
- babel
- grunt
- gulp
- webpack

#### Atividade prática CLIs em Node.js

- Criar uma CLI simples para procurar arquivos em um diretório
- Instalar local para desenvolvimento e testes
- Passo a passo para publicar a CLI no NPM

```javascript
// Criar uma CLI simples para procurar arquivos em um diretório

// search-files-cli
// criar um projeto node
// npm init -y

// criar o arquivo bin/search-files-cli

#!/usr/bin/env node
const fs = require('fs')
const { join } = require('path')

const fileName = process.argv.splice(2, process.argv.length -1).join()

function searchFiles(filter, startPath = '.') {
  const files = fs.readdirSync(startPath)

  files.map(filePath => {
    const fullFilePath = join(startPath, filePath);
    const startFilePath = fs.lstatSync(fullFilePath);

    if (startFilePath.isDirectory()) {
      return searchFiles(filter, fullFilePath)
    }

    if (fullFilePath.indexOf(filter) !== -1) {
      console.log(fullFilePath)
    }
  })
}

searchFiles(fileName)


// ajustar o package.json
{
  "name": "search-files-cli",
  "version": "1.0.0",
  "description": "Exemplo de CLI para procurar arquivos em uma pasta",
  "preferGlobal": true,
  "bin": {
    "search-files": "./bin/search-files-cli"
  },
  "files": [
    "./bin"
  ],
  "keywords": [],
  "author": "Daniel Negrisoli Batista",
  "license": "MIT"
}

// Instalar local para desenvolvimento e testes
// cria um link simbolico para que não precise ficar instalação a aplicação a cada modificação
npm link

// executar o comando para testar: search-files .json
```

Passo a passo para publicar a CLI no NPM

- Cria uma conta no npm
- Realizar login no npm localmente
- Executa npm publish para enviar o pacote

### Aula II - Aprenda a trabalhar com Commander.js

#### O que é Commander.js

- Ferramenta completa para criação de CLIs em Node.js
- Definição de comandos, parâmetros de opções e execução de ações
- Descrição para cada comando e menu de ajuda com exemplos de uso

#### Atividade prática com Commander.js

- Criar uma CLI usando o Commander.js
- Criar uma ferramenta que mostra o clima atual de uma cidade pelo nome
- Usar a API do ClimaTempo
  - Criar uma conta no ClimaTempo e gerar um token de acesso
- Cópiar/Clonar o repositório original [node-clima-cli](https://github.com/hmschreiner/node-clima-cli)

```javascript
// Instalar local para desenvolvimento e testes
// cria um link simbolico para que não precise ficar instalação a aplicação a cada modificação
npm link

// adiciona o token a aplicação
clima.cmd porto alegre --token <token>  

// executar o comando para testar: clima.cmd porto alegre
```

### Exercícios - Módulo II

Qual é o comando usado para publicar sua CLI no NPM?

- npm publish

Qual o comando NPM para instalar a CLI localmente para testes?

- npm link

No arquivo package.json, em qual campo é informado o nome do comando que será usado pela CLI?

- bin

Em relação ao Commander.js:

I - É executado no cliente.

II - Ajuda no desenvolvimento de CLIs.

III - Permite adicionar uma descrição para cada comando disponível.

- II e III estão corretas.

Qual opção é usada para adicionar um comando no Commander.js?

- .command(‘...’)

O que é uma CLI?

- Interface de linha de comando para executar tarefas no terminal.

Como adicionar parâmetros em um comando no terminal?

- comando --nome-parametro valor

Em relação às CLIs:

I - Podem ser distribuídas facilmente.

II - Só funcionam em ambientes Unix.

III - Podem ser instaladas globalmente no sistema operacional.

- I e III estão corretas.

Grunt, Gulp e Webpack são exemplos de:

- CLIs em Node.

## Módulo III - Criação de templates com Pug

### Aula I - Como usar Pug em projetos

#### O que é o Pug

- É uma *template engine* de alta performance
- Implementado em Javascript para Node.js e Browsers
- Conhecido anteriormente como "Jade"
- Pode ser integrado com Express
- [Documentação do Pug](https://pugjs.org/api/getting-started.html)

#### Prós de uso do Pug

- Escrever mais HTML com menos código
- Código parecido com parâgrafos, o que dá legibilidade do código e simplifica projetos com vários desenvolvedores
- Não há fechamento de tags, é usado identação para identificar aninhamento de tags
- É possível escrever Javscript dentro dos templates

#### Contras de uso do Pug

- Espaços em branco importam, um mínimo erro de identação pode trazer grandes problemas para seu código
- Não é possível usar código HTML de qualquer lugar, é preciso converter para o Pug antes de usar

#### Atividade prática - Como usar Pug em projetos

- Clonar/baixar os arquivos do [repositório original](https://github.com/hmschreiner/pug-template)
- Executar `npm install` para baixar as dependências
- Executar `npm run build` para criar os arquivos html

### Aula II - Integrando Pug com Express

- Uma *template engine* possibilita o uso de aruqivos de template estátio na sua aplicação
- Em tempo de execução, variáveis dentro desse tempalte pode ser substituídas por valores reais
- Transforma o template em HTML e manda para o *client*
- Facilita o desenvolvimento de página HTML dinâmicas usando conteúdo estátio

#### Atividade prática - Integrando Pug com Express

- Clonar/baixar os arquivos do [repositório original](https://github.com/hmschreiner/pug-express)
- Executar `npm install` para baixar as dependências
- Executar `npm start` para rodar a aplicação

#### Exercícios - Módulo III - Criação de templates com Pug

Qual trecho de código é usado para informar a pasta dos templates do Pug ao Express?

- app.set('views', './templates')

Anteriormente o Pug era conhecido como:

- Jade.

A integração do Pug com o Express permite que:

- Substituir, em tempo de execução, variáveis dentro dos templates por valores reais.

O que é o Pug?

- É uma template engine de alta performance implementado com JavaScript

Fazendo a integração com o Pug, o Express é capaz de?

- Transformar o template Pug em HTML e mandar para o client.

Qual o resultado do seguinte comando usando a CLI do Pug:

`pug templates/*.pug --pretty --out ./build`

- Transforma todos os arquivos da pasta “templates” com a extensão .pug em HTML e salva os arquivos HTML na pasta “build” com indentação.

Qual função é usada em uma rota no Express para renderizar um template Pug?

- res.render()

Leia as sentenças e assinale a alternativa correta sobre algumas das vantagens em relação ao uso do Pug.

I - Não é necessário o fechamento das tags.

II - É possível mesclar código HTML com Pug.

III - Usar JavaScript dentro de um template Pug.

- I e III estão corretas.

Veja as sentenças abaixo e assinale a alternativa correta. São desvantagens em relação ao uso do Pug:

I - Escrever menos HTML com mais código.

II - Não é possível usar código HTML em um template Pug.

III - Sua performance é baixa, o que torna a aplicação mais lenta.

- Apenas II está correta.

O seguinte código Pug irá gerar qual saída em HTML:

`h1.header.title Minha Página`

- `<h1 class=”header title”>Minha Página</h1>`
