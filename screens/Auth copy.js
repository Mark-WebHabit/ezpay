import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

// component
import Background from "../components/Background";
import AuthFooter from "../components/AuthFooter";

import bg from "../assets/bg.png";

const Auth = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Background bg={bg} />

      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.switchContact}>
        <Text style={styles.contact}>Contact No</Text>
        <Image style={styles.switch} source={require("../assets/switch.png")} />
      </TouchableOpacity>

      <View style={styles.pinContainer}>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => navigation.navigate("PinLogin")}
        >
          <View style={styles.circles}>
            <Image
              source={require("../assets/circles.png")}
              style={styles.circle}
            />
          </View>
          <Text style={styles.pinText}>PIN Log-in</Text>
        </TouchableOpacity>
      </View>
      <AuthFooter />
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },

  logoContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  logo: {
    resizeMode: "stretch",
    width: "75%",
    height: "80%",
  },

  switchContact: {
    width: "60%",
    backgroundColor: "red",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 10,
  },

  contact: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  pinContainer: {
    flex: 0.5,
    justifyContent: "flex-end",
    justifyContent: "center",
  },

  pinButton: {
    width: "33%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#0F0147",
    marginHorizontal: "auto",
  },

  circles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    resizeMode: "contain",
    width: "60%",
  },

  pinText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
});
