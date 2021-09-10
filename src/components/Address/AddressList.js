import React from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { Button } from 'react-native-paper';
import {map} from 'lodash'
import colors from '../../styles/colors';
import { deleteAddressApi } from '../../api/address';
import useAuth from '../../hooks/useAuth'

export default function AddressList(props) {

    const {addresses, setReloadAddresses} = props;
    const {auth} = useAuth();
    const nav = useNavigation();

    const deleteAddressAlert = (address) => {
        Alert.alert(
            "Eliminando dirección",
            `¿Estás seguro que quieres eliminar la dirección ${address.title}`,
            [
                {
                    text: 'NO'
                },
                {
                    text: 'SI',
                    onPress: () => deleteAddress(address._id)
                }
            ],
            {cancelable: false}
        )
    }


    const deleteAddress = async (idAddress) => {
        try {
            const response = await deleteAddressApi(auth, idAddress);
            setReloadAddresses(true);           
        } catch (error) {
            console.log(error);
        }
    }

    const goToUpdateAddress = (idAddress) =>{
        nav.navigate('add-address', {idAddress}) //ESTO LE LLEGA EN LOS PROPS router: {params}
    }

    return (
        <View style={styles.container}>
            { map(addresses, (address) =>(
               <View 
                key={address._id}
                style={styles.address} 
               >
                   <Text style={styles.title}>{address.title}</Text>
                   <Text>{address.name_lastname}</Text>
                   <Text>{address.address}</Text>
                    <View style={styles.blockline}>
                        <Text>{address.city}, </Text>
                        <Text>{address.state}, </Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                   <Text>{address.country}</Text>
                   <Text>Número de teléfono: {address.phone}</Text>
                    <View style={styles.actions} >
                        <Button
                            mode="contained"
                            color={colors.primary}
                            onPress={()=> goToUpdateAddress(address._id)}
                        >
                            Editar
                        </Button>
                        <Button
                            mode="contained"
                            color={colors.primary}
                            onPress={()=> deleteAddressAlert(address)}
                        >
                            Eliminar
                        </Button>
                    </View>
               
               </View> 
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop:30
    },
    address:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#000',
        paddingHorizontal:15,
        paddingVertical:15,
        marginBottom:15,
    },
    title:{
        fontWeight:'bold',
        paddingBottom:5
    },
    blockline:{
        flexDirection:'row' //en una sola linea varios text
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20
    }
})