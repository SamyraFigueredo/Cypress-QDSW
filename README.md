# Guia para: Instalação, Configuração e Uso do Cypress (E2E)

Este documento apresenta todos os passos necessários para instalar, configurar e utilizar o **Cypress** para testes End-to-End (E2E).  
Aplicação usada como exemplo: **Swagger Petstore**.

---

## Links Importantes

- **Documentação do Cypress**  
  https://docs.cypress.io/app/get-started/why-cypress 

- **Aplicação para testes (Swagger Petstore):**  
  https://petstore.swagger.io/
- **Slide sobre Cypress: o que é,para que serve,sua importância, como usar, boas práticas, etc.:**
  https://docs.google.com/presentation/d/1JsNVrq_aYId2fPPdaBne2gzuzyyT4bgN-OefBULOsnI/edit?usp=sharing
---

# 1) Pré-requisitos

Antes de iniciar o projeto, é necessário ter instalado:

### Node.js (versão LTS 22 ou superior)
Baixe em: https://nodejs.org/en/download

### Git (opcional)
Útil para versionamento e clonagem de repositórios.

### Navegador recomendado
- **Google Chrome**  
- **Microsoft Edge**

> Obs.: O Cypress utiliza Electron por padrão, mas permite rodar os testes em outros navegadores.

---

# 2) Criar o Projeto e Inicializar npm

No terminal:

```bash
mkdir cypress-seuprojeto
cd cypress-seuprojeto
npm init -y
```
> Isso criará o arquivo package.json.

# 3) Instalação do Cypress

```bash
npm install cypress --save-dev
```

# 4) Corrigir Vulnerabilidades (OPCIONAL)

> Após a instalação, o NPM pode identificar vulnerabilidades nas dependências. Para corrigir automaticamente aquelas que não quebram versões:

```bash
npm audit fix
```
> OBS.: Use apenas se o npm indicar vulnerabilidades.

# 5) Scripts Úteis no package.json

Adicione dentro de "scripts":
```json
{
  "scripts": {
    "cypress:open": "npx cypress open",
    "cypress:run": "npx cypress run",
    "test": "npm run cypress:open"
  }
}
```
> Funções dos scripts:

>**cypress:open - abre o Test Runner (interface gráfica)**

>**cypress:run - executa testes em modo headless**

>**test - atalho para abrir o Cypress**

# 6) Inicializar o Cypress pela Primeira Vez

> Para abrir o Cypress:
```bash
npx cypress open
```
> Para rodar sem interface(no terminal):
```bash
npx cypress run
```

# 7) Selecionar o Tipo de Teste Dentro do Cypress

Ao abrir pela primeira vez, você verá duas opções:

### E2E Testing (Recomendado)

Use este modo para testar fluxos completos, simulando um usuário real: rotas, formulários, telas, autenticação e integração entre frontend + backend;

### Component Testing

Use este modo apenas se estiver trabalhando com frameworks como: React, Vue, Angular, etc;
E quiser testar componentes isolados (botões, modais, cards).

# 8) Estrutura Criada Automaticamente

Ao iniciar o projeto, o Cypress cria automaticamente funções dos arquivos:

  **cypress.config.js → Configurações gerais**

  **fixtures/example.json → Dados simulados**

  **support/e2e.js → Executado antes de cada teste**

  **support/commands.js → Criar comandos customizados**

  **e2e/ → Onde ficam seus testes**

## 9) Criar Seu Primeiro Teste

No Cypress, escolha:

> Create new spec

E defina:

> Nome do arquivo: seu_primeiro_teste.cy.js

> Local: cypress/e2e/

Agora você está pronto para começar a escrever seus testes!
