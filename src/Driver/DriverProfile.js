import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Bid from "./BidComponent";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function DriverProfile() {
  const DATA = [
    {
      id: "1",
      moveType: "Home Furiture",
      date: "26.12.2021",
      time: "04:00 PM",
      price: "30 JOD",
      kmCount: "40.5 Km",
      latitude: "43.6552",
      longitude: "86.9876",
    },
    {
      id: "2",
      moveType: "Home Furiture2",
      date: "26.12.2021",
      time: "04:00 PM",
      price: "30 JOD",
      kmCount: "40.5 Km",
      latitude: "43.6552",
      longitude: "86.9876",
    },
    {
      id: "3",
      moveType: "Home Furiture3",
      date: "26.12.2021",
      time: "04:00 PM",
      price: "30 JOD",
      kmCount: "40.5 Km",
      latitude: "43.6552",
      longitude: "86.9876",
    },
  ];

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <Image
            style={{ height: 55, width: 55 }}
            source={require("../../assets/menu.png")}
          />
        }
        centerComponent={{ text: "Pofile", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#64BF46",
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          padding: 30,
          paddingTop: 10,
          paddingBottom: 20,
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
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
                  padding: 10,
                  position: "absolute",
                  top: -65,
                  backgroundColor: "#6ECC4C",
                  borderRadius: 50,
                  borderWidth: 6,
                  borderColor: "#64BF46",
                }}
              >
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/profile.png")}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={{ width: 30, height: 30, marginRight: 20 }}
                  source={require("../../assets/phone.png")}
                />
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "#282828" }}
                >
                  0799460528
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <View>
                <Image
                  style={{ width: 30, height: 30, marginRight: 20 }}
                  source={require("../../assets/profile.png")}
                />
              </View>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", color: "#282828" }}
                >
                  Zaid essam albataineh
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "95%",
                borderTopWidth: 1,
                alignSelf: "center",
                marginVertical: 20,
                borderColor: "#fff",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ width: "70%" }}>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Image
                      style={{ width: 36, height: 45, marginRight: 20 }}
                      source={require("../../assets/PlateNo.png")}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        paddingBottom: 5,
                      }}
                    >
                      Plate No.
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#282828",
                      }}
                    >
                      25 - 36764
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View>
                    <Image
                      style={{ width: 36, height: 36, marginRight: 20 }}
                      source={require("../../assets/truck.png")}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        paddingBottom: 5,

                        alignSelf: "flex-start",
                      }}
                    >
                      Type / Capacity
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "400",
                        color: "#282828",
                        width: "70%",
                      }}
                    >
                      Box - truck up to 350 kg
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ width: "30%" }}>
                <Image
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#64BF46",
                  }}
                  source={{
                    uri: "https://visor.ph/wp-content/uploads/2020/12/suzuki-carry-van-main2.jpg",
                  }}
                />
                <TouchableOpacity>
                  <Image
                    style={{
                      width: 36,
                      height: 36,
                      alignSelf: "flex-end",
                      position: "absolute",
                      top: -20,
                      right: -10,
                    }}
                    source={require("../../assets/ImportImage.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Bid
                time={item.time}
                date={item.date}
                moveType={item.moveType}
                price={item.price}
                id={item.id}
                kmCount={item.kmCount}
              ></Bid>
            )}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
