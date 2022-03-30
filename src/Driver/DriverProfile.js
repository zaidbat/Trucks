import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Icon, Badge } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Bid from "./BidComponent";
import { AuthContext } from "../Shared/Utils";
import * as SecureStore from "expo-secure-store";
import trucksApi from "../Shared/trucksApi";

const DriverProfile = ({ navigation }) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const { signOut } = React.useContext(AuthContext);

  const [refreshing, setRefreshing] = React.useState(false);
  const [profile, setProfile] = React.useState({});
  const [Bids, setBids] = React.useState([]);
  const [doFetch, setDoFetch] = React.useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

  React.useEffect(async () => {
    if (doFetch) {
      let token = await SecureStore.getItemAsync("token");
      setDoFetch(false);
      await trucksApi
        .get("Driver/GetProfile", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setProfile(response.data.info);
          setBids(response.data.bids);
          console.log("called api");
          setDoFetch(true);
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
            onPress={() =>
              Alert.alert("Are you sure you want to log out?", "", [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                { text: "OK", onPress: () => signOut() },
              ])
            }
          >
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/LogOut.png")}
            />
          </TouchableOpacity>
        }
        centerComponent={{ text: "Pofile", style: styles.heading }}
        containerStyle={{ backgroundColor: "#fff" }}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DriverOrders");
            }}
          >
            <Image
              style={{ height: 55, width: 55 }}
              source={require("../../assets/Orders.png")}
            />
            {/* <Badge
              status="success"
              value={10}
              containerStyle={{ position: 'absolute', top: 0, right: 0 }}
            /> */}
          </TouchableOpacity>
        }
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
              backgroundColor: "#64BF46",
              borderRadius: 20,
              padding: 20,
              paddingTop: 30,
              marginTop: 40,
              borderWidth: 5,
              borderColor: "#6ECC4C",
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
                  {profile.phoneNumber}
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
                  {profile.fullName}
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
                      {profile.vehicleCode} - {profile.vehicleNo}
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
                        width: "100%",
                      }}
                    >
                      {profile.truckType}
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
                  {/* <Image
                    style={{
                      width: 36,
                      height: 36,
                      alignSelf: "flex-end",
                      position: "absolute",
                      top: -20,
                      right: -10,
                    }}
                    source={require("../../assets/ImportImage.png")}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <FlatList
            data={Bids}
            renderItem={({ item }) => <Bid data={item}></Bid>}
          />
        </KeyboardAwareScrollView>
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

export default DriverProfile;
