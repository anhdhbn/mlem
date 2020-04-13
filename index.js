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
import favouriteDish from "./main/favouriteDish/favouriteDish";
import mainBody from "./main/mainBody";
import slider from "./template/slider/slider";
AppRegistry.registerComponent(appName, () => App);
