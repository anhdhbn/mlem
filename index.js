/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import MainProvider from "./providers/Menu/ModalSelectFoodGroup";
AppRegistry.registerComponent(appName, () => MainProvider);
