import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import Account from '../screens/Account';
import ChangeName from '../screens/Account/ChangeName';
import ChangeEmail from '../screens/Account/ChangeEmail';
import colors from '../styles/colors';
import ChangeUsername from '../screens/Account/ChangeUsername';
import ChangePassword from '../screens/Account/ChangePassword';
import Addresses from '../screens/Account/Addresses';
import addAddress from '../screens/Account/addAddress';



const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight,
                headerStyle: { backgroundColor: colors.bgDark},
                cardStyle: { 
                    backgroundColor: colors.bgLight
                }
            }}
        >
            <Stack.Screen 
                name="account"
                component={Account}
                options={{
                    title: "Cuenta",
                    headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="change-name"
                component={ChangeName}
                options={{
                    title: "Cambiar nombre y apellidos",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="change-email"
                component={ChangeEmail}
                options={{
                    title: "Cambiar email",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="change-username"
                component={ChangeUsername}
                options={{
                    title: "Cambiar username",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="change-password"
                component={ChangePassword}
                options={{
                    title: "Cambiar password",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="addresses"
                component={Addresses}
                options={{
                    title: "Mis direcciones",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
            <Stack.Screen 
                name="add-address"
                component={addAddress}
                options={{
                    title: "Nueva dirección",
                    //headerShown: false // ESTO ES PARA Q APARESCA UN TIPO BARRA SUPERIOR CON EL TITLE
                }}
            />
        </Stack.Navigator>
    )
}


