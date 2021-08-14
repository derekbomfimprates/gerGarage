import React, { useState, Component } from "react";
import { render } from "react-dom";
import moment from "moment";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import DatePicker from "react-native-neat-date-picker"; //import the date Picker component to set up the booking day/date
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import bookingServices from "../service/bookingService";
import userServices from "../service/userService"; // import it to user the userService information
//import { TextInputMask } from "react-native-masked-text"; // mask for money
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../style/MainStyle";
import RNPickerSelect from "react-native-picker-select";

const Booking = ({ navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [vehicleType, setVehicleType] = useState(null); //vehicleType started with null
  const [vehicleMade, setVehicleMade] = useState(null); //vehicleMake  started with null
  const [vehicleLicence, setVehicleLicence] = useState(null); //VehicleLicence  started with null
  const [vehicleEngine, setVehicleEngine] = useState(null); //VehicleLicence  started with null
  const [bookingRequired, setBookingRequired] = useState(null); //VehicleLicence  started with null
  const [date, setDate] = useState(null); //Date  started with null
  const [time, setTime] = useState(null); //Date  started with null
  const [comment, setComment] = useState(null); //VehicleLicence  started with null
  const [isSelected, setisSelected] = useState(false); //Check Box constanteNumber started with false (is not select yet)
  const [errorVehicleType, seterrorVehicleType] = useState(null); // vehicleType validation and start with default NULL
  const [errorVehicleMade, seterrorVehicleMade] = useState(null); // VehicleMakevalidation and start with default NULL
  const [errorVehicleLicence, seterrorVehicleLicence] = useState(null); // VehicleLicence validation and start with default NULL
  const [errorVehicleEngine, seterrorVehicleEngine] = useState(null); //VehicleLicence  started with null
  const [errorBookingRequired, seterrorBookingRequired] = useState(null); //VehicleLicence  started with null
  const [errorDate, seterrorDate] = useState(null); //Date error started with null
  const [errorTime, seterrorTime] = useState(null); //Date error started with null
  const [errorComment, seterrorComment] = useState(null); //VehicleLicence  started with null
  const [isLoading, setisLaoding] = useState(false); // when the user is on screen is false because they didnt click on save/signup

  const openDatePicker = () => {
    
    setShowDatePicker(true);
  
  };

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false);
  };

  const onConfirm = (date) => {
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // Creating the vector with all day of week
    console.log(week[date.getDay()]);
    if(week[date.getDay()]=="Sunday"){ // here i am guarantee that no booking will be allowed on sunday 
      Alert.alert("ERRO!", "We are closed on Sunday.");
      
      
    }else{
    // You should close the modal in here
    setShowDatePicker(false);
    var month = new Date().getMonth() + 1;
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    
    setDate(date.getDate()+"/" + month+"/"+date.getFullYear());
    seterrorDate(null);
    }
  };
  const onTime = (time) => {
    // You should close the modal in here
    setShowTimePicker(false);

    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    
    setTime(time);
    seterrorTime(null);
  };
  const vehicle = (vehicle) => {
    // You should close the modal in here


    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    
    setVehicleType(vehicle);
    seterrorVehicleType(null);
  };
  const onService= (bookingRequired) => {
    // You should close the modal in here
    setBookingRequired(false);

    // The parameter 'date' is a Date object so that you can use any Date prototype method.

    setBookingRequired(bookingRequired);
    seterrorBookingRequired(null);
  };
  const validation = () => {
    let error = false;
    const re = /[0-9]/;  // Here i am saying that only number are allowed
    if (vehicleType == null) {
      seterrorVehicleType("Fill up with the Vehicle Type"); // message to user to insert a correct input
      error = true;
    }

    if (vehicleMade == null) {
      seterrorVehicleMade("Fill up with the information about Vehicle Made"); // message to user to insert a correct input
      error = true;
    }
    //|| !re.test(String(vehicleLicence))
    if (vehicleLicence == null ) {
      seterrorVehicleLicence("Fill up with a license number, It should be a number"); // message to user to insert a correct input
      error = true;
    }
    if (vehicleEngine == null) {
      seterrorVehicleEngine("Fill up with a vehicle engine.(Diesel, Petrol, Hybrid or Electric)"); // message to user to insert a correct input
      error = true;
    }
    if (bookingRequired == null) {
      seterrorBookingRequired("Fill up with a type of booking."); // message to user to insert a correct input
      error = true;
    }
    if (time == null) {
      seterrorTime("Fill up with a time."); // message to user to insert a correct input
      error = true;
    }
    if (date== null) {
      seterrorDate("Fill up with a date."); // message to user to insert a correct input
      error = true;
    }
    return !error;
  };
  //supposed to do: i am manipulation async fuction I need to crreat a async fuction in save
  //but i am going to do something different and used the promise to do it
  const saveBooking = () => {
    // after click in save set
    if (validation()) { 
    
    // if the validation is ok, it will save
    // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
    let data = {
      // here i am getting the variable from form and send it to
      vehicleType: vehicleType,
      vehicleMade: vehicleMade,
      vehicleLicence: vehicleLicence,
      vehicleEngine: vehicleEngine,
      bookingRequired: bookingRequired,
      date: date,
      time: time,
      comment: comment,
    };
    console.log(data)
    bookingServices
      .Booking(data)
      .then((response) => {
        Alert.alert(response.data.mensagem);
      }) // if correct , get the response from promise
      .catch((error) => {
        Alert.alert("ERRO!", "Booking problem.");
        console.log(error);
      }); //if incorrect
    }
  };
  //Layout settings
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
      resizeMode: "contain",
    },
    dateConatiner: {
      width: 350,
    },
  });

  var day = new Date(); //  get the system day
  day.setDate(day.getDate() - 1); // here i am setting my system in -1 day just to guarantee that today will be availabel

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"} //here i am creating the behaviour of the keyboard to avoid the keyboard on text.
      style={[styles.container, specificStyle.specificContainer]}
      keyboardVerticalOffset={50} //to help me to avoid the keyboard above my text
    >
      <Text>Would you like to book a service?</Text>
      <View style={styles.logoContainer}>
        <Image source={require("../logo/booking.png")} style={styles.logo} />
      </View>

     
      <Text>Type of vehicle: </Text>
      <RNPickerSelect
        placeholder={{ label: "Select the Vehicle Type", value: null }}
        onValueChange={vehicle}
        items={[
          { label: "Car Sedan", value: "Car Sedan" },
          { label: "Car Coupe", value: "Car Coupe" },
          { label: "Car Sport", value: "Car Sport" },
          { label: "Car Hatchback", value: "Car Hatchback" },
          { label: "Car Convertible", value: "Car Convertible" },
          { label: "Car SUV", value: "Car SUV" },
          { label: "Car Minivan", value: "Car Minivan" },
          { label: "Car Pickup Truck", value: "Car Pickup Truck" },
          { label: "Motorbikes Street", value: "Motorbikes Street" },
          { label: "Motorbikes Standard", value: "Motorbikes Standard" },
          { label: "Motorbikes Cruiser", value: "Motorbikes Cruiser" },
          { label: "Motorbikes Sport Bike", value: "Motorbikes Sport Bike" },
          { label: "Motorbikes Touring", value: "Motorbikes Touring" },
          { label: "Motorbikes Dual-sport", value: "Motorbikes Dual-sport" },
          { label: "Van Small", value: "Van Small" },
          { label: "Van Pick up", value: "Van Pick up" },
          { label: "Van Combi", value: "Van Combi" },
          { label: "Van Minibus", value: "Van Minibus" },
          { label: "Van Luton", value: "Van Luton" },
          { label: "Van Tipper", value: "Van Tipper" },
          { label: "Van Camper", value: "Van Camper" },
          { label: "Bus Coach", value: "Bus Coach" },
          { label: "Bus School", value: "Bus School" },
          { label: "Bus Shuttle", value: "Bus Shuttle" },
          { label: "Bus Minibus", value: "Bus Minibus" },
          { label: "Bus Minicoach", value: "Bus Minicoach" },
          { label: "Bus Single-decker", value: "Bus Single-decker" },
          { label: "Bus Low-floor", value: "Bus Low-floor" },
          { label: "Bus Step-entrance", value: "Bus Step-entrance" },
          { label: "Bus Trolley", value: "Bus Trolley" },
          { label: "-Other-", value: "Other" },
        ]}
    
      />
      
      <Input
        placeholder="Vehicle made"
        leftIcon={{ type: "font-awesome", name: "car" }}
        onChangeText={(value) => {
          setVehicleMade(value); //when the user change the text we keep the value
          seterrorVehicleMade(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorVehicleMade} // message about error on Label... validation steps
      />
      <Input
        placeholder="Vehicle Licence number"
        leftIcon={{ type: "font-awesome", name: "id-card" }}
        onChangeText={(value) => {
          setVehicleLicence(value); //when the user change the text we keep the value
          seterrorVehicleLicence(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorVehicleLicence} // message about error on Label... validation steps
      />
      <Input
        placeholder="Vehicle Enginer"
        leftIcon={{ type: "font-awesome", name: "car" }}
        onChangeText={(value) => {
          setVehicleEngine(value); //when the user change the text we keep the value
          seterrorVehicleEngine(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorVehicleEngine} // message about error on Label... validation steps
      />
        <Input
        placeholder="Description of problem"
        leftIcon={{ type: "font-awesome", name: "comments" }}
        onChangeText={(value) => {
          setComment(value); //when the user change the text we keep the value
          seterrorComment(null);
        }}
        keyboardType="default" //type of keyboard
        returnKeyType="done" //To allow user to say they already fill up the information
        errorMessage={errorComment} // message about error on Label... validation steps
      />
      
      <Text>Type of appointment: </Text>
      <RNPickerSelect
        placeholder={{ label: "Select the service", value: null }}
        onValueChange={onService}
        items={[
          { label: "Annual Service", value: "500" },
          { label: "Major Service", value: "400" },
          { label: "Repair/Fault", value: "200" },
          { label: "Major Repair", value: "300" },
        ]}
      />
        
      <Button
        icon={<Icon name="calendar" size={15} color="white" />}
        buttonStyle={specificStyle.button}
        title={" Select Date"}
        onPress={openDatePicker}
        
      />
      <DatePicker
        isVisible={showDatePicker}
        mode={"single"}
        onCancel={onCancel}
        onConfirm={onConfirm}
        minDate={day} // day will started to allowed booking
        errorMessage={errorDate}
      />

      <Text>Time of appointment: </Text>
      <RNPickerSelect
        placeholder={{ label: "Select the time", value: null }}
        onValueChange={onTime}
        items={[
          { label: "8:00 AM", value: "8:00" },
          { label: "10:00 AM", value: "10:00" },
          { label: "2:00 PM", value: "2:00" },
          { label: "4:00 PM", value: "4:00" },
        ]}
      />

      {isLoading && <Text>Loading...</Text>}
      {!isLoading && ( // if is not loading show the buttom
        <Button
          icon={<Icon name="save" size={15} color="white" />} //put a button on my screen
          title=" Save"
          buttonStyle={specificStyle.button}
          onPress={() => saveBooking()}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
    padding: 10,
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginTop: 16,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default Booking;
