import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OrderStackScreen from "./Order/Order";
import MenuStackScreen from "./Menu/Menu";
import TableStackScreen from "./Tables/Table";
import NotificationStackScreen from "./Notification/Notification";

export default function () {
  const drawer = createDrawerNavigator();
  return (
    <drawer.Navigator initialRouteName="Table">
      <drawer.Screen name="Home" component={OrderStackScreen} />
      <drawer.Screen name="Menu" component={MenuStackScreen} />
      <drawer.Screen name="Table" component={TableStackScreen} />
      <drawer.Screen name="Notification" component={NotificationStackScreen} />
    </drawer.Navigator>
  );
}
