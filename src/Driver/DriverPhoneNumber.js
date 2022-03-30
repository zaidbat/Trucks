import React, { useRef, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import styles from "../Shared/PhoneNumberStyle.js";
import { Button } from "react-native-elements";
import trucksApi from "../Shared/trucksApi.js";
import { AuthContext } from "../Shared/Utils.js";

const DriverPhoneNumber = () => {
  const { signIn } = React.useContext(AuthContext);

  const [phoneApiLoading, setPhoneApiLoading] = useState(false);
  const [codeApiLoading, setCodeApiLoading] = useState(false);

  const [codeErrorMessage, setCodeErrorMessage] = useState("");
  const CELL_COUNT = 9;
  const CODE_CELL_COUNT = 4;
  const lastNameRef = useRef();
  const [value, setValue] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [modalVisable, setModalVisable] = useState(false);
  const sendPhoneNo = () => {
    setPhoneApiLoading(true);

    trucksApi
    .post("driver/login", {
      phonenumber: phoneNumber,
    })
    .then((dataResult) => {
      if (dataResult.data.status == 1) {
        setTimeout(() => {
          setModalVisable(true);
          setPhoneApiLoading(false);
        }, 500);

        console.log(dataResult.data);
      } else {
        alert(dataResult.data.message);
      }
    });
  };

  const SendCodeNo = () => {
    console.log("codeNumber: " + code);
    setCodeErrorMessage("");
    setCodeApiLoading(true);
    trucksApi
      .post("driver/login", {
        phonenumber: phoneNumber,
        code: code,
      })
      .then((dataResult) => {
        if (dataResult.data.status == 1) {
          setTimeout(() => {
            let userType = "driver";
            let isRegistered = dataResult.data.isRegistered;
            let token = dataResult.data.token;
            setCodeApiLoading(false);
            signIn({ userType, isRegistered, token });
          }, 500);
        } else {
          setCodeApiLoading(false);
          setCodeErrorMessage("Wrong Code");
        }
      });
  };
  return (
    <View style={{ backgroundColor: "#27323F", flex: 1 }}>
      <SafeAreaView
        style={{ backgroundColor: "#27323F", height: 120 }}
      ></SafeAreaView>
      <View
        style={{ alignItems: "center", zIndex: 10, justifyContent: "center" }}
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
      <View
        style={{
          backgroundColor: "#152023",
          flex: 1,
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          justifyContent: "space-around",
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View>
            <Text style={{ color: "white", fontSize: 25 }}>
              Enter your mobile number
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: 30,
                width: 30,
              }}
              source={require("../../assets/jordan.png")}
            ></Image>
            <Text style={{ color: "#fff", fontSize: 25 }}> +962 </Text>
            <View>
              <CodeField
                autoFocus
                ref={ref}
                {...props}
                value={value}
                onChangeText={(value) => {
                  setValue(value);
                  setPhoneNumber(value);
                }}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}
                  >
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            disabled={phoneNumber.length != 9}
            loadingProps={{ color: "#fff" }}
            loading={phoneApiLoading}
            onPress={(value) => {
              sendPhoneNo();
            }}
            title="Continue"
            type="outline"
            buttonStyle={{
              borderColor: "#fff",
              width: 250,
              borderRadius: 10,
              padding: 15,
            }}
            titleStyle={{ color: "#fff", fontSize: 22 }}
          />
        </View>

        <Modal visible={modalVisable} transparent={true} animationType="slide">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000000CC",
            }}
          >
            <View
              style={{
                backgroundColor: "#64BF46",
                width: "80%",
                height: 350,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 30 }}>
                Verification Code
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                  paddingHorizontal: 20,
                  textAlign: "center",
                  fontWeight: "200",
                }}
              >
                Please enter the verfication code sent to you via SMS
              </Text>
              <Text style={{ color: "#FF5677" }}>{codeErrorMessage}</Text>
              <CodeField
                textContentType="oneTimeCode"
                autoFocus={true}
                {...props}
                value={code}
                onChangeText={(text) => {
                  // if (code.length == 3) {
                  //   Keyboard.dismiss();
                  // }
                  setCode(text);
                }}
                cellCount={CODE_CELL_COUNT}
                rootStyle={[styles.codeFieldRoot, { width: 100 }]}
                keyboardType="number-pad"
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cellRoot, isFocused && styles.focusCell]}
                  >
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              <Button
                disabled={code.length != 4}
                loadingProps={{ color: "#fff" }}
                loading={codeApiLoading}
                onPress={(value) => {
                  Keyboard.dismiss();
                  SendCodeNo();
                }}
                title="Submit Code"
                type="outline"
                buttonStyle={{
                  borderColor: "#fff",
                  width: 200,
                  borderRadius: 10,
                  padding: 15,
                }}
                titleStyle={{ color: "#fff", fontSize: 22 }}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};

export default DriverPhoneNumber;
