import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import HomeScreen from "./app/screens/HomeScreen";
import FavoritesScreen from "./app/screens/FavoritesScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "./app/utils/color";
import MealInfo from "./app/stacks/MealInfo";
import { Provider } from "react-redux";
import store from "./app/store/CreateStore";

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTintColor: "#fff", // Màu văn bản của tiêu đề
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealInfo"
        component={MealInfo}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      labeled={false}
      barStyle={{ backgroundColor: Colors.header }}
      activeColor={Colors.grey}
      inactiveColor={Colors.greyDark}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="home" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="star" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons
              size={26}
              name="settings"
              style={{ color: "#ffae50" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function FavoriteTabs() {
  return (
    <Tab.Navigator
      initialRouteName="FavoritesTab"
      labeled={false}
      barStyle={{ backgroundColor: Colors.header }}
      activeColor={Colors.grey}
      inactiveColor={Colors.greyDark}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="home" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="star" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons
              size={26}
              name="settings"
              style={{ color: "#ffae50" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function SettingTabs() {
  return (
    <Tab.Navigator
      initialRouteName="SettingsTab"
      labeled={false}
      barStyle={{ backgroundColor: Colors.header }}
      activeColor={Colors.grey}
      inactiveColor={Colors.greyDark}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="home" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="star" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: (tintColor: any) => (
            <MaterialIcons
              size={26}
              name="settings"
              style={{ color: "#ffae50" }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.header, // Màu nền của header
        },
        headerTintColor: "#fff", // Màu văn bản của tiêu đề
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          drawerIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="home" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoriteTabs}
        options={{
          drawerIcon: (tintColor: any) => (
            <MaterialIcons size={26} name="star" style={{ color: "#ffae50" }} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingTabs}
        options={{
          drawerIcon: (tintColor: any) => (
            <MaterialIcons
              size={26}
              name="settings"
              style={{ color: "#ffae50" }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
