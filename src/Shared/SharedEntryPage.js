import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const SharedEntryPage = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <SafeAreaView
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View style={{ flex: 1 }}></View>
          <Image
            style={styles.truckImage}
            source={require("../../assets/aTruck.png")}
          />
          <View style={{ flex: 3 }}></View>
        </SafeAreaView>
      </View>
      <View style={styles.locationImageContainer}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            paddingHorizontal: 15,
            paddingBottom: 20,
            bottom: -33,
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
      <View style={styles.body}>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 25, fontWeight: "300" }}>
            On Demand Delivery
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 50, fontWeight: "400" }}>
            Truck Booking
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 25, fontWeight: "300" }}>
            for moving furniture and goods
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("UserPhoneNumber")}
          >
            <View>
              <Text style={styles.buttonText}>Book Now!</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text style={{ color: "#8292A3", fontSize: 25, fontWeight: "300" }}>
            Are you a truck driver?
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("DriverPhoneNumber")}>
            <Text style={{ color: "#F4B63F", fontSize: 20, fontWeight: "300" }}>
              Enter Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, backgroundColor: "#27323F" },
  header: {
    flex: 9,

    backgroundColor: "#27323F",
  },
  body: {
    flex: 11,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#152023",
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    paddingTop: 40,
  },
  locationImage: {
    width: 40,
    height: 57,
  },
  locationImageContainer: {
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
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
    width: 250,
  },
  buttonText: {
    fontSize: 25,
    color: "#FFF",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
  },
  truckImage: {
    flex: 10,
    aspectRatio: 1.5,
    resizeMode: "contain",
  },
});
export default SharedEntryPage;
