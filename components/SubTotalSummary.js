import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

const SubTotalSummary = ({
  confirm,
  setConfirm,
  additionalHeader,
  amount,
  fee = 0,
}) => {
  const floatAmount = parseFloat(amount).toFixed(2);
  const floatFee = parseFloat(fee).toFixed(2);
  const floatTotal = (parseFloat(floatAmount) + parseFloat(floatFee)).toFixed(
    2
  );

  return (
    <View style={styles.summary}>
      {additionalHeader && (
        <View
          style={[
            styles.amountContainer,
            {
              marginVertical: 10,
            },
          ]}
        >
          <Text style={styles.title}>Account No.</Text>
          <Text style={styles.title}>{additionalHeader}</Text>
        </View>
      )}
      <Text style={styles.title}>You're about to pay</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.title}>Amount</Text>
        <Text style={styles.title}>{floatAmount}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.title}>Convenience Fee</Text>
        <Text style={styles.title}>{floatFee}</Text>
      </View>

      <View style={styles.line} />
      <Text style={styles.title}>Total Amount to Pay</Text>

      <Text style={[styles.title, styles.average]}>PHP {floatTotal}</Text>

      <View style={[styles.line, { borderWidth: 2, marginBottom: 10 }]} />
      <Text style={styles.longText}>
        Confirmed transactions will not be refunded after transaction. Are you
        sure that the account number and amount are correct?
      </Text>

      <View style={styles.checkBoxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={confirm}
          onValueChange={setConfirm}
          color={confirm ? "#4630EB" : undefined}
        />
        <Text style={styles.title}>
          I confirm that the details are correct.
        </Text>
      </View>
    </View>
  );
};

export default SubTotalSummary;

const styles = StyleSheet.create({
  summary: {
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: "auto",
  },
  title: {
    fontWeight: "bold",
  },
  amountContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    borderWidth: 1,
    marginVertical: 20,
    borderStyle: "dashed",
    borderColor: "#0F0147",
  },
  average: {
    marginVertical: 10,
    textAlign: "right",
    fontSize: 18,
  },
  longText: {
    textAlign: "center",
    fontSize: 12,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
});
