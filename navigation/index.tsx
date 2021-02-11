import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ColorSchemeName } from "react-native";
import GameScreen from "../screens/GameScreen";
import LandingScreen from "../screens/LandingScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { shadowColor: "transparent" },
      }}>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerTitle: () => null }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerTitle: () => null }}
      />
    </Stack.Navigator>
  );
}
