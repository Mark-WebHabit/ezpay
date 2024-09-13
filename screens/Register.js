import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import Background from "../components/Background";
import Back from "../components/Back";

import { hashPassword } from "../utilities/hashing";
import {
  ref,
  set,
  push,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { db } from "../firebase";

import { MyContext } from "../screens/Context";

const Register = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [username, setUsername] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);

  const { token, user, sendPushNotification } = useContext(MyContext);

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, []);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setIsPhoneNumberValid(true);
  };

  const handlePinCodeChange = (value) => {
    setIsPinCodeValid(true);
    if (/^\d{0,4}$/.test(value)) {
      setPinCode(value);
      setIsPinCodeValid(true);
    }
  };

  const normalizePhoneNumber = (phoneNumber) => {
    if (phoneNumber.startsWith("63")) {
      return "0" + phoneNumber.slice(2);
    }
    return phoneNumber;
  };

  const handleSubmit = async () => {
    if (!username || username.length < 4) {
      setUsernameValid(false);
      return;
    }
    const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

    if (!isPhilippinePhoneNumber(normalizedPhoneNumber)) {
      setIsPhoneNumberValid(false);
      return;
    }

    if (!pinCode || pinCode.length !== 4) {
      setIsPinCodeValid(false);
      return;
    }

    const hash = hashPassword(pinCode);

    try {
      const userRef = ref(db, "users");
      const userQuery = query(
        userRef,
        orderByChild("phoneNumber"),
        equalTo(normalizedPhoneNumber)
      );

      const exisitingUser = await get(userQuery);

      if (exisitingUser.exists()) {
        Alert.alert("Error", "This Phone Number Is Already Registered", [
          { text: "OK" },
        ]);

        return;
      }

      const usersRef = push(ref(db, "users"));
      await set(usersRef, {
        username,
        pin: hash,
        token,
        phoneNumber: normalizedPhoneNumber,
        registration: new Date().toISOString(),
        balance: 0,
      });

      await sendPushNotification(
        token,
        "Registration Success",
        "Phone number regsitered"
      );

      Alert.alert("Registered!", "Registration Success", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Auth"),
        },
      ]);
    } catch (error) {
      console.error("Error registering user: ", error);
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  const isPhilippinePhoneNumber = (phoneNumber) => {
    const philippinePhoneNumberRegex = /^(09|\+639)\d{9}$/;
    return philippinePhoneNumberRegex.test(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Register"} navigation={navigation} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, !usernameValid && styles.inputError]}
            placeholder="Username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setUsernameValid(true);
            }}
          />
          {!usernameValid && (
            <Text style={styles.errorText}>
              Username must be at least 4 characters
            </Text>
          )}
          <TextInput
            style={[styles.input, !isPhoneNumberValid && styles.inputError]}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          {!isPhoneNumberValid && (
            <Text style={styles.errorText}>Invalid phone number</Text>
          )}
          <TextInput
            style={[
              styles.input,
              !isPinCodeValid && styles.inputError,
              { marginBottom: 10 }, // Adjust marginBottom for error message
            ]}
            placeholder="PIN Code"
            secureTextEntry={true}
            keyboardType="numeric"
            value={pinCode}
            onChangeText={handlePinCodeChange}
          />
          {!isPinCodeValid && (
            <Text style={styles.errorText}>PIN code must be 4 digits</Text>
          )}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 5, // Adjust marginBottom for error message
  },
  submitButton: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});
