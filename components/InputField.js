import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const InputField = ({
  label,
  icon,
  value,
  onchange,
  size = 50,
  showImage = true,
  placeholder = "",
  showLabel = true,
  keyboardType = "default",
  maxLength = 100,
}) => {
  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputCOntainer}>
        <TextInput
          style={[styles.input, { height: size }]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onchange}
          maxLength={maxLength}
        />
        {showImage && <Image source={icon} style={styles.icon} />}
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginHorizontal: "auto",
  },
  label: {
    color: "#0F0147",
    fontWeight: "bold",
    marginLeft: "5%",
  },

  inputCOntainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },

  icon: {
    resizeMode: "stretch",
    height: 30,
    width: 30,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 20,
  },
});
