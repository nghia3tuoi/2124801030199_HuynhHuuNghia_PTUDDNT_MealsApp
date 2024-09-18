import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Colors from "../utils/color";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SettingsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width:100, height:50, backgroundColor: "#ff9f34", borderRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
       <Text style={{fontSize: 16, color: Colors.white, fontWeight:'bold'}}>Thoát</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
