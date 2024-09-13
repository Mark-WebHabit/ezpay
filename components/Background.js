import { StyleSheet, Image, View } from "react-native";
import React from "react";

const Background = ({ bg = null }) => {
  return (
    <View style={styles.bg}>
      <Image
        style={styles.bgImage}
        source={bg ? bg : require("../assets/bg1.png")}
      />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  bgImage: {
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
  },
});
