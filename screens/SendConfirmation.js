import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { generateUniqueCode } from "../utilities/reference";
import { getCurrentDateTime } from "../utilities/date";

import Background from "../components/Background";
import Balance from "../components/Balance";
import Back from "../components/Back";
import Next from "../components/Next";
import SubTotalSummary from "../components/SubTotalSummary";
import { MyContext } from "./Context";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase";

const SendConfirmation = ({ navigation, route }) => {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for controlling loading modal
  const { amount, phoneNumber, username, key } = route.params;
  const { user, sendPushNotification } = useContext(MyContext);
  const reference = generateUniqueCode();

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handleConfirm = async () => {
    try {
      if (!confirm) {
        throw new Error("Please confirm that the information is correct.");
      }

      setLoading(true); // Show loading modal when confirmation process starts

      const myRef = ref(db, `users/${user.key}`);
      const mySnapshot = await get(myRef);

      if (mySnapshot.exists()) {
        const dt = mySnapshot.val();
        await update(myRef, {
          balance: dt.balance - amount,
        });

        await sendPushNotification(
          dt.token,
          "Send Money",
          `You have sent ${amount} to ${phoneNumber} reference number ${reference}`
        );
      }

      const recipientRef = ref(db, `users/${key}`);
      const receiverSnap = await get(recipientRef);

      if (receiverSnap.exists()) {
        const dt = receiverSnap.val();

        await update(recipientRef, {
          balance: parseFloat(dt.balance) + parseFloat(amount),
        });

        await sendPushNotification(
          dt.token,
          "Send Money",
          `You received ${amount} from ${user.phoneNumber} reference number ${reference}`
        );
      }

      navigation.navigate("SendReceipt", {
        phoneNumber,
        username,
        total: parseFloat(amount).toFixed(2),
        reference,
        date: getCurrentDateTime(),
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Hide loading modal when confirmation process ends
    }
  };

  return (
    <View style={styles.container}>
      <Background bg={require("../assets/bg1.png")} />
      <Back title={"SEND"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SubTotalSummary
          confirm={confirm}
          setConfirm={setConfirm}
          amount={amount}
          fee={0}
        />
        <Next onpress={handleConfirm} />
      </ScrollView>

      {/* Loading Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={loading}
        onRequestClose={() => setLoading(false)}
      >
        <View style={styles.loadingModal}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </View>
  );
};

export default SendConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
