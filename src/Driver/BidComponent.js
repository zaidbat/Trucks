import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { TextInput } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import * as SecureStore from "expo-secure-store";
import trucksApi from "../Shared/trucksApi";

export default function Bid({ data }) {
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(1);
  }
  const [showPickup, setShowPickup] = React.useState(false);
  const [showDropOff, setShowDropOff] = React.useState(false);

  const [offeredPrice, setofferedPrice] = React.useState("");

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  const geo = { data };

  const sendOffer = async () => {
    let token = await SecureStore.getItemAsync("token");

    trucksApi
      .post(
        "Driver/AddOffer",
        {
          BidId: parseInt(geo.data.id),
          OfferedPrice: Number(offeredPrice),
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
    <View
      style={{
        backgroundColor: "#6ECC4C",
        borderRadius: 20,
        padding: 20,
        paddingTop: 30,
        marginTop: 40,
      }}
    >
      <Modal visible={showPickup}>
        <Button
          onPress={() => {
            setShowPickup(false);
          }}
          title="x"
          containerStyle={{
            position: "absolute",
            zIndex: 1,
            //width: 60,
            top: 50,
            left: 10,
            borderRadius: 50,
          }}
          buttonStyle={{ backgroundColor: "#64BF46", padding: 25 }}
          titleStyle={{ position: "absolute" }}
        />
        <MapView
          provider="google"
          region={{
            latitude: geo.data.pickupLatitude,
            longitude: geo.data.pickupLongitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{ flex: 1 }}
        >
          <Marker
            pinColor="green"
            coordinate={{
              latitude: geo.data.pickupLatitude,
              longitude: geo.data.pickupLongitude,
            }}
          ></Marker>
        </MapView>
        <View
          style={{
            height: "30%",
            backgroundColor: "#6ECC4C",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 25,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#64BF46",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                flex: 1,

                color: "#fff",
                fontSize: 20,
              }}
            >
              {data.pickupDescription}
            </Text>
          </View>
        </View>
      </Modal>
      <Modal visible={showDropOff}>
        <Button
          onPress={() => {
            setShowDropOff(false);
          }}
          title="x"
          containerStyle={{
            position: "absolute",
            zIndex: 1,
            //width: 60,
            top: 50,
            left: 10,
            borderRadius: 50,
          }}
          buttonStyle={{ backgroundColor: "#64BF46", padding: 25 }}
          titleStyle={{ position: "absolute" }}
        />
        <MapView
          provider="google"
          region={{
            latitude: geo.data.dropOffLatitude,
            longitude: geo.data.dropOffLongitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={{ flex: 1 }}
        >
          <Marker
            pinColor="green"
            coordinate={{
              latitude: geo.data.dropOffLatitude,
              longitude: geo.data.dropOffLongitude,
            }}
          ></Marker>
        </MapView>
        <View
          style={{
            height: "30%",
            backgroundColor: "#6ECC4C",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 25,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#64BF46",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                flex: 1,

                color: "#fff",
                fontSize: 20,
              }}
            >
              {data.dropOffDescription}
            </Text>
          </View>
        </View>
      </Modal>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            borderWidth: 1,
            alignItems: "center",
            padding: 11,
            position: "absolute",
            top: -65,
            backgroundColor: "#6ECC4C",
            borderRadius: 50,
            borderWidth: 6,
            borderColor: "#64BF46",
            paddingBottom: 0,
          }}
        >
          <Image
            style={{ width: 30, height: 42 }}
            source={require("../../assets/bid.png")}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowPickup(true);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              //borderWidth: 1,
              width: "45%",
            }}
          >
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/circles.png")}
            />
            {/* <Image
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  borderRadius: 15,
                }}
                source={require("../../assets/Map.png")}
              /> */}
            <MapView
              // provider="google"
              region={{
                latitude: geo.data.pickupLatitude,
                longitude: geo.data.pickupLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              style={{ width: "80%", height: 100, borderRadius: 15 }}
              onPress={() => {
                setShowPickup(true);
              }}
            >
              <Marker
                pinColor="violet"
                coordinate={{
                  latitude: geo.data.pickupLatitude,
                  longitude: geo.data.pickupLongitude,
                }}
              ></Marker>
            </MapView>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowDropOff(true);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              //borderWidth: 1,
              width: "45%",
            }}
          >
            <Image
              style={{ width: 30, height: 30, transform: [{ scaleX: -1 }] }}
              source={require("../../assets/circles.png")}
            />
            {/* <Image
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  borderRadius: 15,
                }}
                source={require("../../assets/Map.png")}
              /> */}
            <MapView
              //provider="google"
              region={{
                latitude: geo.data.dropOffLatitude,
                longitude: geo.data.dropOffLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              style={{ width: "80%", height: 100, borderRadius: 15 }}
              onPress={() => {
                setShowDropOff(true);
              }}
            >
              <Marker
                pinColor="violet"
                coordinate={{
                  latitude: geo.data.dropOffLatitude,
                  longitude: geo.data.dropOffLongitude,
                }}
              ></Marker>
            </MapView>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "95%",
            borderTopWidth: 1,
            alignSelf: "center",
            marginVertical: 20,
            borderColor: "#fff",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              alignSelf: "center",
              top: -25,
              padding: 10,
              backgroundColor: "#6ECC4C",
            }}
          >
            <Image
              style={{ width: 30, aspectRatio: 1.1, marginRight: 10 }}
              source={require("../../assets/KmCount.png")}
            />
            <Text style={{ fontWeight: "500", color: "#282828" }}>
              {calcCrow(
                data.pickupLatitude,
                data.pickupLongitude,
                data.dropOffLatitude,
                data.dropOffLongitude
              )}{" "}
              Km
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center",alignSelf:"flex-start" }}>
          <View>
            <Image
              style={{ width: 30, height: 30, marginRight: 15 }}
              source={require("../../assets/circles.png")}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              //color: "#fff",
            }}
          >
            {data.pickupDescription}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center",alignSelf:"flex-start" }}>
          <View>
            <Image
              style={{
                width: 30,
                height: 30,
                marginRight: 15,
                transform: [{ scaleX: -1 }],
              }}
              source={require("../../assets/circles.png")}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "400",
              //color: "#fff",
            }}
          >
            {data.dropOffDescription}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "60%" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: "25%" }}>
                <Image
                  style={{ width: 30, height: 30, marginRight: 15 }}
                  source={require("../../assets/box.png")}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#282828",
                  //borderWidth:1,
                  width: "75%",
                }}
              >
                {data.moveType}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{ width: 30, height: 30, marginRight: 15 }}
                  source={require("../../assets/calender.png")}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#282828",
                }}
              >
                {data.date}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{ width: 30, height: 30, marginRight: 15 }}
                  source={require("../../assets/clock.png")}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#282828",
                }}
              >
                {data.time}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{ width: 30, height: 30, marginRight: 15 }}
                  source={require("../../assets/label.png")}
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#282828",
                }}
              >
                {data.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "40%",
              backgroundColor: "#64BF46",
              borderRadius: 15,
              height: "90%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "400",
                color: "#fff",
                padding: 10,
              }}
            >
              My Price
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  borderRadius: 15,
                  borderWidth: 0.5,
                  width: "50%",
                  marginLeft: 5,
                  borderColor: "#fff",
                  fontSize: 25,
                  color: "#282828",
                  padding: 5,
                }}
                keyboardType="numeric"
                placeholder="00.0"
                value={offeredPrice}
                onChangeText={setofferedPrice}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "400",
                  color: "#282828",
                  padding: 10,
                  width: "50%",
                }}
              >
                JOD
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (offeredPrice) {
                  Alert.alert("Are you sure?", "", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => sendOffer() },
                  ]);
                } else {
                  Alert.alert("enter Your price!");
                }
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                bottom: -15,
                right: -10,
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../../assets/send.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
