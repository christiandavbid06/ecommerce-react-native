import React, {useCallback, useState} from 'react'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import { Button,TextInput } from 'react-native-paper';
import formStyles from '../../styles/form';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {getMeApi, updateUserApi} from '../../api/user'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast';
import { RootSiblingParent } from "react-native-root-siblings";
//useFocusEffect+useCallback=para cargar cada vez q entre al componente

export default function ChangeName() {

    const [loading, setLoading] = useState(false);
    const {auth} = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(()=>{
            //funcion anonima autoejecutable function ABC(); ABC(); = ()()
            (async() => {
                const response = await getMeApi(auth.token);
                response.name && (await formik.setFieldValue('name', response.name));
                response.lastname && (await formik.setFieldValue('lastname', response.lastname));
            })()
        }, [])
    )
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) =>{
            setLoading(true);
            try {
                await updateUserApi(auth, formValue);
                navigation.goBack();
            } catch (error) {
                Toast.show("Error al actualizar los datos", {
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
        <RootSiblingParent>
        <View style={styles.container}>
            <TextInput 
                label="Nombre"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('name',text)}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput 
                label="Apellidos"
                style={formStyles.input}
                onChangeText={(text) => formik.setFieldValue('lastname',text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />
            <Button
                mode="contained"
                style={formStyles.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar nombre y apellidos
            </Button>
        </View>
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})

function validationSchema(){
    return{
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }
}

function initialValues(){
    return{
        name: '',
        lastname: '',
    }
}