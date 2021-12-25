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
import Bid from "../User/BidComponent";
export default function UserMainScreen() {

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

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <Image
            style={{ height: 55, width: 55 }}
            source={require("../../assets/menu.png")}
          />
        }
        centerComponent={{ text: "Bids", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#7040F6",
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          padding: 30,
          paddingTop: 10,
          paddingBottom: 0,
        }}
      >
        {DATA.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "300", fontSize: 30, color: "#fff" }}>
              No Bids Yet!
            </Text>
          </View>
        ) : (
            <FlatList
            
            showsVerticalScrollIndicator={false}
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
        )}

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#7A62EF",
            marginVertical: 25,
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 25, color: "#fff" }}>Add Bid</Text>
        </TouchableOpacity>
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
