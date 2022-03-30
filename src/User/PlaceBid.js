import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Platform,
  Modal,
  Dimensions,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Button, normalize } from "react-native-elements";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import trucksApi from "../Shared/trucksApi";
import * as SecureStore from "expo-secure-store";

export default function PlaceBid({ navigation }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setStartDate(date.toLocaleDateString("en-US"));
    var t = date.toLocaleDateString("en-GB");
    console.log("A date has been picked: ", t);
    setDate(t);
    hideDatePicker();
  };

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    console.log("A date has been picked: ", strTime);
    setTimeHour(hours);
    setTimeMin(minutes);
    setTimePmAm(ampm);
    hideTimePicker();
    setStartTime(hours + ":" + minutes + ":00" + " " + ampm);
  };
  Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
  const [date, setDate] = useState("DD/MM/YYYY");
  const [price, setPrice] = useState(20);
  const [timeHour, setTimeHour] = useState("HH");
  const [timeMin, setTimeMin] = useState("MM");
  const [timePmAm, setTimePmAm] = useState("PM");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [items, setItems] = useState([
    { label: "Home Furniture", value: 1 },
    { label: "Whole appartment", value: 2 },
    { label: "Goods", value: 3 },
  ]);

  const MyArrowDownIcon = () => {
    return <Text style={{ fontSize: 15, color: "#fff" }}>▼</Text>;
  };
  const MyArrowUpIcon = () => {
    return (
      <Text
        style={{ transform: [{ scaleY: -1 }], fontSize: 15, color: "#fff" }}
      >
        ▼
      </Text>
    );
  };
  const MyTickIcon = () => {
    return <Text style={{ fontSize: 15, color: "#fff" }}>✓</Text>;
  };

  const [fromRegion, setFromRegion] = React.useState({
    latitude: 31.978076613050046,
    longitude: 35.8446776447824,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [toRegion, setToRegion] = React.useState({
    latitude: 31.978076613050046,
    longitude: 35.8446776447824,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const FromMapRef = useRef(null);
  const ToMapRef = useRef(null);

  const [fromMapVisiblity, setFromMapVisibility] = useState(false);
  const [toMapVisiblity, setToMapVisibility] = useState(false);

  const [pickup, setPickUp] = useState({});
  const [dropoff, setDropoff] = useState({});

  const [fromDiscVisiblity, setFromDiscVisiblity] = useState(false);
  const [toDiscVisiblity, setToDiscVisiblity] = useState(false);

  const [pickupDisc, setPickupDisc] = useState("");
  const [dropoffDisc, setDropoffDisc] = useState("");

  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");

  const [moveType, setMoveType] = useState(items[0].label);

  const AddBid = async () => {
    var g = new Date(startDate + " " + startTime + " GMT");
    console.log(g);
    let token = await SecureStore.getItemAsync("token");
    trucksApi
      .post(
        "customer/addbid",
        {
          PickupLatitude: pickup.latitude,
          PickupLongitude: pickup.longitude,
          DropOffLatitude: dropoff.latitude,
          DropOffLongitude: dropoff.longitude,
          StartTime: g,
          PickupDescription: pickupDisc,
          DropOffDescription: dropoffDisc,
          MoveType: moveType,
          CustomerPrice: price,
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
    <SafeAreaProvider>
      <Modal visible={fromMapVisiblity}>
        <View style={{ flex: 1, backgroundColor: "#7040F6" }}>
          <SafeAreaView style={{ backgroundColor: "#7040F6" }}></SafeAreaView>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log(data, details);

              FromMapRef.current.animateToRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              });
            }}
            query={{
              key: "AIzaSyCzEFHKuJUpYdkDLgRap15PHmSmMcRZYLw",
              language: "en",
              components: "country:jo",
              //types: "establishment",
              // radius: 30000,
              location: `${fromRegion.latitude}, ${fromRegion.longitude}`,
            }}
            styles={{
              container: {
                width: "100%",
                position: "relative",
                minHeight: 50,
                maxHeight: 50,
                ...(Platform.OS === "ios" ? { zIndex: 3 } : null),
                borderRadius: 30,
                paddingHorizontal: 10,
              },
              listView: {
                backgroundColor: "white",
                position: "absolute",
                marginTop: 50,
                zIndex: 3,
              },
              textInput: {
                borderRadius: 10,
              },
            }}
          />
          <View style={{ flex: 1 }}>
            <MapView
              ref={FromMapRef}
              style={{ flex: 1 }}
              onRegionChangeComplete={setFromRegion}
              provider="google"
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: 32.039309597198525,
                latitudeDelta: 2.039824472534363,
                longitude: 36.024911385029554,
                longitudeDelta: 1.2485243752598763,
              }}
              onMapLoaded={async () => {
                if (Object.keys(pickup).length === 0) {
                  let { status } =
                    await Location.requestForegroundPermissionsAsync();

                  if (status !== "granted") {
                  } else {
                    let location = await Location.getLastKnownPositionAsync({});
                    if (location == null) {
                      location = await Location.getCurrentPositionAsync({});
                    }
                    FromMapRef.current.animateToRegion({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.002,
                    });
                  }
                } else {
                  FromMapRef.current.animateToRegion(pickup);
                }
              }}
            >
              {/* <Marker
                coordinate={{
                  latitude: fromRegion.latitude,
                  longitude: fromRegion.longitude,
                }}
              ></Marker> */}
            </MapView>
            <View
              style={{
                left: "50%",
                marginLeft: -15,
                marginTop: -40,
                position: "absolute",
                top: "50%",
                zIndex: 1,
              }}
            >
              <Image
                style={{ width: 30, height: 40 }}
                source={require("../../assets/mapPin.png")}
              />
            </View>
            <Button
              title="✓"
              containerStyle={{
                position: "absolute",
                zIndex: 1,
                width: 100,
                bottom: 50,
                left: "50%",
                marginLeft: -50,
              }}
              titleStyle={{ fontSize: 20, fontWeight: "900" }}
              buttonStyle={{ backgroundColor: "#7040F6" }}
              onPress={() => {
                setPickUp({
                  latitude: fromRegion.latitude,
                  longitude: fromRegion.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                });
                setFromMapVisibility(false);
                setFromDiscVisiblity(true);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={fromDiscVisiblity}>
        <View style={{ backgroundColor: "#7040F6", flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              //backgroundColor: '#7A62EF',
              marginTop: Constants.statusBarHeight + 30,
              borderRadius: 20,
              justifyContent: "space-around",
              flex: 1,
            }}
          >
            <View>
              <Text
                style={{
                  margin: 24,
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Enter the pickup location details
              </Text>
              <TextInput
                value={pickupDisc}
                onChangeText={setPickupDisc}
                placeholder={"Ex: Teiba Commercial Complex 2"}
                placeholderTextColor={"#c4c3d0"}
                //multiline={true}
                style={{
                  backgroundColor: "#7A62EF",
                  margin: 20,
                  //height: "40%",
                  borderRadius: 20,
                  padding: 20,
                  color: "#fff",
                  fontSize: 20,
                }}
              ></TextInput>
            </View>
            <Button
            disabled={
              !pickupDisc 
            }
              loadingProps={{ color: "#fff" }}
              title="Save"
              type="outline"
              buttonStyle={[
                {
                  borderColor: "#fff",
                  width: 250,
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 20,
                  alignSelf: "center",
                },
              ]}
              titleStyle={{ color: "#fff", fontSize: 22 }}
              onPress={() => {
                setFromDiscVisiblity(false);
                //setPickupDisc()
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Modal visible={toMapVisiblity}>
        <View style={{ flex: 1, backgroundColor: "#7040F6" }}>
          <SafeAreaView style={{ backgroundColor: "#7040F6" }}></SafeAreaView>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log(data, details);

              ToMapRef.current.animateToRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              });
            }}
            query={{
              key: "AIzaSyCzEFHKuJUpYdkDLgRap15PHmSmMcRZYLw",
              language: "en",
              components: "country:jo",
              //types: "establishment",
              // radius: 30000,
              location: `${toRegion.latitude}, ${toRegion.longitude}`,
            }}
            styles={{
              container: {
                width: "100%",
                position: "relative",
                minHeight: 50,
                maxHeight: 50,
                ...(Platform.OS === "ios" ? { zIndex: 3 } : null),
                borderRadius: 30,
                paddingHorizontal: 10,
              },
              listView: {
                backgroundColor: "white",
                position: "absolute",
                marginTop: 50,
                zIndex: 3,
              },
              textInput: {
                borderRadius: 10,
              },
            }}
          />
          <View style={{ flex: 1 }}>
            <MapView
              ref={ToMapRef}
              style={{ flex: 1 }}
              onRegionChangeComplete={setToRegion}
              provider="google"
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: 32.039309597198525,
                latitudeDelta: 2.039824472534363,
                longitude: 36.024911385029554,
                longitudeDelta: 1.2485243752598763,
              }}
              onMapReady={async () => {
                if (Object.keys(dropoff).length === 0) {
                  let { status } =
                    await Location.requestForegroundPermissionsAsync();

                  if (status !== "granted") {
                  } else {
                    let location = await Location.getLastKnownPositionAsync({});
                    if (location == null) {
                      location = await Location.getCurrentPositionAsync({});
                    }
                    ToMapRef.current.animateToRegion({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.002,
                    });
                  }
                } else {
                  ToMapRef.current.animateToRegion(dropoff);
                }
              }}
            >
              {/* <Marker
                coordinate={{
                  latitude: fromRegion.latitude,
                  longitude: fromRegion.longitude,
                }}
              ></Marker> */}
            </MapView>
            <View
              style={{
                left: "50%",
                marginLeft: -15,
                marginTop: -40,
                position: "absolute",
                top: "50%",
                zIndex: 1,
              }}
            >
              <Image
                style={{ width: 30, height: 40 }}
                source={require("../../assets/mapPin.png")}
              />
            </View>
            <Button
              title="✓"
              containerStyle={{
                position: "absolute",
                zIndex: 1,
                width: 100,
                bottom: 50,
                left: "50%",
                marginLeft: -50,
              }}
              titleStyle={{ fontSize: 20, fontWeight: "900" }}
              buttonStyle={{ backgroundColor: "#7040F6" }}
              onPress={() => {
                setDropoff({
                  latitude: toRegion.latitude,
                  longitude: toRegion.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002,
                });
                setToMapVisibility(false);
                setToDiscVisiblity(true);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={toDiscVisiblity}>
        <View style={{ backgroundColor: "#7040F6", flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              //backgroundColor: '#7A62EF',
              marginTop: Constants.statusBarHeight + 30,
              borderRadius: 20,
              justifyContent: "space-around",
              flex: 1,
            }}
          >
            <View>
              <Text
                style={{
                  margin: 24,
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Enter the drop off location details
              </Text>
              <TextInput
                value={dropoffDisc}
                onChangeText={setDropoffDisc}
                placeholder={"Ex: Teiba Commercial Complex 2"}
                placeholderTextColor={"#c4c3d0"}
                //multiline={true}
                style={{
                  backgroundColor: "#7A62EF",
                  margin: 20,
                  //`height: "40%",
                  borderRadius: 20,
                  padding: 20,
                  color: "#fff",
                  fontSize: 20,
                }}
              ></TextInput>
            </View>
            <Button
            disabled={
               !dropoffDisc 
            }
              loadingProps={{ color: "#fff" }}
              title="Save"
              type="outline"
              buttonStyle={[
                {
                  borderColor: "#fff",
                  width: 250,
                  borderRadius: 10,
                  padding: 15,
                  marginBottom: 20,
                  alignSelf: "center",
                },
              ]}
              titleStyle={{ color: "#fff", fontSize: 22 }}
              onPress={() => {
                setToDiscVisiblity(false);
                //setPickupDisc()
              }}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate("UserMainScreen")}>
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/Back.png")}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: "Place a bid", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        value={new Date()}
        
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
        //minimumDate={new Date().addHours(1)}
      />

      <ScrollView contentContainerStyle={styles.body}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "400" }}>
            Do you wish to schedule a truck?
          </Text>
        </View>
        <View
          scrollEnabled={true}
          keyboardShouldPersistTaps={"always"}
          showsVerticalScrollIndicator={false}
          style={styles.innerBody}
        >
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View style={{ width: 100, marginLeft: 20 }}>
              <Image
                style={{ height: 100, width: 100 }}
                source={require("../../assets/Biding.png")}
              />
            </View>
            <View style={{ paddingTop: 0, flex: 1, marginHorizontal: 10 }}>
              <View>
                <Text style={{ color: "#fff", fontSize: 30 }}>Bid</Text>
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: "#CBD1D8", fontSize: normalize(15) }}>
                  Check different Booking rates and drivers' ratings
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 15 }}>
            <Text style={{ color: "#CBD1D8", fontSize: 16 }}>
              Choose your pick up and drop off locations
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 30,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{ width: 30, height: 14, marginRight: 10 }}
                  source={require("../../assets/circles.png")}
                />
              </View>
              <TouchableOpacity onPress={() => setFromMapVisibility(true)}>
                <Image
                  style={{ width: 80, height: 75, borderRadius: 20 }}
                  source={require("../../assets/Map.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{
                    width: 30,
                    height: 14,
                    marginRight: 10,
                    transform: [{ scaleX: -1 }],
                  }}
                  source={require("../../assets/circles.png")}
                />
              </View>
              <TouchableOpacity onPress={() => setToMapVisibility(true)}>
                <Image
                  style={{ width: 80, height: 75, borderRadius: 20 }}
                  source={require("../../assets/Map.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 30 }}>
            <View
              style={{
                width: "90%",
                borderWidth: 0.5,
                borderColor: "#CBD1D8",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  paddingHorizontal: 10,
                  backgroundColor: "#7A62EF",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: 33, width: 35, marginRight: 8 }}
                  source={require("../../assets/KmCount.png")}
                />

                <Text
                  style={{
                    color: "#FFF",
                    fontSize: 20,
                  }}
                >
                  57.13 KM
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 40,
              flexDirection: "row",
              ...(Platform.OS === "ios" ? { zIndex: 1000 } : null),
            }}
          >
            <Image
              style={{ height: 23, width: 25, marginHorizontal: 15 }}
              source={require("../../assets/box.png")}
            />
            <DropDownPicker
              onSelectItem={(item) => {
                setMoveType(item.label);
              }}
              listMode="SCROLLVIEW"
              zIndex={1000}
              zIndexInverse={3000}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: "#7A62EF",
                borderColor: "#fff",
                borderWidth: 0.5,
                borderRadius: 15,
              }}
              containerStyle={{
                alignItems: "center",
                width: "75%",
              }}
              textStyle={{
                color: "#FFF",
                fontSize: 20,
                fontWeight: "300",
                padding: 0,
              }}
              dropDownContainerStyle={{
                backgroundColor: "#7A62EF",
                borderColor: "#fff",
                borderWidth: 0.5,
                borderRadius: 15,
              }}
              ArrowDownIconComponent={() => <MyArrowDownIcon />}
              ArrowUpIconComponent={() => <MyArrowUpIcon />}
              TickIconComponent={() => <MyTickIcon />}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ height: 23, width: 25, marginHorizontal: 15 }}
              source={require("../../assets/calender.png")}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={showDatePicker}
              style={{
                backgroundColor: "#7040F6",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "#fff",
                  paddingVertical: 12,
                  paddingHorizontal: 15,

                  fontWeight: "200",
                  letterSpacing: 3,
                }}
              >
                {date}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ height: 25, width: 25, marginHorizontal: 15 }}
              source={require("../../assets/clock.png")}
            />
            <TouchableWithoutFeedback onPress={showTimePicker}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    backgroundColor: "#7040F6",
                    borderRadius: 15,
                    fontSize: 22,
                    color: "#fff",
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    overflow: "hidden",
                    fontWeight: "200",
                    letterSpacing: 3,
                  }}
                >
                  {timeHour}
                </Text>
                <Text
                  style={{
                    backgroundColor: "#7040F6",
                    borderRadius: 15,
                    fontSize: 22,
                    color: "#fff",
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    overflow: "hidden",
                    fontWeight: "200",
                    letterSpacing: 3,
                    marginLeft: 7,
                  }}
                >
                  {timeMin}
                </Text>
                <Text
                  style={{
                    backgroundColor: "#7040F6",
                    borderRadius: 15,
                    fontSize: 22,
                    color: "#fff",
                    paddingVertical: 12,
                    paddingHorizontal: 15,
                    overflow: "hidden",
                    fontWeight: "200",
                    letterSpacing: 3,
                    marginLeft: 7,
                  }}
                >
                  {timePmAm}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Image
              style={{ height: 23, width: 25, marginHorizontal: 15 }}
              source={require("../../assets/label.png")}
            />
            <TouchableOpacity
              onPress={() => setPrice((price) => price - 1)}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#7040F6",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 30 }}>-</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                color: "#FFF",
                fontWeight: "200",
                marginLeft: 10,
                marginRight: 10,
                width: 100,

                textAlign: "center",
              }}
            >
              {price} JOD
            </Text>
            <TouchableOpacity
              onPress={() => setPrice((price) => price + 1)}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#7040F6",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 20 }}>+</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: "20%",
              marginTop: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* PickupLatitude: pickup.latitude,
        PickupLongitude: pickup.longitude,
        DropOffLatitude: dropoff.latitude,
        DropOffLongitude: dropoff.longitude,
        StartTime: g,
        PickupDescription: pickupDisc,
        DropOffDescription: dropoffDisc,
        MoveType: moveType, startDate + " " + startTime */}
              <Button
                disabled={
                  !pickupDisc || !dropoffDisc || !startDate || !startTime
                }
                //disabled={!(startDate)}
                loadingProps={{ color: "#fff" }}
                title="Continue"
                type="outline"
                buttonStyle={[
                  {
                    borderColor: "#fff",
                    width: 250,
                    borderRadius: 10,
                    padding: 15,
                    marginBottom: 20,
                  },
                ]}
                titleStyle={{ color: "#fff", fontSize: 22 }}
                onPress={() => {
                  AddBid();
                  navigation.navigate("UserMainScreen");
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  body: {
    // flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#7040F6",
    alignItems: "center",
    padding: 20,
    flexGrow: 1,
  },
  innerBody: {
    flex: 1,
    marginTop: 25,
    borderRadius: 40,
    backgroundColor: "#7A62EF",
    width: "100%",
  },
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
