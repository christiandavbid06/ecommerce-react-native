import React from 'react'
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, TextComponent } from 'react-native' //ActivityIndicator es el sppinner de rn

export default function ScreenLoading(props) {

    const {text, color, size} = props;

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator 
                size={size}
                color={color}
                style={styles.loading}
            />
            <Text style={styles.title} >{text}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, loading: {
        marginBottom: 10,
    },
    title:{
        fontSize: 28,
    }
});

ScreenLoading.defaultProps = {
    text: 'Cargando...',
    color: '#000',
}
