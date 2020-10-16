import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity, FlatList } from "react-native";

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

const Item = ({ title }) => (
  <TouchableOpacity onPress={() => {
    Cache.guardar( title, "grupo" );
    const {navigate} = navegacao;
    navigate("ListarMensagens"); 
  }}>
    <View style={{ backgroundColor: '#fff', padding: 10 }}>
      <View style={{ alignItems: 'center', alignContent: 'center' }}>
        <Text style={{color:'#808080'}}>{title}</Text>
      </View>

      <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, padding: 12, backgroundColor: obterCorAleatoria(), borderRadius: 100, marginTop: -20 }}>  
        <Text>{ title && title[0] ? title[0].toUpperCase() : "group"}</Text> 
      </View> 
    </View>
  </TouchableOpacity>
);

const renderItem = ({ item }) => (
  <Item title={item.title} />
);

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:'',
      mensagemDeErro:'',
      grupos: [] 
    };

    navegacao = this.props.navigation;
    this.carregarGrupos(); 
  }

  async carregarGrupos() {
    let gruposDoUsuario = await API.obterListaDosGruposDoUsuario( Cache.recuperarRegistro("usuario") );
    let grupos = [];

    for ( let grupo of gruposDoUsuario ) {
      //console.log( grupo );
      grupos.push({
        title: grupo
      }); 
    }

    this.setState({grupos});
  }

  novoGrupo() {
    const {navigate} = navegacao;
    navigate("NovoGrupo");
  }

  sair() {
    const {navigate} = navegacao;
    navigate("Entrar"); 
  }

  render() {
    return (
      <>
        {/**Menu superior com as três opções */}
        <View style={{flexDirection:"row", backgroundColor: '#e7ebf0', padding: 20}}>
            <TouchableOpacity style={{flex:1}} onPress={ this.sair }>
                <Text style={{justifyContent: 'flex-start',}}>Sair</Text>
            </TouchableOpacity>
            <View style={{flex:1, alignItems:'center', alignContent:'center', justifyContent:'center'}}>
                <Text>{ Cache.recuperarRegistro("usuario") }</Text>
            </View>
            <TouchableOpacity style={{flex:1, alignItems:'flex-end', alignContent:'flex-end', justifyContent:'flex-end'}} onPress={ this.novoGrupo }>
                <Text style={{justifyContent: 'flex-end',}}>Novo</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor:'#5682a3'}}>

          { console.log(DATA) }
          <FlatList
            data={ this.state.grupos }
            renderItem={renderItem}
          />
        </ScrollView> 
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

export default Principal;