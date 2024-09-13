import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";

const MainHeader = ({ navigation, setUser }) => {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/logo1.png")} style={styles.logo} />
      <TouchableOpacity
        style={styles.help}
        onPress={() => {
          setUser(null);
          navigation.navigate("Auth");
        }}
      >
        <Text style={styles.helpText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    height: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    alignItems: "center",
  },

  logo: {
    resizeMode: "contain",
    width: "50%",
    aspectRatio: 4 / 6,
  },

  help: {
    backgroundColor: "#008042",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  helpText: {
    fontSize: 13,
    color: "white",
    fontWeight: "bold",
  },
});
