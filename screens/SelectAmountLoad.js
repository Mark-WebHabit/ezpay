import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import Background from "../components/Background";
import Back from "../components/Back";
import Balance from "../components/Balance";
import InputField from "../components/InputField";

import Next from "../components/Next";

const SelectAmountLoad = ({ navigation, route }) => {
  const { number, telco } = route.params;
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => setError(null) },
      ]);
    }
  }, [error]);

  const handlebuy = async () => {
    if (!amount || isNaN(parseInt(amount))) {
      setError("Invalid Amount");
      return;
    }

    if (parseInt(amount) < 10) {
      setError("Less than 10 required");
      return;
    }

    setAmount((prev) => parseInt(prev));
    navigation.navigate("LoadConfirm", {
      number,
      telco,
      amount,
      fee: (amount * 0.03).toFixed(2),
    });
  };

  return (
    <View style={styles.container}>
      <Background />
      <Back title={"Mobile Load"} navigation={navigation} />
      <Balance backgroundColor="#0F0147" />

      <View style={styles.priceListContainer}>
        <InputField
          placeholder="Enter desire amount"
          size={40}
          showLabel={false}
          keyboardType="numeric"
          value={amount}
          onchange={(text) => setAmount(text)}
        />

        <View style={styles.priceList}>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("15")}
          >
            <Text style={styles.price}>15</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("20")}
          >
            <Text style={styles.price}>20</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("30")}
          >
            <Text style={styles.price}>30</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("50")}
          >
            <Text style={styles.price}>50</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("60")}
          >
            <Text style={styles.price}>60</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("75")}
          >
            <Text style={styles.price}>75</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("100")}
          >
            <Text style={styles.price}>100</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("150")}
          >
            <Text style={styles.price}>150</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.priceContainer}
            onPress={() => setAmount("200")}
          >
            <Text style={styles.price}>200</Text>
            <Text style={styles.price}>PHP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Next title="BUY" onpress={handlebuy} />
    </View>
  );
};

export default SelectAmountLoad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    gap: 20,
  },

  priceListContainer: {
    width: "90%",
    marginHorizontal: "auto",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 15,
    backgroundColor: "#f2f2f2",
    gap: 10,
  },

  priceList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
  },
  priceContainer: {
    width: "33%",
    alignItems: "center",
    padding: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F0147",
  },
});
