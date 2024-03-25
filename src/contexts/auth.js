import React, { createContext, useState } from "react";

import api from '../services/api';
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigation = useNavigation();

  async function SignUp(email, password, nome){
    setLoadingAuth(true);

    try{
      const response = await api.post('/users', {
        name: nome,
        password: password,
        email: email,
      })
      
      setLoadingAuth(false);
      navigation.goBack();


    }catch(error){
      console.log("ERRO AO CADASTRAR", error)
      setLoadingAuth(false);
    }
  }

  async function signIn(email, password){
    setLoadingAuth(true);

    try{
      const response = await api.post('/login', {
        email: email,
        password: password,
      })

      const { id, name, token } = response.data;

      const data = {
        id,
        name,
        token,
        email
      };

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
      });

      setLoadingAuth(false);

    }catch(error){
      console.log("ERRO AO LOGAR ", error);
      setLoadingAuth(false);
    }
  }

  return(
    <AuthContext.Provider value={{signed: !!user, user, SignUp, signIn, loadingAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;