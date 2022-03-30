import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Rating } from "react-native-elements";
import trucksApi from "../Shared/trucksApi";
import * as SecureStore from "expo-secure-store";

const OfferComponent = ({ data, navigation }) => {
  const [open, setOpen] = useState(false);

  const AddBid = async () => {
    let token = await SecureStore.getItemAsync("token");
    trucksApi
      .post(
        "customer/AcceptOffer",
        {
          Id: data.id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        open ? setOpen(false) : setOpen(true);
      }}
    >
      <View style={styles.box}>
        <TouchableOpacity
          style={open ? styles.cournerButtonClose : styles.cournerButtonOpen}
          onPress={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          <Image
            style={{ width: 28, height: 28 }}
            source={{
              uri: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639178593/we/Expand_nixksq.png",
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.iconBox}>
          <Image
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 20,
                    //borderWidth: 1,
                    //borderColor: "#64BF46",
                  }}
                  source={{
                    uri: "https://visor.ph/wp-content/uploads/2020/12/suzuki-carry-van-main2.jpg",
                  }}
                />
          </View>
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 22, color: "#FFF" }}>
              {data.price} JOD
            </Text>
            <Text
              style={{
                fontWeight: "200",
                marginTop: 5,
                fontSize: 20,
                color: "#CBD1D8",
              }}
            >
              {data.driverName}
            </Text>
            {/* <Rating
              imageSize={20}
              readonly
              startingValue={4}
              tintColor="#7A62EF"
              ratingBackgroundColor="#000"
              style={{ alignSelf: "start", marginTop: 10 }}
              type="custom"
              ratingBackgroundColor="#7040F6"
            /> */}
          </View>
        </View>
        <View
          style={open ? styles.moreDetailsActive : styles.moreDetailsNotActive}
        >
          <View style={styles.resultField}>
            <Image
              style={{ width: 35, height: 35 }}
              // source={{
              //   uri: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639180323/we/icon-100x100_un3nip.png",
              // }}
              source={require("../../assets/phone.png")}
            />
            <Text style={styles.resultFieldText}>{data.phoneNumber}</Text>
          </View>
          <View style={styles.resultField}>
            <Image
              style={{ width: 35, height: 35 }}
              // source={{
              //   uri: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639180323/we/icon-100x100_un3nip.png",
              // }}
              source={require("../../assets/PlateNo.png")}
            />
            <Text style={styles.resultFieldText}>{data.plateNumber}</Text>
          </View>
          <View style={styles.resultField}>
            <Image
              style={{ width: 35, height: 35 }}
              source={{
                uri: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639180323/we/icon-100x100_un3nip.png",
              }}
              source={require("../../assets/truck.png")}
            />
            <Text style={styles.resultFieldText}>Box Truck</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Are you sure?", "", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        AddBid();
                        navigation.navigate("UserMainScreen")
                      },
                    },
                  ])
                }
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default OfferComponent;
const styles = StyleSheet.create({
  body: {
    flex: 1,
    //marginTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#7040F6",
    paddingTop: 20,
  },
  box: {
    borderRadius: 40,
    backgroundColor: "#7A62EF",

    padding: 25,
    position: "relative",
    marginBottom: 20,
  },
  cournerButtonOpen: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1000,
  },
  cournerButtonClose: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 1000,
    transform: [{ rotate: "180deg" }],
  },
  iconBox: {
    //borderWidth: 1,
   // borderColor: "#FFF",
    //height: 100,
    //borderRadius: 25,
    width: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoBox: {
    height: 100,
    width: "70%",
    paddingTop: 10,
  },
  moreDetailsActive: {
    marginTop: 10,
    display: "flex",
  },
  moreDetailsNotActive: {
    marginTop: 10,
    display: "none",
  },
  resultField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  resultFieldText: {
    fontSize: 19.5,
    color: "#FFF",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#FFF",
    borderWidth: 0.75,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFF",
  },
  buttonContainer: {
    width: 200,
    alignSelf: "flex-start",
    justifyContent: "center",
  },
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
