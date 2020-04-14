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

import RecoveryPassStep1 from "./pages/authPages/recoveryPassStep1";
import RecoveryPassStep2 from "./pages/authPages/recoveryPassStep2";
import SignIn from "./pages/authPages/signIn";
import SignUp from "./pages/authPages/signUp";
import VerifyCode from "./pages/authPages/verifyCode";

import MainBody from "./pages/mainBody";

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
