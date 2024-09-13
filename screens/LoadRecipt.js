import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Receipt from "../components/Receipt";

const LoadRecipt = ({ navigation, route }) => {
  const { phoneNumber, amount, fee, telco, total, date, reference } =
    route.params;

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Mobile Load"} navigation={navigation} home={true} />

      <Receipt
        additionalHeader={"LOAD"}
        phoneNummber={phoneNumber}
        additionalTExt={telco}
        fee={fee}
        total={amount}
        date={date}
        reference={reference}
      />
    </View>
  );
};

export default LoadRecipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },
});
