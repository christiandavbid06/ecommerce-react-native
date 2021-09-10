import React, {useCallback, useState} from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { IconButton } from 'react-native-paper'
import {getAddressApi} from '../../api/address'
import useAuth from '../../hooks/useAuth'
import {size} from 'lodash'
import AddressList from '../../components/Address/AddressList'

export default function Addresses() {

    const navigation = useNavigation();
    const {auth} = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    useFocusEffect(
        useCallback(()=>{
            setAddresses(null); //esto se indica para el DELETE addresses vuelva a cargar
            //funcion anonima autoejecutable function ABC(); ABC(); = ()()
            (async() => {
                const response = await getAddressApi(auth);
                setAddresses(response);
                setReloadAddresses(false);//esto se indica para el DELETE addresses vuelva a cargar
            })()
        }, [reloadAddresses]) //cuando reloadAddresses cambie se ejecutara el useFocusEffect
    )

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title} >Mis direcciones</Text>
            {/* 
                TouchableWithoutFeedback -> para darle un evento de click(onPress) a la caja de add adresses 
                porque un View no puede tener un onPress
            */}
            <TouchableWithoutFeedback onPress={ () => navigation.navigate('add-address')}> 
            <View style={styles.addAddress}>
                <Text style={styles.addAddressText} >Añadir una dirección</Text>
                <IconButton icon="arrow-right" color="#000" size={20} />
            </View>
            </TouchableWithoutFeedback>

            {!addresses ? (
                <ActivityIndicator size="large" style={styles.loading} /> //SPINNER
            ):size(addresses) === 0 ? ( //tamaño del estado addresses
                <Text style={styles.noAddressText}>Crea tu primera dirección</Text>
            ):(
                <Text style={styles.noAddressText}>Listado de direcciones</Text>
            )}
            <AddressList addresses={addresses} setReloadAddresses={setReloadAddresses} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title:{
        fontSize: 20
    },
    addAddress:{ //estilo para el recuadro de añadir direccion
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    addAddressText:{
        fontSize: 16,
    },
    loading:{
        marginTop: 20
    },
    noAddressText: {
        fontSize: 16,
        marginTop: 20,
        textAlign: "center"
    }
})