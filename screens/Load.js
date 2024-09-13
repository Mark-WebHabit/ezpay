import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
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
import Next from "../components/Next";
import Telco from "../components/Telco";

const Load = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const [telco, setTelco] = useState(number);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handleNextPress = () => {
    if (!telco || !number) {
      setError("Invalid Telco or Phone Number");
      return;
    }

    setModalVisible(true);
  };

  const handleSetTelco = (text) => {
    setTelco(text);
  };

  const handleProceed = () => {
    setModalVisible(!modalVisible);
    navigation.navigate("LoadAmount", {
      number,
      telco,
    });
  };
  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Mobile Load"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />
      <InputField
        label={"Contact Number"}
        icon={require("../assets/contact.png")}
        value={number}
        onchange={(text) => setNumber(text)}
        keyboardType="numeric"
        maxLength={11}
      />
      <View style={styles.telcoListsContainer}>
        <Text style={styles.title}>TELCO</Text>

        <View style={styles.telcoLists}>
          <Telco
            text={"TALK N' TEXT"}
            logo={require("../assets/tnt.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
          <Telco
            text={"SMART"}
            logo={require("../assets/smart.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
          <Telco
            text={"GOMO"}
            logo={require("../assets/gomo.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
          <Telco
            text={"GLOBE"}
            logo={require("../assets/globe.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
          <Telco
            text={"TM"}
            logo={require("../assets/tm.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
          <Telco
            text={"DITO"}
            logo={require("../assets/dito.png")}
            onclick={handleSetTelco}
            telco={telco}
          />
        </View>
      </View>
      <Next onpress={handleNextPress} />

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
              Are you sure that the telco and number you're buying load for is
              correct?
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Telco</Text>
              <Text style={styles.infoText}>{telco}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Contact No.</Text>
              <Text style={styles.infoText}>{number}</Text>
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

export default Load;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  telcoListsContainer: {
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  telcoLists: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    alignContent: "flex-start",
    padding: "5%",
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
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
