import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const NumberButton = ({ number, onClick }) => {
  return (
    <TouchableOpacity
      style={styles.textContainer}
      onPress={() => onClick(number)}
    >
      <Text style={styles.number}>{number}</Text>
    </TouchableOpacity>
  );
};

export default NumberButton;

const styles = StyleSheet.create({
  textContainer: {
    width: "33%",
    aspectRatio: 4 / 3,
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    fontSize: 30,
    fontWeight: "700",
    color: "white",
  },
});
