import 'react-native-gesture-handler';
import { StatusBar, SafeAreaView } from 'react-native';

import { NavigationContainer } from "@react-navigation/native"

import Routes from './src/routes';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return(
    <SafeAreaView style={{flex: 1}}>
    <NavigationContainer>
      <AuthProvider>
      <StatusBar backgroundColor='#F0F4FF' barStyle="dark-content"/>
      <Routes/>
      </AuthProvider>
    </NavigationContainer>
    </SafeAreaView>
  )
}
