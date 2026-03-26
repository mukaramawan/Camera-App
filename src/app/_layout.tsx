import React from "react";
import { View } from "react-native";
import { Slot, Stack, Tabs } from "expo-router";


export default function rootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </View>
  );
}
