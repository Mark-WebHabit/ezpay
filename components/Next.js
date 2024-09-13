import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Next = ({ onpress, title = "NEXT" }) => {
  return (
    <View style={styles.nextContainer}>
      <TouchableOpacity onPress={onpress}>
        <Text style={styles.next}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Next;

const styles = StyleSheet.create({
  nextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "10%",
  },

  next: {
    paddingVertical: 10,
    width: 150,
    textAlign: "center",
    borderRadius: 20,
    backgroundColor: "#0F0147",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
