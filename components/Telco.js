import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Telco = ({ text, logo, onclick, telco }) => {
  return (
    <TouchableOpacity
      style={[styles.telco, { borderColor: telco == text ? "red" : "white" }]}
      onPress={() => onclick(text)}
    >
      <Image source={logo} style={styles.telcoLogo} />
      <Text style={styles.telcoText}> {text}</Text>
    </TouchableOpacity>
  );
};

export default Telco;

const styles = StyleSheet.create({
  telco: {
    width: "33%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "white",
  },

  telcoLogo: {
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
  telcoText: {
    fontSize: 12,
    color: "#0F0147",
    fontWeight: "700",
    textAlign: "center",
  },
});
