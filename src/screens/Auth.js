import React,{useState} from 'react'
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native'
import logo from '../../assets/logo.png'
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import { layoutStyle } from '../styles'

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);
    const changeForm = () =>{
        setShowLogin(!showLogin);
    }
    return (
        <View style={layoutStyle.container}>
            <Image style={styles.logo} source={logo} />
            {/* KeyboardAvoidingView para que al salir el teclado no tape los input del formulario, 
            en caso de ios se agrega padding y de android height */}
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? "padding" :  "height"} 
            >
                {showLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 50,
        resizeMode: "contain",
        marginBottom: 20,
    }
})