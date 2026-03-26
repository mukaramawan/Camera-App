import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Home Screen</Text>

    <Link href={"/image-1"}>Image 1</Link>
    <Link href={"/image-2"}>Image 2</Link>

      <Link href={"/camera"} asChild>
        <Pressable style={styles.cameraButton}>
          <FontAwesome5 name="camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    backgroundColor: "royalblue",
    padding: 10,
    borderRadius: 50,
    bottom: 10,
    position: "absolute",
    right: 10,
  },
});
