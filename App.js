import React, { Profiler, useState } from "react";
import { View } from "react-native";
import { Input, Text, Button } from "react-native-elements";
import  Icon  from "react-native-vector-icons/FontAwesome";
import styles from "./style/MainStyle";
import {NavigationContainer } from '@react-navigation/native';
import Config from './util/Config';
import Login from "./screens/Login";

import HomeScreen from "./screens/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import ViewBooking from "./screens/ViewBooking";
import Booking from "./screens/Booking";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FindAll from "./screens/FindAll";
import UpdateBooking from "./screens/UpdateBooking";
import DeleteBooking from "./screens/DeleteBooking";
import ViewBookingDate from "./screens/ViewBookingDate";
import Payment from "./screens/Payment";

const Stack = createStackNavigator();
  
  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="ViewBooking" component={ViewBooking} />
        <Stack.Screen name="UpdateBooking" component={UpdateBooking} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="FindAll" component={FindAll} />
        <Stack.Screen name="DeleteBooking" component={DeleteBooking} />
        <Stack.Screen name="ViewBookingDate" component={ViewBookingDate} />
        <Stack.Screen name="Payment" component={Payment} />

      </Stack.Navigator>
    );
  }
  
function defineInterceptor(){
  axios.interceptors.response.use(response => {
    return response
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config
      if (err.response.status == 401 && err.config && !err.config._retry){
        originalReq._retry = true
        AsyncStorage.getItem("TOKEN").then((token) => {
          let res = axios.put(`${Config.API_URL}token/refresh`, {oldToken: token})
          .then((res) => {
            AsyncStorage.setItem("TOKEN", res.data.access_token)
            originalReq.headers["Authorization"] = `Bearer ${res.data.access_token}`
            return axios(originalReq)
          })
          resolve(res)
        })
      }else{
        reject(err)
      }
    })
  })
}
  export default function App() {

    defineInterceptor()

    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }



