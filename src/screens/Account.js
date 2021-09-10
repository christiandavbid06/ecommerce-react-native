import React, {useState, useCallback} from 'react'
import {StyleSheet, ScrollView, Text } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import Search from '../components/Search/Search'
import StatusBar from '../components/StatusBar'
import colors from '../styles/colors'
import { getMeApi } from '../api/user'
import useAuth from '../hooks/useAuth'
import ScreenLoading from '../components/ScreenLoading'
import UserInfo from '../components/Account/UserInfo'
import Menu from '../components/Account/Menu'

export default function Account() {
    const [user, setUser] = useState(null);
    const { auth } = useAuth(); //trae el ID usuario y el token

    useFocusEffect(
        useCallback(()=>{
            (async()=>{
                const response = await getMeApi(auth.token);
                setUser(response);
                console.log(response);
            })();
        },[])
    );

    return (
        <>
        <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
        {!user?(
            <ScreenLoading size="medium" />
        ):(
            <>
            <Search />
            <ScrollView>
                <UserInfo user={user} />
                <Menu />
            </ScrollView>
            </> 
        )}

        </>     
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }})
