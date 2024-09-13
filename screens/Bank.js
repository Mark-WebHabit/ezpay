import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Balance from "../components/Balance";
import InputField from "../components/InputField";
import BankComponent from "../components/BankComponent";

const Bank = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [account, setAccount] = useState("");
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handleNext = async () => {
    if (!account || account == "") {
      setError("Invalid Account Name");
      return;
    }

    if (!number || number.length < 10) {
      setError("Invalid Account Number");
      return;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      setError("Invalid Amount");
      return;
    }

    if (parseFloat(amount) < 10) {
      setError("Amount should be atleast 10 above");
      return;
    }

    if (!bank) {
      setError("Please select a bank");
      return;
    }

    setModalVisible(true);
  };

  const handleProceed = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("TransferConfirmation", {
      account,
      number,
      bank,
      amount,
    });
  };

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Bank Transfer"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />

      <InputField
        label={"ACCOUNT NAME"}
        icon={require("../assets/contact.png")}
        size={40}
        value={account}
        onchange={(text) => setAccount(text)}
      />
      <InputField
        label={"ACCOUNT NUMBER"}
        icon={require("../assets/contact.png")}
        size={40}
        value={number}
        onchange={(text) => setNumber(text)}
      />
      <InputField
        label={"AMOUNT"}
        icon={require("../assets/cuba.png")}
        size={40}
        keyboardType="numeric"
        value={amount}
        onchange={(text) => setAmount(text)}
      />

      <View style={styles.partnersContainer}>
        <Text style={styles.title}>PARTNER BANKS</Text>

        <View style={styles.partners}>
          <BankComponent
            bank={bank}
            text={"LANDBANK"}
            onpress={setBank}
            logo={require("../assets/landbank.png")}
          />
          <BankComponent
            bank={bank}
            text={"BDO"}
            onpress={setBank}
            logo={require("../assets/bdo.png")}
          />
          <BankComponent
            bank={bank}
            text={"BPI"}
            onpress={setBank}
            logo={require("../assets/bpi.png")}
          />
          <BankComponent
            bank={bank}
            text={"PNB"}
            onpress={setBank}
            logo={require("../assets/pnb.png")}
          />
          <BankComponent
            bank={bank}
            text={"METROBANK"}
            onpress={setBank}
            logo={require("../assets/metrobank.png")}
          />
          <BankComponent
            bank={bank}
            text={"SECURITY BANK"}
            onpress={setBank}
            logo={require("../assets/securitybank.png")}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.next} onPress={handleNext}>
        <Text style={styles.nextText}>NEXT</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure that the selected partner bank, account name, account
              number, and acmount you’re sending are correct?
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Partner Bank</Text>
              <Text style={styles.infoText}>{bank}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Account Name</Text>
              <Text style={styles.infoText}>{account}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Account No.</Text>
              <Text style={styles.infoText}>{number}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Amount</Text>
              <Text style={styles.infoText}>PHP {amount}</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonYes]}
              onPress={handleProceed}
            >
              <Text style={[styles.textStyle, { color: "white" }]}>
                Yes, proceed
              </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonBack]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Bank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 10,
  },
  partnersContainer: {
    width: "90%",
    height: "auto",
    paddingBottom: 10,
    marginBottom: 10,
    marginHorizontal: "auto",
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#0F0147",
    fontWeight: "600",
  },

  partners: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "flex-start",
    padding: 5,
  },

  next: {
    width: 150,
    borderWidth: 1,
    marginHorizontal: "auto",
    backgroundColor: "#0F0147",
    paddingVertical: 5,
    borderRadius: 15,
  },

  nextText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
  buttonYes: {
    backgroundColor: "#0F0147",
  },
  buttonBack: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#0F0147",
    marginTop: 10,
  },
  textStyle: {
    color: "#0F0147",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 3,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
