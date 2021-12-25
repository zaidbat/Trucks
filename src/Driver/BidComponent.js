import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-gesture-handler";

export default function Bid({
  id,
  moveType,
  date,
  time,
  price,
  kmCount,
  latitude,
  longitude,
}) {
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
          }}
        >
          <TouchableOpacity
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
              backgroundColor: "#6ECC4C",
            }}
          >
            <Image
              style={{ width: 30, aspectRatio: 1.1, marginRight: 10 }}
              source={require("../../assets/KmCount.png")}
            />
            <Text style={{ fontWeight: "500", color: "#282828" }}>
              {kmCount}
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
                  color: "#282828",
                }}
              >
                {moveType}
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
                {date}
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
                {time}
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
                {price}
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
