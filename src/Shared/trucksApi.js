import axios from "axios";
import * as SecureStore from "expo-secure-store";

//const token = await SecureStore.getItemAsync("token").then(()=>{alert()});
async function getToken() {
  let token = await SecureStore.getItemAsync("token");
  
  return token;
}

export default axios.create({
  baseURL: "http://192.168.10.194/Trucks.API/API/",
  headers: {
    Authorization: "Bearer " + getToken(),
  },
});
