import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import NewNote from "../screens/NewNote";
import UpdateNote from "../screens/UpdateNote";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === "android" ? "white" : "white",
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? "#F6973D" : "#F6973D",
          },
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Doggo",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="NewNote"
          component={NewNote}
          options={{
            title: "New Post",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="UpdateNote"
          component={UpdateNote}
          options={{
            title: "Update Post",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
