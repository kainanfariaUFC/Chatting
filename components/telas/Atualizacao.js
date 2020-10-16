import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import Cache from "../../assets/js/ArmazenagemTemporaria";

var navegacao = undefined;

class Atualizacao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      senha:'',
      mensagemDeErro:''
    };

    //navegacao = this.props.navigation;
    const {navigate} = this.props.navigation;
    navigate( Cache.recuperarRegistro("telaDeSuporte") ); 
  }

  render() {
    return <></>
  }
}

export default Atualizacao;