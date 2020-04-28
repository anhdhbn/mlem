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
import Detail from "./pages/detail";

const Stack = createStackNavigator();

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
class TopStack extends Component {
  render() {
    return (
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
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <TopStack />
      </NavigationContainer>

      // <SkeletonTheme color="#202020" highlightColor="#444">
      //   <section>
      //     <Skeleton count={3}></Skeleton>
      //     <Skeleton width={100} />
      //     <Skeleton circle={true} height={50} width={50} />
      //   </section>
      // </SkeletonTheme>
    );
  }
}
