import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";

import Background from "../components/Background";
import MainHeader from "../components/MainHeader";
import ActionButotn from "../components/ActionButotn";
import Balance from "../components/Balance";

import { MyContext } from "../screens/Context";

import bg from "../assets/bg1.png";
import { get, ref, update } from "firebase/database";
import { db } from "../firebase";

const Main = ({ navigation }) => {
  const { setUser, user } = useContext(MyContext);

  const handleLogout = async () => {
    if (user) {
      const key = user.key;

      const userRef = ref(db, `users/${key}`);

      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        await update(userRef, {
          token: "",
        });

        setUser(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Background bg={bg} />
      <MainHeader navigation={navigation} setUser={handleLogout} />
      <Balance />

      <ScrollView contentContainerStyle={styles.actionsContainer}>
        <View style={styles.actions}>
          <ActionButotn
            text={"SEND"}
            icon={require("../assets/borrow.png")}
            onPress={() => navigation.navigate("Send")}
          />
          <ActionButotn
            text={"TRANSFER"}
            icon={require("../assets/bank.png")}
            onPress={() => navigation.navigate("Bank")}
          />
          <ActionButotn
            text={"LOAD"}
            icon={require("../assets/sim.png")}
            onPress={() => navigation.navigate("Load")}
          />
          <ActionButotn text={"BILLS"} icon={require("../assets/bill.png")} />
          <ActionButotn
            text={"CONTACTS"}
            icon={require("../assets/contact.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },

  actionsContainer: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: "5%",
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "flex-start",
    gap: 10,
  },
});
