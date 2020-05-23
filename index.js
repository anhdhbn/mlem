/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import AddNewFood from "./providers/Menu/AddNewFood";
AppRegistry.registerComponent(appName, () => AddNewFood);
