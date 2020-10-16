import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from "react-native";

import CampoDeTexto from "../elementos/CampoDeTexto";
import CampoDeSenha from "../elementos/CampoDeSenha";
import BotaoGeneralizado from "../elementos/botaoGeneralizado";

import API from "../../assets/js/API";
import Cache from "../../assets/js/ArmazenagemTemporaria";

var navegacao = undefined;

class NovoGrupo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome:'',
      senha:'',
      mensagemDeErro:''
    };

    navegacao = this.props.navigation;
  }

  atualizarCampoDeNomeDoGrupo( nome ) {
    this.setState({nome});
  }

  atualizarCampoDeSenha( senha ) {
    this.setState({senha});
  }

  async login() {
    let nomeDoUsuario = Cache.recuperarRegistro("usuario");
    let resultado = await API.adicionarUsuarioAoGrupo( nomeDoUsuario, this.state.nome, this.state.senha );
    
    if ( resultado == true ) {
      this.setState( { mensagemDeErro:''} );
      const {navigate} = navegacao;
      navigate("Principal"); 
    } else {
      this.setState( { mensagemDeErro:'Senha incorreta para o grupo existente'} );
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={ estilo.scrollView }>
        <View style={ estilo.centralizar }>
          
          <View style={ estilo.centralizar, estilo.quadroDeLogin }>
            <CampoDeTexto placeholder="Nome do grupo" funcao={ this.atualizarCampoDeNomeDoGrupo.bind( this ) } />
            <CampoDeSenha placeholder="Senha" funcao={ this.atualizarCampoDeSenha.bind( this ) } />

            <View style={ estilo.centralizar }>
              <Text>{ this.state.mensagemDeErro }</Text>
            </View>
            <BotaoGeneralizado titulo="Criar/Entrar no grupo" funcao={this.login.bind(this)} />
          </View>

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

export default NovoGrupo;