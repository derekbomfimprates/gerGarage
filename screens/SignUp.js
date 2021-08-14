import React, { useState } from "react";

import { KeyboardAvoidingView, Platform, StyleSheet, View, Image, Alert } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import userServices from "../service/userService"; // import it to user the userService information

import styles from "../style/MainStyle";

export default function SignUp({ navigation }) {
  // i will use the navigation object to call the homeScreen
  const [email, setEmail] = useState(null); //email started with null
  const [name, setName] = useState(null); //First Name started with null
  const [password, setPassword] = useState(null); //First Name started with null
  const [surname, setSurname] = useState(null); //surname Name started with null
  const [phone, setphone] = useState(null); //Phone Number started with null
  const [isSelected, setisSelected] = useState(false); //Check Box constanteNumber started with false (is not select yet)
  const [errorEmail, seterrorEmail] = useState(null); // email validation and start with default NULL
  const [errorName, seterrorName] = useState(null); 
  const [errorPassword, seterrorPassword ]= useState(null);
  const [errorSurname, seterrorSurname] = useState(null); // name validation and start with default NULL
  const [errorPhone, seterrorPhone] = useState(null); // name validation and start with default NULL
  const [isLoading, setisLaoding] = useState(false); // when the user is on screen is false because they didnt click on save/signup
  
  const validation = () => {
    let error = false;
    seterrorEmail(null); // hide message after click on sign up, will start without message again
    seterrorPhone(null); // hide message after click on sign up, will start without message again

// expression to guarantee that a valid email will be get from user
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Regex JS for valid email address

    if (!re.test(String(email).toLowerCase()) || email == null) {
      // if the email is not valid or null won't be accept
      seterrorEmail("Fill up with a valid email address"); // message to user to insert a correct input
      error = true;
    }
    if (surname == null) {
      seterrorFisrtName("Fill up with a surname"); // message to user to insert a correct input
      error = true;
    }
    if (name == null) {
      seterrorName("Fill up with a first name"); // message to user to insert a correct input
      error = true;
    }
    if (password == null) {
      seterrorPassword("Fill up with a first name"); // message to user to insert a correct input
      error = true;
    }
   
    if (phone == null) {
      seterrorPhone("Fill up with a valid phone number"); // message to user to insert a correct input
      error = true;
    }
    return !error;
  };
  //supost to do: i am manipulation async fuction I need to crreat a async fuction in save
  //but i am going to do different and threat the promise to do it
  const save = () => {
    // after click in save set
    if (validation()) { 
   
      // if the validation is ok, it will save
     
      let data = {
        // here i am getting the variable from form and send it to
        name: name,
        surname: surname,
        email: email,
        password:password,
        phone:phone,
      };
      // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
      userServices
        .Signup(data)
        .then((response) => {
          Alert.alert("SUCCESS!", "Your account was created.");
          console.log(response.data)
        }) // if correct , get the response from promise
        .catch((error) => {
          Alert.alert("Error!", "Your account was't created.");
          console.log(error)
          console.log("Error, Please!")
        }); //if incorrect
      }
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
      width: 300,
      height: 300,
      alignItems: "center",
    },
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} //here i am creating the behaviour of the keyboard to avoid the keyboard on text.
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={50} //to help me to avoid the keyboard above my text
    >
      <View style={styles.logoContainer}>
        <Image
          source={require("../logo/gergarage.png")}
          style={styles.logo}
        />
      </View>
      <Input
        placeholder="Name"
        onChangeText={(value) => {
          setName(value); //when the user change the text we keep the value
          seterrorName(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorName} // message about error on Fisrt name... validation steps
      />
       <Input
        placeholder="Surname"
        onChangeText={(value) => {
          setSurname(value); //when the user change the text we keep the value
          seterrorSurname(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorSurname} // message about error on surname... validation steps
      />
       <Input
        placeholder="Password"
        onChangeText={(value) => {
          setPassword(value); //when the user change the text we keep the value
          seterrorPassword(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorPassword} // message about error on Password... validation steps
        secureTextEntry={true}
      />

      <Input
        placeholder="E-mail"
        onChangeText={(value) => {
          setEmail(value); //when the user change the text we keep the value
          seterrorEmail(null);
        }} // set message null when the user start typing
        keyboardType="email-address" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorEmail} // message about error on Email... validation steps
      />

        <Input
        placeholder="Phone"
        onChangeText={(value) => {
          setphone(value); //when the user change the text we keep the value
          seterrorPhone(null);
        }}
        keyboardType="phone-pad" //type of keyboard to number/ phone
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorPhone} // message about error on Phone... validation steps
      
      />

      <CheckBox
        title="By clicking Sign Up, you agree to our Terms." //text that will show to users
        checkedIcon="check" // Icon when it is mark
        uncheckedIcon="square-o" // Icon when is not mark
        checkedColor="green" // collor when is mark
        uncheckedColor="red" // color when is not mark
        checked={isSelected} // use the function
        onPress={() => setisSelected(!isSelected)} // use the inverse of isSelected after press, so this way the button will come again  to the begining
      />
     
     
        <Button
          icon={<Icon name="check" size={15} color="white" />} //put a button on my screen
          title="Sign in"
          buttonStyle={specificStyle.button}
          onPress={() => save()}
        />
      
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
