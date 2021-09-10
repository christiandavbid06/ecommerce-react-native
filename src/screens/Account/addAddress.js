import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import formStyles from '../../styles/form'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import Toast from 'react-native-root-toast'
import { addAddressApi, getOneAddressApi, updateAddressApi } from '../../api/address'

export default function addAddress(props) {

    const [loading, setLoading] = useState(false);
    const {auth} = useAuth();
    const nav = useNavigation();


    const { route: {params} } = props; // del navigate de EDITAR, params es el idAddress
    useEffect(() => {
        (async () =>{
            if(params?.idAddress){
                setNewAddress(false);
                nav.setOptions({title: "Actualizar dirección"})
                const res = await getOneAddressApi(auth, params.idAddress);
                await formik.setFieldValue('_id', res._id);
                await formik.setFieldValue('title', res.title);
                await formik.setFieldValue('name_lastname', res.name_lastname);
                await formik.setFieldValue('address', res.address);
                await formik.setFieldValue('postal_code', res.postal_code);
                await formik.setFieldValue('city', res.city);
                await formik.setFieldValue('state', res.state);
                await formik.setFieldValue('country', res.country);
                await formik.setFieldValue('phone', res.phone);
            }
        })()
    }, [params])

    const [newAddress, setNewAddress] = useState(true);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                if(newAddress) await addAddressApi(auth, formData);
                else await updateAddressApi(auth, formData);
                nav.goBack();
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    });

    return (
        <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
                <Text style={styles.title}>Dirección</Text>
                {/* INICIA FORMULARIO */}
                <TextInput 
                    label="Ponle un titulo a tu dirección"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('title', text)}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <TextInput 
                    label="Nombre y apellidos"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('name_lastname', text)}
                    value={formik.values.name_lastname}
                    error={formik.errors.name_lastname}
                />
                <TextInput 
                    label="Dirección"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('address', text)}
                    value={formik.values.address}
                    error={formik.errors.address}
                />
                <TextInput 
                    label="Código postal"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('postal_code', text)}
                    value={formik.values.postal_code}
                    error={formik.errors.postal_code}
                />
                <TextInput 
                    label="Ciudad"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('city', text)}
                    value={formik.values.city}
                    error={formik.errors.city}
                />
                <TextInput 
                    label="Región"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('state', text)}
                    value={formik.values.state}
                    error={formik.errors.state}
                />
                <TextInput 
                    label="País"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('country', text)}
                    value={formik.values.country}
                    error={formik.errors.country}
                />
                <TextInput 
                    label="Teléfono"
                    style={formStyles.input}
                    onChangeText={(text) => formik.setFieldValue('phone', text)}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
                {/* FIN DE FORMULARIO */}
                <Button
                    mode="contained"
                    style={formStyles.btnSuccess, styles.btnSuccess}
                    onPress={formik.handleSubmit}
                >
                    { newAddress ? "Crear dirección" : "Actualizar dirección"}
                </Button>
            </View>
        </KeyboardAwareScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20
    },
    title:{
        fontSize:20,
        paddingVertical: 20
    },
    btnSuccess:{
        marginBottom:20,
    }
})

function initialValues(){
    return {
        title: '',
        name_lastname: '',
        address: '',
        postal_code: '',
        city: '',
        state: '',
        country: '',
        phone: '',
    }
}

function validationSchema(){
    return {
        title: Yup.string().required(true),
        name_lastname: Yup.string().required(true),
        address: Yup.string().required(true),
        postal_code: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        country: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}