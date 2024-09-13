import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Receipt from "../components/Receipt";

const SendReceipt = ({ navigation, route }) => {
  const { phoneNumber, username, total, reference, date } = route.params;
  console.log(route.params);
  return (
    <View style={styles.container}>
      <Background bg={require("../assets/bg1.png")} />
      <Back title={"SEND"} navigation={navigation} home={true} />
      <Receipt
        phoneNummber={phoneNumber}
        username={username}
        total={total}
        reference={reference}
        date={date}
      />
    </View>
  );
};

export default SendReceipt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
