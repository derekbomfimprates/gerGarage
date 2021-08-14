import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Alert } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import bookingServices from "../service/bookingService";
import userServices from "../service/userService"; // import it to user the userService information
//import { TextInputMask } from "react-native-masked-text"; // mask for money

import styles from "../style/MainStyle";

const DeleteBooking=({ navigation }) => {
  // i will use the navigation object to call the homeScreen
  const [informBooking, setinformBooking] = useState(''); //username started with null
  const [errorCost, seterrorCost] = useState(null); //VehicleLicence  started with null
  const [cost, setCost] = useState(null); //vehicleType started with null
  const [errorId, seterrorId] = useState(null); //VehicleLicence  started with null
  const [id, setId] = useState(null); //vehicleType started with null
  const [errorLabel, seterrorLabel] = useState(null); //VehicleLicence  started with null
  const [label, setLabel] = useState(null); //vehicleType started with null
  
 
  //supost to do: i am manipulation async fuction I need to crreat a async fuction in save
  //but i am going to do different and threat the promise to do it
  const deleteBooking = () => {
    let data = {
      // here i am getting the variable from form and send it to
    
      id:id,
      
      
    };
    // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
    bookingServices
    .deleteBooking(data)
      .then((response) => {
        setinformBooking(response.data);
        
        Alert.alert("SUCCESS!", "Booking was deleted.");
        
      }) // if correct , get the response from promise
      .catch((error) => {
        Alert.alert("ERRO!", "When try delete Booking.");
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
      <Text>Delete booking!</Text>
      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.logoContainer}>
          <Image source={require("../logo/delete.png")} style={styles.logo} />
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
      
        <Button
          icon={<Icon name="trash" size={15} color="white" />} //put a button on my screen
          title=" Delete"
          buttonStyle={specificStyle.button}
          onPress={() => deleteBooking()}
          
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

export default DeleteBooking;
