const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger.json");
const LoginController = require('./controllers/LoginController');
const AppConstantes = require('./enum/AppConstantes');

class App {
    #controllers;

    iniciar() {
        // configurar o express
        this.#configurarExpress();
        //carregar os controlers
        this.#carregarControllers();
        //iniciar o servidor 
        this.#iniciarServidor();
    }

    #configurarExpress = () => {
        //cria a instancia do express para gerenciar servidor
        this.express = express();

        //registra os middlewares para fazer a conversao das requisiçoes da api
        this.express.use(express.urlencoded({extended: true}));
        this.express.use(express.json());

        //configura o swagger da aplicaçao para servir a documentaçao
        this.express.use(
            `${AppConstantes.BASE_API_URL}/docs`, 
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)

        );
        //registra o middleware para fazer log das requisiçoes
        this.express.use((req, res, next)=>{
            console.log(`requisição recebida, url =${req.url},metodo http=${req.method}`);
            next();
        });
    }

    #carregarControllers = () => {
        // atribui para propriedade #controllers a lista de controllers disponiveis da aplicaçao
        this.#controllers = [
            new LoginController(this.express)
        ];
    }

    #iniciarServidor = () => {
        // tenta pegar a porta a partir da variavel de ambiente EXPRESS PORT
        // se não tiver definida vai usar a porta padrao 3001
       const port = process.env.EXPRESS_PORT || 3001;
       this.express.listen(port, () => {
           console.log(`Aplicação executando na porta ${port}`);
       });
    }
}

module.exports = App;