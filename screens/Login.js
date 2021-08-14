import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../style/MainStyle";
import userServices from "../service/userService"; // import it to user the userService information
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  // i will use the navigation object to call the homeScreen
  const [email, setEmail] = useState(null); //email started with null
  const [username, setUsername] = useState(null); //email started with null
  const [phone, setPhone] = useState(null); //email started with null
  const [password, setPassword] = useState(null); //password started with null
  const [loadingToken, setLoadingToken] = useState(true); //loadingstarted with false
  const [loading, setLoading] = useState(false)
  const access = () => {
    // console.log("entrou")

    let data = {
      // here i am getting the variable from form and send it to
      username: email,
      password: password,
      phone: phone,

    };
    console.log("OI");
    // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
    userServices
      .Login(data)
      .then((response) => {
        setLoading(false); // take out the loading
        
        console.log(response.data.user1);
        let data = {
          username: email,
          password: password,
          
        };

       
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "HomeScreen",
              params: { email: email , phone:response.data.user1, username:response.data.user2},
              
            },
          ],
        });
      }) // if correct , get the response from promise
      .catch((error) => {
        //setisLaoding(false); // take out the loading
        console.log(error);
        console.log("Error, invalid user!");
      }); //if incorrect
  };
  const accessToken = (token) => {
    setLoadingToken(true)
    let data = {
      // here i am getting the variable from form and send it to
     token:token
    }
    // i am calling a method async, so the answer will be async, now i am set up it ! and to do it i am using await
    userServices
      .LoginToken(data)
      .then((response) => {
        //setisLaoding(false); // take out the loading
        setLoadingToken(false)
        navigation.reset({
          index: 0,
          routes: [{
            name: "HomeScreen",
            params: { Token: token  },
        }]
        })
      })// if correct , get the response from promise
      .catch((error) => {
        setLoadingToken(false)
        //setisLaoding(false); // take out the loading
        console.log(error);
        console.log("Error, invalid user!");
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
      width: 300,
      height: 300,
      alignItems: "center",
    },
  });
  const SignUp = () => {
    navigation.navigate("SignUp");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    AsyncStorage.getItem("TOKEN").then((token) => {
      // if the Token exist we will get it
      accessToken(token)
    });
  }, []); // I am using [] to do 1 loop only ( go throw a empty [])

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../logo/gergarage.png")} style={styles.logo} />
      </View>
       { loadingToken && 
        <Text>Só um minutinho...</Text> 
      }

      {!loadingToken &&  //if the app is not loading by token show the screen 
  // creating a component 
    <> 
      
      <Input
        placeholder="username"
        leftIcon={{ type: "font-awesome", name: "envelope" }} //put an icon on my screen
        onChangeText={(value) => setEmail(value)} //when the user change the text we keep the value
        keyboardType="default" //type of keyboard
      />
      <Input
        placeholder="Password" // appear/help to use
        leftIcon={{ type: "font-awesome", name: "key" }} //put a icon on my screen
        onChangeText={(value) => setPassword(value)} //when the user change the text we keep the value
        keyboardType="default" //type of keyboard
        secureTextEntry={true} // set up to hidden password
      />
        { loading && 
            <ActivityIndicator />
          }

          { !loading && 
      <Button
        icon={<Icon name="check" size={15} color="white" />} //put a button on my screen
        title=" Log in"
        buttonStyle={specificStyle.button}
        onPress={() => access()}
      />
          }
      <Button
        icon={<Icon name="user" size={15} color="white" />} //put a button on my screen
        title=" New Account"
        buttonStyle={specificStyle.button}
        onPress={() => SignUp()}
      />
      </>
}
    </View>
    
  );
  
}


const specificStyle = StyleSheet.create({
  specificContainer: {
    backgroundColor: "#fff",
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
