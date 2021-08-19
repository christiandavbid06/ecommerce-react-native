import React, {useState} from 'react'
import { View, Text } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import { formStyle } from '../../styles'
import {useFormik} from 'formik'
import Toast from 'react-native-root-toast';
import * as Yup from 'yup'
import { loginApi } from '../../api/user'

import { RootSiblingParent } from "react-native-root-siblings";
import useAuth from '../../hooks/useAuth'

export default function LoginForm(props) {
    const {changeForm} = props;
    const [loading, setLoading] = useState(false);

    //Extraigo el auth Context
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) =>{
            setLoading(true);
            try {
                const response =  await loginApi(formData);
                if(response.statusCode) throw "Error en el usuario y/o contraseña";
                login(response);
                console.log(response);
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                setLoading(false);
            }
        }
    });

    return (
        <View>
            <RootSiblingParent>
           <TextInput 
                label="Email o Username"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("identifier", text)}
                values={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput 
                label="Contraseña"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                values={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <Button mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading} //true o false
                >
                Entrar
            </Button>
            <Button mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={changeForm}
                >
                Registrarse
            </Button>
            </RootSiblingParent>
        </View>
    )
}

function initialValues(){
    return{
        identifier: "",
        password: ""
    }
}

function validationSchema(){
    return{
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}
