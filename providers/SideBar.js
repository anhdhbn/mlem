import React, { useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OrderStackScreen from "./Order/Order";
import MenuStackScreen from "./Menu/Menu";
import NotificationStackScreen from "./Notification/Notification";
import StatisticStackScreen from "./Statistics/Statistics";
import PaymentStackScreen from "./Payment/Payment";
import CustomContent from "./CustomContent";

export default function (propsIn) {
  const drawer = createDrawerNavigator();
  // useEffect(() => {
  //   //console.log("Props in slidebar: ", propsIn);
  // }, []);
  return (
    <drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomContent {...props} response={propsIn.response} signOut={propsIn.signOut} />
      )}
    >
      <drawer.Screen name="Home" component={OrderStackScreen} />
      <drawer.Screen name="Menu" component={MenuStackScreen} />
      <drawer.Screen name="Payment" component={PaymentStackScreen} />
      <drawer.Screen name="Notification" component={NotificationStackScreen} />
      <drawer.Screen name="Statistic" component={StatisticStackScreen} />
    </drawer.Navigator>
  );
}
