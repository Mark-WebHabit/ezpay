import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React from "react";

const width = Dimensions.get("window").width;
const ActionButotn = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionWrapper} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.actionText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ActionButotn;

const styles = StyleSheet.create({
  actionWrapper: {
    width: "48%",
    gap: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
  },

  icon: {
    resizeMode: "contain",
    width: (width * 0.5) / 2,
    height: (width * 0.5) / 2.5,
    marginHorizontal: "auto",
  },
  actionText: {
    borderWidth: 1,
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    borderRadius: 15,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "#0F0147",
  },
});
