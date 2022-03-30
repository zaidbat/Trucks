import React, { useState, useRef } from "react";
import Constants from "expo-constants";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
 
} from "react-native";
import { Button } from "react-native-elements";
import trucksApi from "../Shared/trucksApi";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../Shared/Utils";

const RegisterDriver = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const register = async () => {
    //setContinueLoading(true);
    let token = await SecureStore.getItemAsync("token");
    
    trucksApi
      .post(
        "driver/UpdateInfo",
        {
          fullname: name,
          trucktype: truckName,
          vehiclecode: parseInt(vehicleCode),
          vehicleno: parseInt(vehicleNo),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((dataResult) => {
        console.log(dataResult.data);
        if (dataResult.data.status == 1) {
          setTimeout(() => {
            //setContinueLoading(false);
            signIn({ isRegistered: true, token: token, userType: "driver" });
          }, 500);

          console.log(dataResult.data);
        } else {
          alert(dataResult.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        //setContinueLoading(true);
      });
  };

  const plateCodeRef = useRef();
  const plateNoRef = useRef();

  const [name, setName] = useState("");
  const [selectTruck, setSelectTruck] = useState("");
  const [truckName, setTruckName] = useState("");
  const [state, setState] = useState({ key: 0 });
  const [plateHolder, setPlateHolder] = useState("");
  const [vehicleCode, setVehicleCode] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");

  var trucks = [
    {
      key: 1,
      name: "Truck Van",
      url: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639141764/we/truck1_vhqlsq.png",
    },
    {
      key: 2,
      name: "Truck Big",
      url: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639141764/we/truck2_wulyv7.png",
    },
    {
      key: 3,
      name: "Truck Small",
      url: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639141764/we/truck4_jjlwge.png",
    },
    {
      key: 4,
      name: "Truck Medium",
      url: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639141764/we/truck3_q7oail.png",
    },
    {
      key: 5,
      name: "Truck Super",
      url: "https://res.cloudinary.com/dxdrfzvvo/image/upload/v1639141764/we/truck5_fa0rv1.png",
    },
  ];
  //LogBox.ignoreAllLogs(true);
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <View
          style={{
            alignItems: "center",
            zIndex: 10,
            justifyContent: "center",
            paddingTop: Constants.statusBarHeight,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 10,
              paddingBottom: 25,
              backgroundColor: "#27323F",
              position: "absolute",
              bottom: -30,
              borderRadius: 40,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 57,
              }}
              source={require("../../assets/location.png")}
            ></Image>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Set up your profile</Text>
          </View>
          <View style={styles.fieldsContainer}>
            <TouchableWithoutFeedback>
              <View style={{ flex: 1, justifyContent: "space-around" }}>
                <View style={styles.fieldBoxFullWidth}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      plateCodeRef.current.focus();
                    }}
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={"#FFF"}
                    textContentType="name"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.fieldBoxFullWidth}>
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <View style={{ marginRight: 15 }}>
                        <Text style={styles.inputTitle}>Plate No. </Text>
                      </View>
                      <TextInput
                        ref={plateCodeRef}
                        maxLength={2}
                        value={vehicleCode}
                        onChangeText={(text) => {
                          setVehicleCode(text);
                          if (text.length === 2) {
                            plateNoRef.current.focus();
                          }
                        }}
                        placeholder={"23"}
                        placeholderTextColor={"#808080"}
                        style={[styles.input, { letterSpacing: 2, width: 40 }]}
                        keyboardType="numeric"
                      />
                      <Text style={{ color: "#fff", fontSize: 25 }}>- </Text>
                      <TextInput
                        ref={plateNoRef}
                        keyboardType="numeric"
                        maxLength={5}
                        value={vehicleNo}
                        onChangeText={(text) => {
                          setVehicleNo(text);
                          if (text.length === 0) {
                            plateCodeRef.current.focus();
                          }
                          if (text.length === 5) {
                            Keyboard.dismiss();
                          }
                        }}
                        placeholder={"13292"}
                        placeholderTextColor={"#808080"}
                        style={[styles.input, { letterSpacing: 2, width: 200 }]}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.fieldBoxFullWidth}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      paddingBottom: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ marginRight: 15 }}>
                        <Text style={styles.inputTitle}>Truck Type</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        editable={false}
                        style={styles.innerInput}
                        placeholder="Choice"
                        value={truckName}
                        onChangeText={(text) => {
                          setTruckName(text);
                        }}
                        placeholderTextColor={"#FFF"}
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.fieldBoxFullWidth, { borderBottomWidth: 0 }]}
                >
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "flex-end" }}
                    >
                      {(() => {
                        var trucksButtons = [];
                        for (let index = 0; index < trucks.length; index++) {
                          trucksButtons.push(
                            <TouchableOpacity
                              activeOpacity={0.8}
                              style={
                                state.key === trucks[index].key
                                  ? styles.truck
                                  : styles.truckActive
                              }
                              onPress={() => {
                                setState({ key: trucks[index].key });
                                setTruckName(trucks[index].name);
                              }}
                            >
                              <View style={{ width: "90%", height: "90%" }}>
                                <Image
                                  style={{ width: "100%", height: "100%" }}
                                  source={{ uri: trucks[index].url }}
                                />
                              </View>
                            </TouchableOpacity>
                          );
                        }
                        return trucksButtons;
                      })()}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Button
              disabled={!name || !vehicleCode || !vehicleNo || !truckName}
              loadingProps={{ color: "#fff" }}
              title="Continue"
              type="outline"
              buttonStyle={{
                borderColor: "#fff",
                width: 250,
                borderRadius: 10,
                padding: 15,
              }}
              titleStyle={{ color: "#fff", fontSize: 22 }}
              onPress={register}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    height: "100%",
    backgroundColor: "#27323F",
    paddingTop: Constants.statusBarHeight + 20,
  },

  body: {
    backgroundColor: "#152023",
    flex: 10,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    justifyContent: "space-evenly",
  },

  fieldsContainer: {
    width: "100%",
    justifyContent: "space-around",
    flex: 10,
    padding: 35,
  },
  fieldBoxFullWidth: {
    borderBottomWidth: 1,
    borderColor: "#C9CBCE",
  },
  input: {
    fontSize: 25,
    fontWeight: "200",
    color: "white",
    //borderWidth: 2,
    paddingBottom: 20,
  },
  innerInput: {
    fontSize: 20,
    fontWeight: "200",
    color: "white",
    width: "75%",
  },
  heading: {
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 2,
  },
  headingText: {
    color: "white",
    fontSize: 35,
  },
  inputTitle: {
    fontSize: 25,
    color: "#FFF",
  },
  truck: {
    borderWidth: 2,
    borderColor: "yellow",
    width: 65,
    height: 65,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  truckActive: {
    borderWidth: 1,
    borderColor: "#FFF",
    width: 65,
    height: 65,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});
export default RegisterDriver;
