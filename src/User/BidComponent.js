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
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function BidComponent({
    id,
    moveType='Home Furniture',
    date ='12.23.5644',
    time = '05:00 Pm',
    price='70 JOD',
    kmCount = '55.32 Km',
    latitude,
    longitude,
  }){
return(
<View style={{ flex: 1 }}>
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
                      backgroundColor: "#7A62EF",
                    }}
                  >
                    <Image
                      style={{ width: 30, aspectRatio: 1.1, marginRight: 10 }}
                      source={require("../../assets/KmCount.png")}
                    />
                    <Text style={{ fontWeight: "500", color: "#fff" }}>
                      {kmCount}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "60%" }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        {moveType}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        {date}
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        {time}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        {price}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "40%",
                      backgroundColor: "#7A62EF",
                      borderRadius: 15,
                      justifyContent:'flex-end'
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "center",
                        color: "#fff",
                        padding: 10,
                        fontSize: 20,
                        justifyContent:'flex-start'
                      }}
                    >
                      3 Offers
                    </Text>
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        justifyContent:'flex-start',
                        backgroundColor: "#7040F6",
                        padding: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "#fff" }}>View Offers</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          )
}

const styles = StyleSheet.create({
    heading: {
      color: "#000",
      fontSize: 35,
      fontWeight: "400",
    },
  });
  