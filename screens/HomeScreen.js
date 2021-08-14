import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,

} from "react-native";


import Mybutton from "../Components/MyButtons";

const HomeScreen = ({ navigation, route }) => {
 

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
      width: 200,
      height: 200,
      alignItems: "center",
    },
  });

const name = route.params?.email; //data get from log in
const phone = route.params?.phone; //data get from log in
const username = route.params?.username; //data get from log in

// console.log(name)
// console.log(JSON.stringify(phone))
// console.log(JSON.stringify(name))
if(JSON.stringify(name) == '"adm@gmail.com"'){ // Verification to see which screen should be displayed, administrator or user. (adm@gmail.com is the admoinistrator email)
  return (
    <SafeAreaView style={styles.container}>
 <Text>Welcome, {username}!</Text>

        <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require("../logo/gergarage.png")} style={styles.logo} />
        </View>
        <Mybutton
          style={styles.btn}
          title="All Bookings"
          customClick={() => navigation.navigate("FindAll",)}
        />
        <Mybutton
          style={styles.btn}
          title="Update Booking"
          customClick={() => navigation.navigate("UpdateBooking")}
        />
     
          <Mybutton
          style={styles.btn}
          title="See Schedule"
          customClick={() => navigation.navigate("ViewBookingDate")}
        />
          <Mybutton
          style={styles.btn}
          title="Delete Booking"
          customClick={() => navigation.navigate("DeleteBooking")}
        />
            {/* <Mybutton
          style={styles.btn}
          title="Payment"
          customClick={() => navigation.navigate("Payment",{ name, phone, username})}
            
        /> */}
        <Mybutton
          style={styles.btn}
          title="Your Profile"
          customClick={() => navigation.navigate("Profile",{ name, phone, username})}
        />
        </ScrollView>
    
    </SafeAreaView>
        );
}else{
  return (
    <SafeAreaView style={styles.container}>
  <Text>Welcome, {username}!</Text>

        <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require("../logo/gergarage.png")} style={styles.logo} />
        </View>
        <Mybutton      
          style={styles.btn}
          title="Booking"
          customClick={() => navigation.navigate("Booking")}
        />
        <Mybutton
          style={styles.btn}
          title="See booking"
          customClick={() => navigation.navigate("ViewBooking")}
        />
        <Mybutton
          style={styles.btn}
          title="Payments"
          customClick={() => navigation.navigate("Payment",{ name, phone, username})}
        />
        <Mybutton
          style={styles.btn}
          title="Profile"
          customClick={() => navigation.navigate("Profile",{ name, phone, username})}
        />
        </ScrollView>
    
    </SafeAreaView>


    

  );}
}
export default HomeScreen;

