import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity, FlatList, TextInput } from "react-native";

import CampoDeTexto from "../elementos/CampoDeTexto";
import CampoDeSenha from "../elementos/CampoDeSenha";
import BotaoGeneralizado from "../elementos/botaoGeneralizado";

import API from "../../assets/js/API";
import Cache from "../../assets/js/ArmazenagemTemporaria";

var navegacao = undefined;

var DATA = [];

let obterCorAleatoria = () => {
  let cores = ['#fa7f72', '#20b2aa', '#ff7f50', '#f08080', '#bc8f8f'];

  let posicaoAleatoria = Math.floor(Math.random() * ( cores.length - 1 ) );
  return cores[ posicaoAleatoria ];
}

let estiloDaMensagem = (usuario) => {
  let orientacao = "flex-end";
  let color = usuario == Cache.recuperarRegistro("usuario") ? '#fff' : '#f0f8ff'
  return {
    alignItems: orientacao, alignContent: orientacao,
    backgroundColor: color,
    margin: 3,
    padding: 5,
    borderRadius: 3,
    borderBottomWidth: 6,
    borderBottomColor: '#fff',
    borderLeftWidth: ( usuario == Cache.recuperarRegistro("usuario") ) ? 0 : 6, 
    borderLeftColor: '#5682a3',
    borderRightWidth: ( usuario == Cache.recuperarRegistro("usuario") ) ? 6 : 0,
    borderRightColor: '#5682a3'
  }
}

const Item = ({ title }) => (
  <View style={ estiloDaMensagem( title[1] ) }>
    <Text style={{color:'#808080'}}>{title[2]}</Text> 
    <Text style={{color:'#dedede', fontSize: 12, borderTopWidth: 1, borderTopColor: '#dedede', marginTop: 8}}> {title[1]} </Text>
  </View>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

class ListarMensagens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mensagem:'',
      mensagensDoGrupo: [],
      renderMensagens: false,
    };

    navegacao = this.props.navigation;
    this.carregarMensagens(); 
  }

  componentDidUpdate(){
    if(this.state.renderMensagens){
      this.carregarMensagens(); 
    }
   
  }

  atualizarMensagem( mensagem ) {
    this.setState({mensagem});
  } 

  async enviarMensagem() {
    console.log( this.state.mensagem );
    let resultado = await API.enviarMensagemParaOGrupo(
      Cache.recuperarRegistro("usuario"),
      this.state.mensagem,
      Cache.recuperarRegistro("grupo")
    );

    // atualiza a lista de mensagens
    Cache.guardar("ListarMensagens", "telaDeSuporte");
    const {navigate} = navegacao;
    navigate("Atualizacao"); 
  } 

  async carregarMensagens() {
    let mensagensDoGrupoNoServidor = await API.listarMensagensDoGrupo( Cache.recuperarRegistro("grupo") );
    let mensagensDoGrupo = [];
    
    if(mensagensDoGrupoNoServidor.length > 0 ){
      for ( let mensagem of mensagensDoGrupoNoServidor ) {
        mensagensDoGrupo.push({
          title: mensagem
        }); 
      }
    }

    this.setState({mensagensDoGrupo});
  }

  voltarParaTelaPrincipal() {
    const {navigate} = navegacao;
    navigate("Principal");
  }

  render() {
    if(this.state.renderMensagens === false){
      this.setState({renderMensagens: true})
    }
    return (
      <>
        {/**Menu superior com as três opções */}
        <View style={{flexDirection:"row", backgroundColor: '#e7ebf0', padding: 20}}>
            <TouchableOpacity style={{flex:1}} onPress={ this.voltarParaTelaPrincipal }>
                <Text style={{justifyContent: 'flex-start',}}>Voltar</Text>
            </TouchableOpacity>
            <View style={{flex:1, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                <Text>{ Cache.recuperarRegistro("grupo") }</Text>
            </View>
            <TouchableOpacity style={{flex:1, alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end'}} onPress={ this.novoGrupo }>
                <Text style={{justifyContent: 'flex-end',}}></Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor:'#5682a3'}}>

          { console.log(DATA) }
          <FlatList
            data={ this.state.mensagensDoGrupo }
            renderItem={renderItem}
          />
        </ScrollView> 

        {/** Barra de mensagem */}
        <View style={{flexDirection:"row"}}>
          <View style={{flex:1}}>
            <TextInput placeholder="Mensagem..." autoCapitalize={'none'} style={{padding:3, color:'#5D82E7', backgroundColor:'#eee'}} onChangeText={(mensagem) => { this.atualizarMensagem( mensagem ) }}/> 
          </View> 
          <TouchableOpacity onPress={ this.enviarMensagem.bind( this ) }>
            <Text style={{padding: 5}}>Enviar</Text> 
          </TouchableOpacity>
        </View>
      </>
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
  }
}; 

export default ListarMensagens;