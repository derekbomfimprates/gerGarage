import * as React from "react";
import { Text, View, StyleSheet,Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Profile({ navigation, route}) {
  const name = route.params?.name;
  const phone = route.params?.phone;
  const username = route.params?.username;

  const logout = (navigation) => {
    AsyncStorage.setItem("TOKEN","").then(()=>{
       navigation.reset({
            index: 0,
            routes: [{name: "Login"}]
        })
    }).catch(()=>{
      Alert.alert("Error when try to log out")
    })
       
    
}

return (

      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={require("../logo/profile.png")} />

                <Text style={styles.name}>USER: {username}</Text>
                <Text style={styles.name}>PHONE: {phone}</Text>
                <Text style={styles.name}>E-mail: {name}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/cottage.png'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Home</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/administrator-male.png'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Settings</Text>
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/filled-like.png'}}/>
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.info}>Booking</Text>
              </View>
            </View>

            <View style={styles.item}>
            <Button
        icon={
          <Icon
            name="check"
            size={15}
            color="white"
          />
        }
        title="Logout"
        onPress={() => logout(navigation)}
      />
       </View>
          </View>
      </View>
  
);
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#bfbfbf",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#0bb2db",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});

