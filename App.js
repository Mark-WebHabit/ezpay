import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// screens
import Auth from "./screens/Auth";
import Signin from "./screens/Signin";
import PinLogin from "./screens/PinLogin";
import Main from "./screens/Main";
import SendMoney from "./screens/SendMoney";
import SendConfirmation from "./screens/SendConfirmation";
import SendReceipt from "./screens/SendReceipt";
import Load from "./screens/Load";
import SelectAmountLoad from "./screens/SelectAmountLoad";
import LoadConfirmation from "./screens/LoadConfirmation";
import LoadRecipt from "./screens/LoadRecipt";
import Bank from "./screens/Bank";
import BankTransaferConfirmation from "./screens/BankTransaferConfirmation";
import BankReceipt from "./screens/BankReceipt";
import Register from "./screens/Register";
import * as Notifications from "expo-notifications";

import { Platform } from "react-native";

// context
import Context from "./screens/Context";

const Stack = createStackNavigator();

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return (
    <Context>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* auths */}
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="PinLogin" component={PinLogin} />
          <Stack.Screen name="Register" component={Register} />

          {/* mains */}
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Send" component={SendMoney} />
          <Stack.Screen name="SendConfirmation" component={SendConfirmation} />
          <Stack.Screen name="SendReceipt" component={SendReceipt} />
          <Stack.Screen name="Load" component={Load} />
          <Stack.Screen name="LoadAmount" component={SelectAmountLoad} />
          <Stack.Screen name="LoadConfirm" component={LoadConfirmation} />
          <Stack.Screen name="LoadReceipt" component={LoadRecipt} />
          <Stack.Screen name="Bank" component={Bank} />
          <Stack.Screen
            name="TransferConfirmation"
            component={BankTransaferConfirmation}
          />
          <Stack.Screen name="BankReceipt" component={BankReceipt} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context>
  );
}
