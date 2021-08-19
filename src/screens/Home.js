import React from 'react'
import {StyleSheet, View, Text } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>ESTAMOS EN EL HOME</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }})
