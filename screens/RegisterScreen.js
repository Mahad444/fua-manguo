import {
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();
  const register = () => {
    // register with email and password
    if(email === "" || password === "" || phone === ""){
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
      console.log("user credential",userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db,"users",`${myUserUid}`),{
        email:user,
        phone:phone
      })
    })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}>
            Register
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
            Create a New Account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 18,
                marginLeft: 13,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 10,
              }}
            />
          </View>
          {/* password */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="key-outline" size={24} color="black" />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor={"black"}
              style={{
                fontSize: password ? 18 : 18,
                marginLeft: 13,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>

          {/* phone Number */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              placeholder="Phone No."
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={"black"}
              style={{
                fontSize: password ? 18 : 18,
                marginLeft: 13,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                width: 300,
                marginVertical: 20,
              }}
            />
          </View>
          <Pressable
          onPress={register}
            style={{ 
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 8,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "grey",
                fontWeight: "500",
              }}
            >
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
