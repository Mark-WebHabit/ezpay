import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Back = ({ navigation, title, home = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageCOntainer}
        onPress={() => {
          if (!home) {
            navigation.goBack();
          } else {
            navigation.navigate("Main");
          }
        }}
      >
        <Image source={require("../assets/arrow.png")} style={styles.image} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.imageCOntainer}>
        <Image
          source={require("../assets/question.png")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
  container: {
    height: "10%",
    borderWidth: 1,
    backgroundColor: "#0F0147",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  imageCOntainer: {
    height: "100%",
    justifyContent: "center",
  },

  image: {
    height: "40%",
    aspectRatio: 4 / 4,
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
