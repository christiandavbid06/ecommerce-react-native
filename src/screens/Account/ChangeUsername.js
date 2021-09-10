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
import { RootSiblingParent } from "react-native-root-siblings";

export default function ChangeUsername() {


    const {auth} = useAuth();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(()=>{
            ( async() =>{
                const response = await getMeApi(auth.token);
                await formik.setFieldValue('username', response.username)
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
                if(response.statusCode) throw "El username ya existe"
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
                formik.setFieldError('username', true);
                setLoading(false);
            }
        }
    });


    return (
        <View style={styles.container}>
            <TextInput 
                label="Username"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar username
            </Button>
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
        username: '',
    }
}

function validationSchema(){
    return {
        username: Yup.string().min(4,true).required(true),
    }
}