import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Pressable, Image } from "react-native";
import { router } from "expo-router";
import {
  Camera,
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [picture, setPicture] = useState<CameraCapturedPicture | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission || !permission.granted) {
    return <ActivityIndicator size="large" color="royalblue" />;
  }

  const handleFlip = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleOpenGallery = () => {
    router.push("/");
  };

  // FIX: Properly closed the function and updated the state
  const handleCapture = async () => {
    if (cameraRef.current) {
      const capturedPicture = await cameraRef.current.takePictureAsync();
      console.log(capturedPicture);
      setPicture(capturedPicture);
    }
  };

  if (picture) {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: picture.uri }} style={styles.capturedImage} />
        <AntDesign
          style={styles.closeButton}
          name="close"
          size={24}
          color="white"
          onPress={() => setPicture(null)}
        />
      </View>
    );
  }

  // FIX: This return is now correctly at the component level
  return (
    <View style={styles.container}>
      {/* FIX: Attached the ref here */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
      
      <AntDesign
        style={styles.closeButton}
        name="close"
        size={24}
        color="white"
        onPress={() => router.back()}
      />

      <View style={styles.footer}>
        <Pressable onPress={handleFlip} style={styles.footerButton}>
          <Ionicons name="camera-reverse-outline" size={28} color="white" />
        </Pressable>

        <Pressable onPress={handleCapture} style={styles.captureButton} />

        <Pressable onPress={handleOpenGallery} style={styles.footerButton}>
          <Ionicons name="images-outline" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

// FIX: Moved styles outside the component to prevent re-creation on every render
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 30,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 28,
    paddingVertical: 18,
    backgroundColor: "#00000099",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerButton: {
    padding: 10,
  },
  captureButton: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  capturedImage: {
    width: "100%",
    height: "100%",
  },
});