import { StyleSheet, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch((error) => alert(error.message))
        console.log(err) 
    }


  return (
    <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
     <Pressable style={{marginVertical:10}}>
        <Text>Welcome{user.email} to the Best Laundry app in Town!!</Text>
     </Pressable>
     <Pressable onPress={signOutUser}>
        <Text>Logout</Text>
     </Pressable>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})