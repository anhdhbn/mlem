import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OrderStackScreen from "./Order/Order";
import MenuStackScreen from "./Menu/Menu";
import TableStackScreen from "./Tables/Table";
import NotificationStackScreen from "./Notification/Notification";
import StatisticStackScreen from './Statistics/Statistics';
import PaymentStackScreen from './Payment/Payment';
export default function () {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator initialRouteName="Table">
      <drawer.Screen name="Home" component={OrderStackScreen} />
      <drawer.Screen name="Menu" component={MenuStackScreen} />
      <drawer.Screen name="Table" component={TableStackScreen} />
      <drawer.Screen name="Payment" component={PaymentStackScreen} />
      <drawer.Screen name="Notification" component={NotificationStackScreen} />
      <drawer.Screen name="Statistic" component= {StatisticStackScreen} />
    </drawer.Navigator>
  );
}
