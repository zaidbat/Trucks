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
  Alert
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Icon, withBadge } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../Shared/Utils";
import Bid from "../User/BidComponent";
import trucksApi from "../Shared/trucksApi";
import * as SecureStore from "expo-secure-store";

const UserMainScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
  const [Bids, setBids] = React.useState([]);
  const [doFetch, setDoFetch] = React.useState(true);
  const [orderCount, setOrderCount] = React.useState(true);

  const renderItem = ({ item }) => (
    <Bid data={item} navigation={navigation}></Bid>
  );
  const BadgedIcon = withBadge(24)(Icon);

  React.useEffect(async () => {
    if (doFetch) {
      let token = await SecureStore.getItemAsync("token");
      setDoFetch(false);

      await trucksApi
        .get("customer/GetMyPendingBids", {
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
          <TouchableOpacity onPress={
            ()=>Alert.alert(
              "Are you sure you want to log out?",
              "",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                { text: "OK", onPress: () => signOut() }
              ]
            )
          }>
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/LogOut.png")}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: "Bids", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserOrders");
            }}
          >
            
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/Orders.png")}
            />
          </TouchableOpacity>
        }
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
        {Bids.length == 0 ? (
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
            data={Bids}
            renderItem={renderItem}
          />
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate("PlaceBid")}
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
};

const styles = StyleSheet.create({
  heading: {
    color: "#000",
    fontSize: 35,
    fontWeight: "400",
  },
});
export default UserMainScreen;
