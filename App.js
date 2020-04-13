import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RecoveryPassStep1 from "./authScreen/recoveryPassStep1/recoveryPassStep1";
import RecoveryPassStep2 from "./authScreen/recoveryPassStep2/recoveryPassStep2";
import SignIn from "./authScreen/signIn/signIn";
import SignUp from "./authScreen/signUp/signUp";
import VerifyCode from "./authScreen/verifyCode/verifyCode";

import MainBody from "./main/mainBody";

const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  createLoginStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="RecoveryPassStep1" component={RecoveryPassStep1} />
      <Stack.Screen name="RecoveryPassStep2" component={RecoveryPassStep2} />
      <Stack.Screen name="MainBody" component={MainBody} />
    </Stack.Navigator>
  );
  render() {
    return <NavigationContainer>{this.createLoginStack()}</NavigationContainer>;
  }
}
