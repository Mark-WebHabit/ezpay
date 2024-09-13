import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Balance from "../components/Balance";
import InputField from "../components/InputField";
import Next from "../components/Next";
import { MyContext } from "./Context";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { db } from "../firebase";

const SendMoney = ({ navigation }) => {
  const { user } = useContext(MyContext);
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handleNext = async () => {
    if (error) {
      return;
    }

    const userRef = ref(db, `users`);
    const userQeury = query(
      userRef,
      orderByChild("phoneNumber"),
      equalTo(number)
    );

    const snapshot = await get(userQeury);

    if (!snapshot.exists()) {
      setError("Phone Number not registered");
      return;
    }

    if (number == user.phoneNumber) {
      setError("Cannot send money to self");
      return;
    }

    if (parseFloat(amount) > parseFloat(user.balance)) {
      setError("Insufficient Balance");
      return;
    }

    if (snapshot.exists()) {
      let data = snapshot.val();
      const keys = Object.keys(data)[0];
      data = data[keys];

      navigation.navigate("SendConfirmation", {
        phoneNumber: data.phoneNumber,
        amount,
        username: data.username,
        key: keys,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Background bg={require("../assets/bg1.png")} />
          <Back navigation={navigation} title={"SEND"} />
          <Balance backgroundColor="#0F0147" />

          <InputField
            label={"ACCOUNT NUMBER"}
            icon={require("../assets/contact.png")}
            keyboardType="numeric"
            value={number}
            onchange={(text) => setNumber(text)}
          />
          <InputField
            label={"AMOUNT"}
            icon={require("../assets/cuba.png")}
            keyboardType="numeric"
            value={amount}
            onchange={(text) => setAmount(text)}
          />

          <Next onpress={handleNext} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    gap: 20,
  },
});
