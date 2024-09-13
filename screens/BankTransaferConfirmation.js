import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Balance from "../components/Balance";
import SubTotalSummary from "../components/SubTotalSummary";
import Next from "../components/Next";

import { getCurrentDateTime } from "../utilities/date";
import { generateUniqueCode } from "../utilities/reference";
import { MyContext } from "./Context";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase";

const BankTransaferConfirmation = ({ navigation, route }) => {
  const { user, sendPushNotification } = useContext(MyContext);
  const { account, number, bank, amount } = route.params;
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  const date = getCurrentDateTime();
  const reference = generateUniqueCode();

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handleNext = async () => {
    if (!confirm) {
      setError("Please confirm that the informations are correct");
      return;
    }

    setLoading(true); // Set loading to true when processing starts

    try {
      const userRef = ref(db, `users/${user.key}`);
      const userSnap = await get(userRef);

      if (userSnap.exists()) {
        const userBalance = parseFloat(userSnap.val().balance);
        const newBalance = userBalance - parseFloat(amount) - 15; // Deduct amount and fee
        await update(userRef, { balance: newBalance.toFixed(2) });
      }

      await sendPushNotification(
        user.token,
        "Bank Transfer Success",
        `You have sent ${amount} to ${account}, reference: ${reference}`
      );

      navigation.navigate("BankReceipt", {
        account,
        number,
        bank,
        amount,
        fee: 15,
        reference,
        date,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Bank Transfer"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />
      <SubTotalSummary
        confirm={confirm}
        setConfirm={setConfirm}
        additionalHeader={number}
        amount={amount}
        fee={15}
      />
      <Next onpress={handleNext} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F0147" />
        </View>
      )}
    </View>
  );
};

export default BankTransaferConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Position the container to cover the whole screen
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white background
    justifyContent: "center",
    alignItems: "center",
  },
});
