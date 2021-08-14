import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Alert } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import bookingServices from "../service/bookingService";
import userServices from "../service/userService"; // import it to user the userService information
import RNPickerSelect from "react-native-picker-select";
//import { TextInputMask } from "react-native-masked-text"; // mask for money

import styles from "../style/MainStyle";

const UpdateBooking=({ navigation }) => {
  // i will use the navigation object to call the homeScreen
  const [informBooking, setinformBooking] = useState(''); //username started with null
  const [errorCost, seterrorCost] = useState(null); //VehicleLicence  started with null
  const [cost, setCost] = useState(null); //vehicleType started with null
  const [errorId, seterrorId] = useState(null); //VehicleLicence  started with null
  const [id, setId] = useState(null); //vehicleType started with null
  const [errorLabel, seterrorLabel] = useState(null); //VehicleLicence  started with null
  const [label, setLabel] = useState(null); //vehicleType started with null
  const [errorEmployee, seterrorEmployee] = useState(null); //VehicleLicence  started with null
  const [employee, setEmployee] = useState(null); //vehicleType started with null
  
  const status= (status) => {
    // You should close the modal in here
    // The parameter 'date' is a Date object so that you can use any Date prototype method.

    setLabel(status);
    seterrorLabel(null);
  };
  const staff= (staff) => {
    // You should close the modal in here
    // The parameter 'date' is a Date object so that you can use any Date prototype method.

    setEmployee(staff);
    seterrorEmployee(null);
  };

  const part= (part) => {
    // You should close the modal in here
    // The parameter 'date' is a Date object so that you can use any Date prototype method.

    setCost(part);
    seterrorCost(null);
  };
 
  //supost to do: i am manipulation async fuction I need to crreat a async fuction in save
  //but i am going to do different and threat the promise to do it
  const getBooking = () => {
    let data = {
      // here i am getting the variable from form and send it to
      cost:cost,
      id:id,
      label:label,
      employee: employee,
      
    };
    // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
    bookingServices
    .updateBooking(data)
      .then((response) => {
        setinformBooking(response.data);
        
        Alert.alert("SUCCESS!", "All booking displayed.");
        
      }) // if correct , get the response from promise
      .catch((error) => {
        Alert.alert("ERRO!", "When displayed Booking.");
        console.log(error);
      }); //if incorrect
  };
  const styles = StyleSheet.create({
    btn: {
      height: 20,
    },
    container: {
      backgroundColor: "white",
      flex: 1,
    },
    logoContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: "contain"
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} //here i am creating the behaviour of the keyboard to avoid the keyboard on text.
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={50} //to help me to avoid the keyboard above my text
    >
      <Text>View your services!</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
          <Image source={require("../logo/update.png")} style={styles.logo} />
        </View>

        <Input
        placeholder="booking id"
        leftIcon={{ type: "font-awesome", name: "car" }}
        onChangeText={(value) => {
          setId(value); //when the user change the text we keep the value
          seterrorId(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorId} // message about error on Label... validation steps
      />
      <Text>-Cost extra- </Text>
      <RNPickerSelect
        placeholder={{ label: "Select the part of vehicle", value: null }}
        onValueChange={part}
        items={[
          { label: "Accelerator", value: "30" },
          { label: "Air conditioning", value: "30" },
          { label: "Back fender", value: "50" },
          { label: "Back seat", value: "50" },
          { label: "Brake pedal", value: "70" },
          { label: "Bumper", value: "30" },
          { label: "Door", value: "70" },
          { label: "Exhaust pipe", value: "70" },
          { label: "Front fender", value: "40" },
          { label: "Front seat", value: "30" },
          { label: "Fuel gauge", value: "40" },
          { label: "Grill", value: "30" },  
          { label: "Handbrake", value: "30" },
          { label: "Hazard lights", value: "70" },
          { label: "Headlamp", value: "40" },
          { label: "Heater", value: "40" },
          { label: "Hood", value: "50" },
          { label: "Indicator", value: "30" },
          { label: "Indicator lights", value: "30" },
          { label: "License plate", value: "70" },
          { label: "Outside mirror", value: "40" },
          { label: "Tail lights", value: "30" },
          { label: "Steering wheel", value: "50" },     
          { label: "Steering wheel", value: "50" },      
          { label: "Warning light", value: "30" },   
          { label: "Wing mirror", value: "40" },
          { label: "Window", value: "50" },
          { label: "Windscreen", value: "30" },
          { label: "-Others-", value: "30" },
        ]}
      />

    <Text>Booking status: </Text>
      <RNPickerSelect
        placeholder={{ label: "Select status of booking", value: null }}
        onValueChange={status}
        items={[
          { label: "Booked", value: "Booked" },
          { label: "In Service", value: "In Service" },
          { label: "Completed", value: "Completed" },
          { label: "Collected", value: "Collected" },
          { label: "Unrepairable", value: "Unrepairable" },
        ]}
      />

<Text>Choose Employee: </Text>
      <RNPickerSelect
        placeholder={{ label: "Select the employee", value: null }}
        onValueChange={staff}
        items={[
          { label: "Thiago", value: "Thiago" },
          { label: "Marcos", value: "Marcos" },
          { label: "Pedro", value: "Pedro" },
          { label: "Joao", value: "Joao" },
       
        ]}
      />
      
        <Button
          icon={<Icon name="search" size={15} color="white" />} //put a button on my screen
          title=" Search"
          buttonStyle={specificStyle.button}
          onPress={() => getBooking()}
          
        />
       <Text>{JSON.stringify(informBooking, 'id',' ')}</Text>
      
       </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  button:{
    alignItems: 'center',
    padding: 10,
    marginTop: 16,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12

  },
});

export default UpdateBooking;
