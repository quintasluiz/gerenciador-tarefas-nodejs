const AppConstants= require('../enum/AppConstantes');

class HttpController {
    constructor(instanciaExpress) {
        if (!instanciaExpress) {
            throw new Error('A instancia do express e obrigatoria');
        }

        this.express = instanciaExpress;
        this.configurarRotas(AppConstants.BASE_API_URL);
    }

    configurarRotas(baseUrl) {
        throw new Error('Método configurar rotas precisa ser implementado');
    }
}

module.exports = HttpController;