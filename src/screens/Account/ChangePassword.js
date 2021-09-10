import React, {useCallback, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import colors from '../../styles/colors'
import formStyles from '../../styles/form'
import { getMeApi, updateUserApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'

export default function ChangePassword() {

    const {auth, logout} = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) =>{
            setLoading(true);
            try {
                const response = await updateMeApi(auth, formData);
                if(response.statusCode) throw "Error al guardar password";
                nav.goBack();
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
    })

    return (
        <View style={styles.container}>
            <TextInput 
                label="Nueva contraseña"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput 
                label="Repetir contraseña"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar contraseña
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
    }
})

function initialValues(){
    return {
        password: '',
        repeatPassword: '',
    }
}

function validationSchema(){
    return {
        password: Yup.string().min(4,true).required(true),
        repeatPassword: Yup.string().min(4,true)
        .oneOf([Yup.ref('password')], true)
        .required(true),
    }
}
    