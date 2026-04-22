import { Link, useFocusEffect } from "expo-router";
import React, { use, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { File, Directory, Paths } from "expo-file-system";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function HomeScreen() {
  const [images, setImages] = React.useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, []),
  );

  // useEffect(() => {
  //   loadFiles();
  // }, []);

  const loadFiles = async () => {
    const docDir = new Directory(Paths.document);
    const contents = docDir.list();

    // creating the array of captured images
    const loadedImages = contents
      .filter(
        (file) => file.name.endsWith(".jpg") || file.name.endsWith(".png"),
      )
      .map((file) => file.uri);

    if (loadedImages.length > 0) {
      console.log("Files found:", loadedImages);
      // 2. Update state with the completed array
      setImages(loadedImages);
    } else {
      console.log("No matching images found.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{ gap: 3 }}
        columnWrapperStyle={{ gap: 3 }}
        renderItem={({ item }) => (
          <Pressable
            style={{ flex: 1, maxWidth: "33.33%" }}
            onPress={() => console.log("Pressed image:", item)}
          >
            <Image
              source={{ uri: item }}
              style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
            />
          </Pressable>
        )}
      />

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
