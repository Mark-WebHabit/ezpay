import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Receipt = ({
  additionalHeader,
  additionalTExt,
  phoneNummber,
  username,
  total,
  reference,
  date,
  fee = 0,
}) => {
  return (
    <View style={styles.receipt}>
      <Image
        style={styles.absolute}
        source={require("../assets/receipt.png")}
      />

      {additionalHeader && (
        <Text style={[styles.bigText, { lineHeight: 20, marginTop: 30 }]}>
          {additionalHeader}
        </Text>
      )}
      <Text
        style={[
          styles.bigText,
          {
            marginTop: additionalHeader ? 0 : 40,
            textTransform: "uppercase",
          },
        ]}
      >
        {username}
      </Text>

      {/* <Text style={[styles.bigText, { lineHeight: 20 }]}>PHP 00.00</Text> */}
      <Text style={[styles.bigText, { fontSize: 16, fontWeight: "600" }]}>
        {phoneNummber}
      </Text>
      {additionalTExt && (
        <Text style={[styles.bigText, { fontSize: 16, fontWeight: "600" }]}>
          {additionalTExt}
        </Text>
      )}
      <Text
        style={[
          styles.bigText,
          {
            fontSize: 18,
            fontWeight: "500",
            marginTop: 20,
          },
        ]}
      >
        Paid Via EZPay
      </Text>

      <View style={styles.line} />
      <View style={styles.amountContainer}>
        <Text style={styles.title}>Amount</Text>
        <Text style={styles.title}>{total}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.title}>Convenience Fee</Text>
        <Text style={styles.title}>{parseFloat(fee).toFixed(2)}</Text>
      </View>
      <View style={styles.line} />

      <View style={[styles.totalContainer, { marginBottom: 20 }]}>
        <Text style={styles.totalTitle}>Total Amount</Text>
        <Text style={styles.total}>
          PHP {(parseFloat(fee) + parseFloat(total)).toFixed(2)}
        </Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.dateTitle}>Date</Text>
        <Text style={styles.dateTitle}>{date}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.dateTitle}>Reference No.</Text>
        <Text style={styles.dateTitle}>{reference}</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>
    </View>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  receipt: {
    width: "85%",
    height: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
    position: "relative",
  },

  bigText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#0F0147",
  },

  line: {
    borderWidth: 1,
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 20,
    borderStyle: "dashed",
  },

  title: {
    fontWeight: "bold",
  },
  amountContainer: {
    marginVertical: 10,
    width: "80%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalContainer: {
    flexDirection: "row",
    width: "80%",
    marginHorizontal: "auto",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 18,
    color: "#0F0147",
    fontWeight: "bold",
  },

  total: {
    fontSize: 16,
  },

  dateTitle: {
    color: "#0F0147",
    fontWeight: "600",
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    resizeMode: "contain",
    width: 120,
    height: 120,
  },
});
