import * as React from 'react';
import { TouchableOpacity, Text, TextInput } from 'react-native';

class BotaoGeneralizado extends React.Component {
  f() {
    console.log('passou');
    console.log( JSON.stringify( this.props.funcao ) );
    console.log("eita");
  }
  
  render() { 
    return (
      <TouchableOpacity onPress={ this.props.funcao } style={ estilo.centralizado }>
        <Text style={ estilo.configuracao, estilo.cor }>{this.props.titulo}</Text>
      </TouchableOpacity>
    );
  }
}

const estilo = {
  centralizado: {
    alignContent: 'center', 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  cor: {
    color: '#5682a3'
  }
};

export default BotaoGeneralizado;