import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {Button} from 'react-native-paper'
import AuthContext from './src/context/AuthContext';
import Auth from './src/screens/Auth';
import jwtDecode from 'jwt-decode';
import { setTokenApi, getTokenApi, removeTokenApi } from './src/api/token';

export default function App() {

  const [auth, setAuth] = useState(undefined);
  //USE EFFECT
  useEffect(() => {
    (async()=>{
      const token = await getTokenApi();
      if(token){
        setAuth({
          token: token,
          idUser: jwtDecode(token).id,
        })
      }else{
        setAuth(null);
      }
    })();
  })

  const login = (user) => {
    console.log(user);
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: user.user._id, 
    })()
  }

  const logout = () =>{
    if(auth){
      removeTokenApi();
      setAuth(null);
    }
  }

  //USE MEMO solo cuando actualize el auth con otro dato
  const authData = useMemo(
    () => ({
        auth,
        login,
        logout
    }), [auth]);

    if(auth === undefined) return null; // en caso de undefined se queda en blanco la pantalla

  return (
    <AuthContext.Provider value={authData}>
    <PaperProvider>
      {auth ? (
      <View style={{flex:1, justifyContent: "center", alignItems:"center", }}>
        <Text>Zona de usuarios</Text>
        <Button 
          onPress={logout}
        >
          Cerrar sesión
        </Button>
      </View>
      ) : (
      <Auth />
      )}
    </PaperProvider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
