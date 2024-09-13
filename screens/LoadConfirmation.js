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

import { getCurrentDateTime } from "../utilities/date";
import { generateUniqueCode } from "../utilities/reference";

import Background from "../components/Background";
import Balance from "../components/Balance";
import Back from "../components/Back";
import SubTotalSummary from "../components/SubTotalSummary";
import Next from "../components/Next";
import { MyContext } from "./Context";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase";

const LoadConfirmation = ({ navigation, route }) => {
  const { amount, fee, number, telco } = route.params;
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { user, sendPushNotification } = useContext(MyContext);

  const total = parseFloat(parseFloat(amount) + parseFloat(fee)).toFixed(2);
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
      setError("Please confirm that the details are correct");
      return;
    }

    setLoading(true); // Set loading to true when processing starts

    try {
      const userRef = ref(db, `users/${user.key}`);
      const userSnap = await get(userRef);

      if (!userSnap.exists()) {
        setError("Unauthorized");
        setLoading(false); // Set loading to false on error
        return;
      }

      await update(userRef, {
        balance: parseFloat(parseInt(user.balance) - parseFloat(total)).toFixed(
          2
        ),
      });

      await sendPushNotification(
        user.token,
        "Load Success",
        "You have successfully loaded " +
          number +
          " amount: " +
          total +
          " reference number: " +
          reference
      );

      navigation.navigate("LoadReceipt", {
        amount,
        fee,
        phoneNumber: number,
        telco,
        total: (parseFloat(amount) + parseFloat(fee)).toFixed(2),
        date: getCurrentDateTime(),
        reference: reference,
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
      <Back title={"Mobile Load"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />
      <View style={styles.summary}>
        <SubTotalSummary
          confirm={confirm}
          setConfirm={setConfirm}
          amount={amount}
          fee={fee}
        />
      </View>
      <Next onpress={handleNext} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F0147" />
        </View>
      )}
    </View>
  );
};

export default LoadConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },
  summary: {
    marginHorizontal: "auto",
    alignItems: "center",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Position the container to cover the whole screen
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent white background
    justifyContent: "center",
    alignItems: "center",
  },
});
