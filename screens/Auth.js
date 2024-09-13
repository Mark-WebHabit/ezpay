import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { MyContext } from "./Context";
import { storeData } from "../utilities/asyncStorage";

// component
import Background from "../components/Background";
import AuthFooter from "../components/AuthFooter";

import bg from "../assets/bg.png";

const Auth = ({ navigation }) => {
  const { savedPhone, setSavedFlag, user } = useContext(MyContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (user) {
      console.log("redirected");
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

      <View style={styles.pinContainer}>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => navigation.navigate("PinLogin")}
        >
          <View style={styles.circles}>
            <Image
              source={require("../assets/circles.png")}
              style={styles.circle}
            />
          </View>
          <Text style={styles.pinText}>PIN Log-in</Text>
        </TouchableOpacity>
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

export default Auth;

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
    marginTop: 10,
  },

  contact: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  pinContainer: {
    flex: 0.5,
    justifyContent: "flex-end",
    justifyContent: "center",
  },

  pinButton: {
    width: "33%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "#0F0147",
    marginHorizontal: "auto",
  },

  circles: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    resizeMode: "contain",
    width: "60%",
  },

  pinText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
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
});
