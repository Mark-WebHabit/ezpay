import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const Signin = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Image style={styles.bgImage} source={require("../assets/bg.png")} />
      </View>
      <Text>Signin</Text>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },

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
