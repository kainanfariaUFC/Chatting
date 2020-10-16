class ArmazenagemTemporaria {
  
  static guardar( informacao, rotulo ) {
    let novosRegistro = {
      informacao: informacao,
      rotulo: rotulo
    };

    // define o cache caso ele nao exista
    if ( typeof this.guardar.cache == "undefined" )
      this.guardar.cache = [];
    else
      this.destruirRegistro( rotulo );

    // adiciona a atualizacao do registro
    this.guardar.cache.push(novosRegistro);
  }

  static destruirRegistro( rotulo ) {
    // apaga o registro anterior
    let indiceRotulo = this.recuperarIndice( rotulo );
    if ( indiceRotulo != -1 )
      this.guardar.cache.splice( indiceRotulo, 1 );
  }

  // recupera a ultima informacao salva
  static recuperarIndice( rotulo ) {
    if ( typeof this.guardar.cache == "undefined" )
      return -1;
    else {
      let itemResposta = -1;
      this.guardar.cache.map( (item, indice) => {
        if ( item.rotulo == rotulo )
          itemResposta = indice;
      } );

      return itemResposta; 
    }
  } 

  static recuperarRegistro( rotulo ) {
    if ( typeof this.guardar.cache == "undefined" )
      return null;
    else {
      let itemResposta = "";

      this.guardar.cache.map( (item, indice) => {
        if ( item.rotulo == rotulo ) {
          itemResposta = item.informacao;
        }
      } );

      return itemResposta;
    }
  }

  static destruirTodosOsRegistros() {
    if ( typeof this.guardar.cache == "undefined" )
      this.guardar.cache = [];

    this.guardar.cache = [];
  }
}

export default ArmazenagemTemporaria;