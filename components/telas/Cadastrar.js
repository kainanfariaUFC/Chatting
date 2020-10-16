import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from "react-native";

import CampoDeTexto from "../elementos/CampoDeTexto";
import CampoDeSenha from "../elementos/CampoDeSenha";
import BotaoGeneralizado from "../elementos/botaoGeneralizado";
import API from "../../assets/js/API";

var navegacao = undefined;

class Cadastrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:'',
      confirmarSenha: '',
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

  atualizarCampoDeConfirmarSenha( confirmarSenha ) {
    this.setState({confirmarSenha});
  }

  irParaTelaDeCadastro() {
    const {navigate} = navegacao;
    navigate("Entrar"); 
  }

  async cadastrar() {
    // verifica se existe ao menos um nome de usuário ou email informado
    if ( this.state.email != '' ) {
      // verifica se a senha e confirmar senha são equivalentes
      if ( this.state.senha == this.state.confirmarSenha ) {
        let usuarioCadastrado = await API.cadastrar( this.state.email, this.state.senha );
        
        // se o usuário tiver sido cadastrado com sucesso, então..
        if ( usuarioCadastrado ) {
          this.setState({mensagemDeErro:'Usuário cadastrado com sucesso!'});
        } else {
          this.setState({mensagemDeErro:'Usuário não disponível.'});
        }
      } else {
        this.setState({mensagemDeErro:'Senhas diferentes.'});
      }
    } else {
      this.setState({mensagemDeErro:'Informe um nome de usuário válido.'});
    }
    
  }

  render() {
    return (
      <ScrollView contentContainerStyle={ estilo.scrollView }>
        <View style={ estilo.centralizar }>
          <Image source={require('../../assets/imagens/usuario.png')} style={{ width:64, height:64, marginBottom: -32, elevation: 5, zIndex: 5, backgroundColor: '#e7ebf0', borderRadius: 100 }} />
          <View style={ estilo.centralizar, estilo.quadroDeLogin }>
            <CampoDeTexto placeholder="Nome de usuário" funcao={ this.atualizarCampoDeEmail.bind( this ) } />
            <CampoDeSenha placeholder="Senha" funcao={ this.atualizarCampoDeSenha.bind( this ) } />
            <CampoDeSenha placeholder="Confirmar senha" funcao={ this.atualizarCampoDeConfirmarSenha.bind( this ) } />

            <View style={ estilo.centralizar }>
              <Text>{ this.state.mensagemDeErro }</Text>
            </View>
            <BotaoGeneralizado titulo="Cadastrar" funcao={this.cadastrar.bind(this)} />
          </View>

          {/** Área de novo cadastro */}
          <TouchableOpacity onPress={ this.irParaTelaDeCadastro }>
            <Text style={ estilo.corBranca } >Acesse sua conta</Text>
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

export default Cadastrar;