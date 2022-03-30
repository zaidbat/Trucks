import * as React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./src/Shared/Utils";
import * as SecureStore from "expo-secure-store";
import {
  UserPhoneNumber,
  DriverProfile,
  DriverPhoneNumber,
  UserRegister,
  RegisterDriver,
  SharedEntryPage,
  UserMainScreen,
  OffersOnBid,
  PlaceBid,
  UserOrders,
  DriverOrders
} from "./src/Shared/index";
import trucksApi from "./src/Shared/trucksApi";


const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={SharedEntryPage} />
      <Stack.Screen name="DriverPhoneNumber" component={DriverPhoneNumber} />
      <Stack.Screen name="UserPhoneNumber" component={UserPhoneNumber} />
      

    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserMainScreen" component={UserMainScreen} />
      <Stack.Screen name="PlaceBid" component={PlaceBid} />
      <Stack.Screen name="OffersOnBid" component={OffersOnBid} />
      <Stack.Screen name="UserOrders" component={UserOrders} />
    </Stack.Navigator>
  );
}

function DriverStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DriverProfile" component={DriverProfile} />
      <Stack.Screen name="DriverOrders" component={DriverOrders} />
    </Stack.Navigator>
  );
}
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function App({ navigation }) {
  LogBox.ignoreAllLogs(true);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            userType: action.userType,
            isRegistered: action.isRegistered,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userType: action.userType,
            isRegistered: action.isRegistered,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userType: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userType;
      let IsRegistered = false;
      let url = "";
      try {
        userToken = await SecureStore.getItemAsync("token");
        userType = await SecureStore.getItemAsync("userType");
        url = userType == "driver" ? "driver/IsRegistered" : "customer/IsRegistered"
        await trucksApi
          .get(url, {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          })
          .then((res) => {
            if (res.data.status == 1) {
              IsRegistered = true;
            }
          });
        //alert(userType + "****" + userToken);
      } catch (e) {
        console.log(e);
      }

      dispatch({
        type: "RESTORE_TOKEN",
        token: userToken,
        userType,
        isRegistered: IsRegistered,
      });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        save("token", data.token);
        save("userType", data.userType);
        // alert(
        //   "hiiii *** " +
        //     data.userType +
        //     "***" +
        //     data.isRegistered +
        //     "***" +
        //     data.token
        // );
        dispatch({
          type: "SIGN_IN",
          token: data.token,
          userType: data.userType,
          isRegistered: data.isRegistered,
        });
      },
      signOut: () => {
        SecureStore.deleteItemAsync("userType");
        SecureStore.deleteItemAsync("token");
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <LoginStack />
        ) : state.isRegistered ? (
          state.userType == "driver" ? (
            <DriverStack />
          ) : (
            <UserStack />
          )
        ) : state.userType == "driver" ? (
          <RegisterDriver />
        ) : (
          <UserRegister />
        )}
        {/* <OffersOnBid/> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
