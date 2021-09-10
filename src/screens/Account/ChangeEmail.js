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
import { RootSiblingParent } from "react-native-root-siblings"

export default function ChangeEmail() {
    const {auth} = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            ( async() =>{
                const response = await getMeApi(auth.token);
                await formik.setFieldValue('email', response.email)
            })()
        },[])
    );


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                console.log(response);
                if(response.statusCode) throw "El email ya existe";
                navigation.goBack();
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER,
                    duration: Toast.durations.LONG,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                });
                formik.setFieldError('email', true);
                setLoading(false);
            }
        }
    });


    return (
        <View style={styles.container}>
            <RootSiblingParent>
            <TextInput 
                label="Email"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />  
            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar email
            </Button>
            </RootSiblingParent>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});

function initialValues(){
    return {
        email: '',
    }
}

function validationSchema(){
    return {
        email: Yup.string().email(true).required(true),
    }
}