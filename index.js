/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import SideBar from "./providers/MainProvider";
import MainProvider from "./providers/MainProvider";
import Order from "./providerPages/order";
AppRegistry.registerComponent(appName, () => App);
