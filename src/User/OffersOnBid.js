import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Rating } from "react-native-elements";
import OfferComponent from "./OfferComponent";
import * as SecureStore from "expo-secure-store";
import trucksApi from "../Shared/trucksApi";

export default function OffersOnBid({ route, navigation }) {
  const renderItem = ({ item }) => (
    <OfferComponent navigation={navigation} data={item}></OfferComponent>
  );

  const [offerss, setOfferss] = useState([]);

  const LoadBids = async () => {
    let token = await SecureStore.getItemAsync("token");

    console.log(route.params);
    trucksApi
      .get("customer/GetOffersOnBid", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          BidId: route.params,
        },
      })
      .then((response) => {
        console.log(response.data);
        setOfferss(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    (async () => {
      LoadBids();
      //console.log("mnmnnm");
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate("UserMainScreen")}>
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/Back.png")}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: "Offers", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#7040F6",
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          padding: 30,
          paddingBottom: 0,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={offerss}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
