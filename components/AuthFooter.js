import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AuthFooter = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Forgot PIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
});
