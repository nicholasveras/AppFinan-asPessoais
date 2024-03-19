import React, { createContext, useState } from "react";

import api from '../services/api';
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState({
    nome: 'Nicholas Teste'
  });

  const navigation = useNavigation();

  async function SignUp(email, password, nome){
    try{
      const response = await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      })
      
      navigation.goBack();


    }catch(error){
      console.log("ERRO AO CADASTRAR", error)
    }
  }

  return(
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;