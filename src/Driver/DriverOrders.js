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
import {
  Header,
  Badge,
  Icon,
  withBadge,
  PressableProps,
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Order from "../Driver/OrderComponent";
import trucksApi from "../Shared/trucksApi";
import * as SecureStore from "expo-secure-store";

const DriverOrders = ({ navigation }) => {
  const [Bids, setBids] = React.useState([]);
  const [doFetch, setDoFetch] = React.useState(true);
  const [orderCount, setOrderCount] = React.useState(true);

  const renderItem = ({ item }) => (
    <Order data={item} navigation={navigation}></Order>
  );

  React.useEffect(async () => {
    if (doFetch) {
      let token = await SecureStore.getItemAsync("token");
      setDoFetch(false);

      await trucksApi
        .get("driver/MyActiveOrders", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          //console.log(response.data);
          setBids(response.data);
          setDoFetch(true);
          //console.log("bb");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/Back.png")}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: "Orders", style: styles.heading }}
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
          paddingBottom: 0,
        }}
      >
        {Bids.length == 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontWeight: "300", fontSize: 30, color: "#fff" }}>
              No Orders Yet!
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Bids}
            renderItem={renderItem}
          />
        )}

        
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
export default DriverOrders;
