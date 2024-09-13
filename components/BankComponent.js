import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const BankComponent = ({ text, onpress, logo, bank }) => {
  return (
    <TouchableOpacity
      style={[
        styles.bank,
        {
          borderColor: bank == text ? "red" : "white",
        },
      ]}
      onPress={() => onpress(text)}
    >
      <Image source={logo} style={styles.logo} />
      <Text style={styles.bankText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BankComponent;

const styles = StyleSheet.create({
  bank: {
    width: "33%",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },

  logo: {
    resizeMode: "stretch",
    width: 80,
    height: 50,
  },

  bankText: {
    fontSize: 12,
    textAlign: "center",
    color: "#0F0147",
    fontWeight: "bold",
  },
});
