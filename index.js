/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import SideBar from "./providers/MainProvider";
// import order from './pages/order'
// import DatePicker from './components/dateTimePicker/datePicker'
import MainProvider from "./providers/MainProvider";
AppRegistry.registerComponent(appName, () => MainProvider);
