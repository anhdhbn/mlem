/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import SideBar from './providers/Tables/ModalTest';
// import order from './pages/order'
// import DatePicker from './components/dateTimePicker/datePicker'
AppRegistry.registerComponent(appName, () => SideBar);
