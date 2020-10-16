import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from "react-native";

import CampoDeTexto from "../elementos/CampoDeTexto";
import CampoDeSenha from "../elementos/CampoDeSenha";
import BotaoGeneralizado from "../elementos/botaoGeneralizado";

import API from "../../assets/js/API";
import Cache from "../../assets/js/ArmazenagemTemporaria";

var navegacao = undefined;

class Entrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:'',
      mensagemDeErro:''
    };

    navegacao = this.props.navigation;
  }

  atualizarCampoDeEmail( email ) {
    this.setState({email});
  }

  atualizarCampoDeSenha( senha ) {
    this.setState({senha});
  }

  irParaTelaDeCadastro() {
    const {navigate} = navegacao;
    navigate("Cadastrar"); 
  }

  async login() {
    let resultado = await API.login( this.state.email, this.state.senha );
    
    if ( resultado == true ) {
      //console.log("Entrar"); 
      this.setState( { mensagemDeErro:''} );
      //navegacao.setOptions({
      //  usuario: this.state.email
      //});
      Cache.guardar( this.state.email, "usuario" ); 
      const {navigate} = navegacao;
      navigate("Principal"); 
    } else {
      //console.log("negar");
      this.setState( { mensagemDeErro:'Credenciais inválidas.'} );
    }
  }

  render() {
    return (
      <ScrollView  contentContainerStyle={ estilo.scrollView }>
        <View style={ estilo.centralizar }>
          <Image source={require('../../assets/imagens/usuario.png')} style={{ width:64, height:64, marginBottom: -32, elevation: 5, zIndex: 5, backgroundColor: '#e7ebf0', borderRadius: 100 }} />
          <View style={ estilo.centralizar, estilo.quadroDeLogin }>
            <CampoDeTexto placeholder="Nome de usuário" funcao={ this.atualizarCampoDeEmail.bind( this ) } />
            <CampoDeSenha placeholder="Senha" funcao={ this.atualizarCampoDeSenha.bind( this ) } />

            <View style={ estilo.centralizar }>
              <Text>{ this.state.mensagemDeErro }</Text>
            </View>
            <BotaoGeneralizado titulo="Entrar" funcao={this.login.bind(this)} />
          </View>

          {/** Área de novo cadastro */}
          <TouchableOpacity onPress={ this.irParaTelaDeCadastro }>
            <Text style={ estilo.corBranca } >Cadastre-se</Text>
          </TouchableOpacity> 
        </View>
        
        
      </ScrollView> 
    );
  }
} 

const estilo = {
  centralizar: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  corBranca: {
    color: '#FFF'
  },
  quadroDeLogin: {
    backgroundColor: '#e7ebf0',
    borderRadius: 5,
    padding: 10,
    paddingTop: 28,
    margin: 5
  },
  scrollView: {
    backgroundColor:'#5682a3', 
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1,
  }
}; 

export default Entrar;