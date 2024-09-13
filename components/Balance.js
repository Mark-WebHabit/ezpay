import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import { MyContext } from "../screens/Context";

const Balance = ({ backgroundColor = "#008042" }) => {
  const { user } = useContext(MyContext);

  if (!user) {
    return null;
  }

  return (
    <View
      style={[styles.balanceContaner, { backgroundColor: backgroundColor }]}
    >
      <View style={styles.balanceHeader}>
        <Text style={styles.small}>AVAILABLE BALANCE</Text>
        <TouchableOpacity style={styles.cashIn}>
          <Text style={styles.cashInText}>+ Cash In</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.balanceText}>
        ₱ {parseFloat(user.balance).toFixed(2)}
      </Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  balanceContaner: {
    width: "90%",
    marginHorizontal: "auto",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  small: {
    fontSize: 10,
    color: "#bfbfbf",
  },

  cashIn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 15,
  },
  cashInText: {
    fontSize: 12,
  },

  balanceText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
});
