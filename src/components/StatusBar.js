import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

export default function StatusBarCustom(props) {
    const { backgroundColor, ...rest} = props;  // backgroundColor y todo lo q venga
    return (
        <>
            <StatusBar backgroundColor={backgroundColor} {...rest} /> 
            <SafeAreaView // protege el area de estado del telefono
                style={{
                    flex: 0,
                    backgroundColor: backgroundColor,

                }}
            />
        </>
    )
}
