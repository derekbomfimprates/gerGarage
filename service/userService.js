import { useState } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "../util/Config";

//import axios from "axios"
class userService {
  // Created fuction
  async Signup(data){
   
    return axios({
        url: Config.API_URL + "user/signin",
        method: "POST",
        timeout: Config.TIMEOUT_REQUEST,
        data: data,
        headers:Config.HEADER_REQUEST
    }).then((response) => {
        return Promise.resolve(response)
    }).catch((error) => {
        return Promise.reject(error)
    })
}

  async Login(data) {
    // the data comes from save after signup
    return axios({  
          //  url: "http://192.168.0.21:8080/signup", // the address of API with end point
          url: Config.API_URL + "user/login", // the address of API with end point
          method: "POST",// using post because we are creating a data
          timeout: Config.TIMEOUT_REQUEST,
         data:data,
          headers:Config.HEADER_REQUEST
  
        }).then((response) =>{
        //  console.log(response.data); //token
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                AsyncStorage.setItem("USER", response.data.user)
         
               
             
                return Promise.resolve(response);
                
            })
            .catch((error)=>{
        
                return Promise.reject(error)
            })
  }

  async LoginToken(data) {
    // the data comes from save after signup
    return axios({  
          //  url: "http://192.168.0.21:8080/signup", // the address of API with end point
          url: Config.API_URL + "user/login-token", // the address of API with end point
          method: "POST",// using post because we are creating a data
          timeout: Config.TIMEOUT_REQUEST,
         data:data,
          headers:Config.HEADER_REQUEST
  
        }).then((response) =>{
          if(response.data.access_token){
        //  console.log(response.data); //token
                AsyncStorage.setItem("TOKEN", response.data.access_token)
                return Promise.resolve(response);
          }else{
            return Promise.reject(response);
          }
            })
            .catch((error)=>{
        
                return Promise.reject(error)
            })
  }



}

const userServices = new userService(); // creating the object
export default userServices; // export  because i want to use the data after press save buttom
