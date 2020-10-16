import * as React from 'react';
import { View, Text, TextInput } from 'react-native';

class CampoTexto extends React.Component {
  verificarCampoObrigatorio() {
    if ( this.props.necessario ) {
      return (
        <Text style={{color:'#5D82E7', fontSize:12}}>*</Text> 
      );
    }
    return (<></>); 
  }

  render() {
    return(
      <View style={{alignContent:'center', alignItems:'center'}}>
        {/**Titulo */}
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'#e6e6e6', opacity:0.7, fontSize:14}}>{ this.props.titulo }</Text> 

          { this.verificarCampoObrigatorio() }
        </View>

        <TextInput placeholder={ this.props.placeholder } autoCapitalize={'none'} style={{padding:5, width:236, fontSize:14, color:'#000', backgroundColor:'#FFF', borderRadius: 5, margin: 5 }} onChangeText={(texto) => this.props.funcao(texto)} value={ this.props.valor }/>  
      </View>
    );
  }
}

export default CampoTexto;