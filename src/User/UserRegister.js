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
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../Shared/Utils";
import trucksApi from "../Shared/trucksApi";
const UserRegister = () => {
  const { signIn } = React.useContext(AuthContext);
  const { signOut } = React.useContext(AuthContext);
  const lastNameRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [continueLoading, setContinueLoading] = useState(false);
  const register = async () => {
    setContinueLoading(true);
    let token = await SecureStore.getItemAsync("token");
    trucksApi
      .post("customer/UpdateInfo", {
        firstName,
        lastName,
      }, {headers:  {
        Authorization: "Bearer " + token,
      }})
      .then((dataResult) => {
        if (dataResult.data.status == 1) {
          setTimeout(() => {
            setContinueLoading(false);
            signIn({ isRegistered: true, token: token, userType: "user" });
          }, 500);

          console.log(dataResult.data);
        } else {
          alert(dataResult.data.message);
        }
      }).catch(function (error) {
        console.log(error);
        setContinueLoading(true);
      })
  };

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
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.fieldsContainer}
          >
            <View>
              <View style={{ flex: 1, justifyContent: "space-around" }}>
                <View style={styles.fieldBoxFullWidth}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      lastNameRef.current.focus();
                    }}
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor={"#fff"}
                    onChangeText={setFirstName}
                    value={firstName}
                  />
                  <TextInput
                    ref={lastNameRef}
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor={"#FFF"}
                    onChangeText={setLastName}
                    value={lastName}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "flex-start",
              flex: 4,
              alignItems: "center",
            }}
          >
            <Button
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
              loading={continueLoading}
              onPress={register}
            />
            <TouchableOpacity style={{ marginTop: 20 }} onPress={()=>signOut()}>
              <Text
                style={{ color: "#F4B63F", fontSize: 20, fontWeight: "300" }}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
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
    justifyContent: "center",
    flex: 10,
    padding: 35,
  },
  fieldBoxFullWidth: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 25,
    fontWeight: "200",
    color: "white",
    paddingBottom: 20,
    width: "45%",
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#C9CBCE",
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
export default UserRegister;
