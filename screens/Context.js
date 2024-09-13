import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, createContext, useState } from "react";
import * as Notifications from "expo-notifications";

import { getData, removeData } from "../utilities/asyncStorage";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

export const MyContext = createContext(null);

const Context = ({ children }) => {
  const [token, setToken] = useState(null);
  const [savedPhone, setSavedPhone] = useState(null);
  const [savedFlag, setSavedFlag] = useState(true);
  const [user, setUser] = useState(null);
  const [cache, setCache] = useState(null);

  useEffect(() => {
    setUser(cache);
  }, [cache]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const userRef = ref(db, `users/${user?.key}`);
    const unsubscribe = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCache({ ...data, key: user.key });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    async function getSavedPhone() {
      const data = await getData("phone");
      setSavedPhone(data || null);
    }
    getSavedPhone();
  }, [savedFlag]);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Push Token:", token);
      setToken(token);
    };

    registerForPushNotificationsAsync();

    // Handle notifications when app is in foreground
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
      });

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  const sendPushNotification = async (expoPushToken, title, body) => {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data: { someData: "goes here" },
    };

    try {
      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log("Push notification response:", data);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        token,
        savedPhone,
        setSavedFlag,
        user,
        setUser,
        sendPushNotification,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;

const styles = StyleSheet.create({});
