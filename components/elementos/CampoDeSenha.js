import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

class CampoSenha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senhaSegura:true
    };

    this.visibilidadeDaSenha = this.visibilidadeDaSenha.bind(this);
  }

  // atualiza o estado de visibilidade da senha
  visibilidadeDaSenha() {
    this.setState( { senhaSegura: !this.state.senhaSegura } );
  }

  render() {
    return(
      <View style={{alignContent:'center', alignItems:'center'}}>

        <View style={{flexDirection:'row'}}>
          {/**Campo de entrara para senha */}
          <TextInput placeholder={ this.props.placeholder } value={ this.props.valor } secureTextEntry={ this.state.senhaSegura } style={{width:236, color:'#000', backgroundColor:'#FFF', fontSize:14, borderRadius: 5, padding: 5, margin: 5 }} onChangeText={(senha) => this.props.funcao(senha)}/>
        </View>
      </View>
    );
  }
}

export default CampoSenha;