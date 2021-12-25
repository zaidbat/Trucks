import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DriverPhoneNumber from "./src/Driver/DriverProfile";

export default function App() {
  return (
    <NavigationContainer>
      <DriverPhoneNumber />
    </NavigationContainer>
  );
}
