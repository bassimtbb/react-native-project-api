import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={{ title: "Disney Characters" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Character Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}