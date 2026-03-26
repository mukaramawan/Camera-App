import React from 'react';
import { View, Text } from 'react-native';
import { Link, useLocalSearchParams, Stack } from 'expo-router';

export default function HomeScreen() {

    const {image} =useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen options={{title: `Image ${image}`}} />
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Image Detailed Screen: {image}</Text>
        <Link href={'/'}>Home</Link>      
    </View>
  );
}