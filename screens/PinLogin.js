import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

// component
import Background from "../components/Background";
import AuthFooter from "../components/AuthFooter";
import NumberButton from "../components/NumberButton";

import { MyContext } from "./Context";
import { storeData } from "../utilities/asyncStorage";
import { verifyPassword } from "../utilities/hashing";
import bg from "../assets/bg1.png";
import {
  equalTo,
  get,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { db } from "../firebase";

const PinLogin = ({ navigation }) => {
  const { savedPhone, setSavedFlag, user, setUser, token } =
    useContext(MyContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [error, setError] = useState(null);
  const [circle1BackgroundColor, setCircle1BackgroundColor] =
    useState("transparent");
  const [circle2BackgroundColor, setCircle2BackgroundColor] =
    useState("transparent");
  const [circle3BackgroundColor, setCircle3BackgroundColor] =
    useState("transparent");
  const [circle4BackgroundColor, setCircle4BackgroundColor] =
    useState("transparent");

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, []);

  useEffect(() => {
    setPhoneNumber(savedPhone);
  }, [savedPhone]);

  const handleSwitchContact = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    // Check if the phone number starts with "09" and is exactly 11 digits long
    if (/^09\d{9}$/.test(phoneNumber)) {
      await storeData("phone", phoneNumber);

      setSavedFlag(Math.random() * 100);

      setIsModalVisible(false);
    } else {
      // Show an error message or handle invalid phone number
      console.log("Invalid phone number");
      // For example, you can display an alert:
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid phone number starting with '09' and containing 11 digits."
      );
    }
  };

  const handleCancel = () => {
    setPhoneNumber(savedPhone);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        {
          text: "OK",
          onPress: () => {
            setError(null);
            setPinCode("");
          },
        },
      ]);
    }
  }, [error]);

  useEffect(() => {
    // Update the background color of circles based on the pin code length

    if (pinCode.length >= 1) {
      // Set background color for first circle
      setCircle1BackgroundColor("white");
    } else {
      setCircle1BackgroundColor("transparent");
    }

    if (pinCode.length >= 2) {
      // Set background color for second circle
      setCircle2BackgroundColor("white");
    } else {
      setCircle2BackgroundColor("transparent");
    }

    if (pinCode.length >= 3) {
      // Set background color for third circle
      setCircle3BackgroundColor("white");
    } else {
      setCircle3BackgroundColor("transparent");
    }

    if (pinCode.length >= 4) {
      // Set background color for fourth circle
      setCircle4BackgroundColor("white");
    } else {
      setCircle4BackgroundColor("transparent");
    }

    if (pinCode.length == 4) {
      const userRef = ref(db, "users");
      const userQuery = query(
        userRef,
        orderByChild("phoneNumber"),
        equalTo(phoneNumber)
      );

      get(userQuery)
        .then(async (snapshot) => {
          if (snapshot.exists()) {
            const users = snapshot.val();
            const keys = Object.keys(users);

            const user = users[keys[0]];

            const isMatched = verifyPassword(pinCode, user.pin);

            if (isMatched) {
              let savedToken = user.token;

              if (savedToken !== token && savedToken !== "") {
                setError(
                  "Account is not properly logged out on another device"
                );
                return;
              }

              if (savedToken === "" || savedToken === token) {
                if (savedToken === "") {
                  const userRef = ref(db, `users/${keys[0]}`);
                  await update(userRef, { token });
                }

                setUser({ ...user, token, key: keys[0] });
                setPinCode("");
                navigation.navigate("Main");
              }
            } else {
              setError("Wrong PIN Code");
            }
          } else {
            setError("Phone number not registered");
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    }
  }, [pinCode]);

  const handleSetPinCode = (number) => {
    if (number === "×") {
      // If the number is the "×" button, remove the last digit from pinCode
      setPinCode((prev) => prev.slice(0, -1));
    } else if (pinCode === "" || pinCode.length < 4) {
      // Otherwise, add the number to the pin code
      setPinCode((prev) => prev + number.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Background bg={bg} />

      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </View>

      <TouchableOpacity
        style={styles.switchContact}
        onPress={handleSwitchContact}
      >
        <Text style={styles.contact}>
          {phoneNumber ? phoneNumber : "Contact No"}
        </Text>
        <Image style={styles.switch} source={require("../assets/switch.png")} />
      </TouchableOpacity>

      <View style={styles.cirlces}>
        <View
          style={[styles.circle, { backgroundColor: circle1BackgroundColor }]}
        />
        <View
          style={[styles.circle, { backgroundColor: circle2BackgroundColor }]}
        />
        <View
          style={[styles.circle, { backgroundColor: circle3BackgroundColor }]}
        />
        <View
          style={[styles.circle, { backgroundColor: circle4BackgroundColor }]}
        />
      </View>

      <View style={styles.keyboard}>
        <View style={styles.keyboardCOntainer}>
          {Array.from({ length: 10 }).map((val, i) => (
            <NumberButton
              number={i == 9 ? 0 : i + 1}
              key={i}
              onClick={handleSetPinCode}
            />
          ))}
          <NumberButton number={"×"} onClick={handleSetPinCode} />
        </View>
      </View>
      <AuthFooter navigation={navigation} />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="09XXXXXXXXX"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PinLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  logoContainer: {
    flex: 0.4,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    resizeMode: "stretch",
    width: "75%",
    height: "80%",
  },
  switchContact: {
    width: "60%",
    backgroundColor: "red",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 30,
  },
  contact: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  switch: {
    width: 20,
    height: 20,
  },
  keyboard: {
    flex: 0.5,
    justifyContent: "flex-end",
    justifyContent: "center",
    marginTop: 20,
  },
  keyboardCOntainer: {
    flex: 1,
    width: "80%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "blue",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  cirlces: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  circle: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
  },
});
