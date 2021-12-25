import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

export default function RegisterUser({ navigation }) {
  const [name, setName] = useState("");

  const spaceHandler = (text) => {
    setName(text.replace(/\s/g, ""));
  };

  

  return (
    
    <View style={styles.content}>
      <View style={styles.header}></View>
      <View style={styles.locationImageContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            paddingHorizontal: 15,
            paddingVertical: 25,
            bottom: -40,
            backgroundColor: "#27323F",
            borderRadius: 50,
          }}
        >
          <Image
            style={styles.locationImage}
            source={require("../../assets/location.png")}
          />
        </View>
      </View>
      
      <View
        
        style={styles.body}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View style={styles.heading}>
            <Text style={styles.headingText}>Book a Truck!</Text>
          </View>
          <View style={styles.splitContainer}>
            <View style={styles.fieldBox}>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor={"#FFF"}
                returnKeyType="next"
                
              />
            </View>
            <View style={styles.fieldBox}>
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor={"#FFF"}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('PlaceBid')}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#27323F" },
  header: {
    flex: 1,

    backgroundColor: "#27323F",
  },
  body: {
    flex: 6,
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 1,
    backgroundColor: "#152023",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingTop: 30,
  },
  locationImage: {
    width: 55,
    height: 80,
  },
  locationImageContainer: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  splitContainer: {
    flexDirection: "row",
    //marginTop: -100,
    paddingHorizontal: 20,
    
  },
  fieldBox: {
    width: "50%",
    height: 50,
  },
  input: {
    fontSize: 25,
    fontWeight: "200",
    color: "white",
    borderBottomWidth: 1,
    borderColor: "#C9CBCE",
    marginHorizontal: 20,
    paddingBottom: 13,
  },
  headingText: {
    color: "white",
    fontSize: 35,
  },
  heading: {
    //marginTop: 100,
  },
  button: {
    backgroundColor: "transparent",
    padding: 10,
    borderColor: "#FFF",
    borderWidth: 0.75,
    height: 55,
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
    width: 250,
    flex: 1,
    justifyContent: "center",
  },
});
