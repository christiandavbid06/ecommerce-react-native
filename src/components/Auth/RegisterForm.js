import React,{useState} from 'react'
import { Text, View } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import {useFormik} from 'formik'
import Toast from 'react-native-root-toast';
import * as Yup from 'yup'
import { formStyle } from '../../styles'
import { registerApi } from '../../api/user'

export default function RegisterForm(props) {

    const { changeForm } = props;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialValues());

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            console.log(formData);
            try {
                await registerApi(formData);
                console.log("OK");
                changeForm();
            } catch (error) {
                setLoading(false);
                console.log(error);
                Toast.show("Error al registrar al usuario",{
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                })
            }
        }
    })

    return (
        <View>
            <TextInput 
                label="Email"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput 
                label="Nombre de usuario"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("username", text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput 
                label="Contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("password", text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput 
                label="Repetir contraseña"
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Registrarse
            </Button>
            <Button
                mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={changeForm}
            >
                Iniciar sesión
            </Button>
        </View>
    )
}


function initialValues(){
    return{
        email :"",
        username:"",
        password:"",
        repeatPassword:"",
    }
}

function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true)
                        .oneOf([Yup.ref("password")],true), // para verificar q sea igual a password
    }
}