import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  TextInput,
  Modal,
  Linking,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-elements";
import { useState } from "react";

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

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export default function OrderComponent({ data }) {
  const [showPickup, setShowPickup] = useState(false);
  const [showDropOff, setShowDropOff] = useState(false);

  const geo = { data };

  //console.log(data.data);
  return (
    <View style={{ flex: 1 }}>
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
          buttonStyle={{ backgroundColor: "#7040F6", padding: 25 }}
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
            pinColor="violet"
            coordinate={{
              latitude: geo.data.pickupLatitude,
              longitude: geo.data.pickupLongitude,
            }}
          ></Marker>
        </MapView>
        <View
          style={{
            height: "30%",
            backgroundColor: "#7040F6",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 25,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#7A62EF",
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
          buttonStyle={{ backgroundColor: "#7040F6", padding: 25 }}
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
            pinColor="violet"
            coordinate={{
              latitude: geo.data.dropOffLatitude,
              longitude: geo.data.dropOffLongitude,
            }}
          ></Marker>
        </MapView>
        <View
          style={{
            height: "30%",
            backgroundColor: "#7040F6",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            padding: 25,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#7A62EF",
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
      <View
        style={{
          backgroundColor: "#7A62EF",
          borderRadius: 20,
          padding: 20,
          paddingTop: 30,
          marginTop: 40,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setShowPickup(true);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/circles.png")}
              />
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  borderRadius: 15,
                }}
                source={require("../../assets/Map.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowDropOff(true);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../../assets/circles.png")}
              />
              <Image
                style={{
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  borderRadius: 15,
                }}
                source={require("../../assets/Map.png")}
              />
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
                backgroundColor: "#7A62EF",
              }}
            >
              <Image
                style={{ width: 30, aspectRatio: 1.1, marginRight: 10 }}
                source={require("../../assets/KmCount.png")}
              />
              <Text style={{ fontWeight: "500", color: "#fff" }}>
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
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "60%" }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Image
                    style={{ width: 30, height: 30, marginRight: 15 }}
                    source={require("../../assets/box.png")}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "#fff",
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
                    color: "#fff",
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
                    color: "#fff",
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
                    color: "#fff",
                  }}
                >
                  {data.price}
                </Text>
              </View>
              
            </View>
            <View
              style={{
                width: "40%",
                backgroundColor: "#7A62EF",
                borderRadius: 15,
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  color: "#fff",
                  padding: 10,
                  fontSize: 20,
                  justifyContent: "flex-start",
                }}
              >
                {data.driverName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${data.phoneNumber}`);
                }}
                style={{
                  alignSelf: "center",
                  justifyContent: "flex-start",
                  backgroundColor: "#7040F6",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 10,
                  flexDirection:'row'
                }}
              >
                <Image
                  style={{ width: 20, height: 23, marginRight: 5 }}
                  source={require("../../assets/phone.png")}
                />
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  {data.phoneNumber}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
