/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import signUP from "./authScreen/signUp/signUp";
import signIn from "./authScreen/signIn/signIn";
import verifyCode from "./authScreen/verifyCode/verifyCode";
import recoveryPassStep1 from "./authScreen/recoveryPassStep1/recoveryPassStep1";
import favouriteFood from "./main/favouriteFood/favouriteFood";
import mainBody from "./main/mainBody";
AppRegistry.registerComponent(appName, () => recoveryPassStep1);
