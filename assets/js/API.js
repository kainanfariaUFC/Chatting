import axios from 'axios';

class API {
  static async login( email, senha ) {
    let dados = "email=" + email + "&senha=" + senha;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/login.php?" + dados);
  }

  static async cadastrar( email, senha ) {
    let dados = "email=" + email + "&senha=" + senha;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/cadastrar.php?" + dados);
  }

  static async obterListaDosGruposDoUsuario( usuario ) {
    let dados = "usuario=" + usuario;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/listarGruposDoUsuario.php?" + dados);
  }

  // https://appfiocruz.000webhostapp.com/chat/entrarNoGrupo.php?usuario=marcelo&nome=grupoteste&senha=3213
  static async adicionarUsuarioAoGrupo( usuario, grupo, senha ) {
    let dados = "usuario=" + usuario + "&nome=" + grupo + "&senha=" + senha;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/entrarNoGrupo.php?" + dados);
  }

  // https://appfiocruz.000webhostapp.com/chat/registrarMensagemNoGrupo.php?usuario=marcelo&mensagem=outro%20teste&grupo=grupoteste
  static async enviarMensagemParaOGrupo( usuario, mensagem, grupo ) {
    let dados = "usuario=" + usuario + "&mensagem=" + mensagem + "&grupo=" + grupo;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/registrarMensagemNoGrupo.php?" + dados);
  }

  // https://appfiocruz.000webhostapp.com/chat/obterMensagensDoGrupo.php?grupo=colmeia
  static async listarMensagensDoGrupo( grupo ) {
    let dados = "grupo=" + grupo;
    return await this.realizarBuscaSimples("https://appfiocruz.000webhostapp.com/chat/obterMensagensDoGrupo.php?" + dados);
  }

  static async realizarBuscaSimples( link ) { 
    let resposta = "";
    await axios.get( link ).then((response) => {
      resposta = response.data.resultado; 
    }).catch((e) => { 
      resposta = e;//"Um erro ocorreu no lado do servidor. Tente novamente mais tarde.";
    });
    return resposta;
  }

}

export default API;