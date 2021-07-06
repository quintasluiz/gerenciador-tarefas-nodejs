const HttpController = require('./HttpController');

class LoginController extends HttpController {
    // sobrescreve o metodo da classe httpController
    configurarRotas(baseUrl) {
        //define a rota e o manipulador d classe login
        //passando o metodo login como referencia e informando que o contexto que
        //o contexto que deve ser usado e da propria objeto da classe logincontroller
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    }

    login(req, res) {
        //atribui o corpo da solicitação para a variavel body
        const body = req.body;
        //valida se foi passado no body os campos de login e senha
        if(!body || !body.login || !body.senha) {
            //retorna um erro para quem chamou a api
            return res.status(400).json({
                status: 400,
                erro: "Parametros de entrada invalidos"
            });
        }
        // devolve a reposta mockada do login em formarto json 
        res.json({
            token: 'token gerado pela api'
        });
    }
}

module.exports = LoginController;