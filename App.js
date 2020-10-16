import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

// importa as telas
import TelaEntrar from './components/telas/Entrar';
import TelaCadastrar from './components/telas/Cadastrar';
import TelaPrincipal from './components/telas/Principal';
import TelaDeNovoGrupo from './components/telas/NovoGrupo';
import TelaDeListagemDasMensagens from './components/telas/ListarMensagens';
import TelaDeAtualizacao from './components/telas/Atualizacao';

const Stack = createStackNavigator();

function App() {
  return <AppContainer />; 
}

const Navegador = createSwitchNavigator({
    Entrar: {screen: TelaEntrar},
    Principal: {screen: TelaPrincipal},
    Cadastrar: {screen: TelaCadastrar},
    NovoGrupo: {screen: TelaDeNovoGrupo},
    ListarMensagens: {screen: TelaDeListagemDasMensagens},
    Atualizacao: {screen: TelaDeAtualizacao}
  } 
);

const AppContainer = createAppContainer( Navegador );

export default App;
