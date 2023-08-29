import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);

   // calculating the price of the cart
   const total = cart.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
   const navigation = useNavigation();
  const ProceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Please select a date, time and delivery date",
        "please select all the fields",
        [
          {
            text: "cancel",
          onPress:() => console.log("cancel pressed"),
          style: "cancel",
          },
        { text: "ok", onPress: () => console.log("ok pressed") }
      ],
      { cancelable: false }
      );
    }
    else
    {
      if(selectedDate && selectedTime && delivery){
        navigation.replace("Cart",{
        pickUpDate:selectedDate,
            selectedTime:selectedTime,
            no_Of_days:delivery,
        
        })
        
      }
    }
  };
  return (
    <>
      <SafeAreaView>
        <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            padding: 40,
            borderColor: "gray",
            borderWidth: 0.7,
            paddingVertical: 80,
            borderRadius: 9,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
          PickUp Date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={new Date("2023-08-20")}
          endDate={new Date("2023-08-31")}
          initialSelectedDate={new Date("2023-01-01")}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />
        <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
          Select Time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(item.time)}
              style={
                selectedTime.includes(item.time)
                  ? {
                      margin: 10,
                      padding: 15,
                      borderRadius: 7,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      padding: 15,
                      borderRadius: 7,
                      borderColor: "grey",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{ fontSize: 15, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery Date
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, i) => (
            <Pressable
              onPress={() => setDelivery(item.name)}
              key={i}
              style={
                delivery.includes(item.name)
                  ? {
                      margin: 10,
                      padding: 15,
                      borderRadius: 7,
                      borderColor: "red",
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 10,
                      padding: 15,
                      borderRadius: 7,
                      borderColor: "grey",
                      borderWidth: 0.7,
                    }
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>

      {/* Cart */}
      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 30,
            marginTop:'auto',
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} item(s) | {total} Ksh
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={ProceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed To Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
