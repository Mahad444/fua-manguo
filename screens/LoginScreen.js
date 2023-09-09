import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  // navigate to register screen
  const navigation = useNavigation();
  // useEffect for login
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  // Login function logic
  const login = () => { 
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("User Details",userCredential);
      const user = userCredential.user;
      console.log("User Details",user);
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
      }}
    >
      {loading ? (
        <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',flex:1}}>
          <Text style={{marginRight:10}}>Loading.. </Text>
          <ActivityIndicator size="large" color={"green" }/>
        </View>

      ):(
<KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#662d91" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 8 }}>
            Sign in Your Account
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
          <Pressable
            onPress={login}
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
              Login
            </Text>
          </Pressable>
          <Pressable onPress={()=> navigation.navigate("Register")} style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "grey",
                fontWeight: "500",
              }}
            >
              Don't have an account?SignUp
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      ) 
      }
      
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
