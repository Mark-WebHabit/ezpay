import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

import Background from "../components/Background";
import Receipt from "../components/Receipt";
import Back from "../components/Back";

const BankReceipt = ({ navigation, route }) => {
  const { account, amount, bank, date, fee, number, reference } = route.params;

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Bank Transfer"} navigation={navigation} home={true} />

      <Receipt
        additionalHeader={"Bank Transfer"}
        username={account}
        phoneNummber={number}
        additionalTExt={bank}
        fee={fee}
        reference={reference}
        date={date}
        total={amount}
      />
    </View>
  );
};

export default BankReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
