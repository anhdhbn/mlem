// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Platform,
//   Text,
//   View,
//   ScrollView,
//   StatusBar,
//   Image,
//   Button,
//   Dimensions,
//   TouchableWithoutFeedback,
// } from "react-native";
// import { Provider as PaperProvider } from "react-native-paper";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

// import RecoveryPassStep1 from "./pages/authPages/recoveryPassStep1";
// import RecoveryPassStep2 from "./pages/authPages/recoveryPassStep2";
// import SignIn from "./pages/authPages/signIn";
// import SignUp from "./pages/authPages/signUp";
// import VerifyCode from "./pages/authPages/verifyCode";

// import MainBody from "./pages/mainBody";
// import Detail from "./pages/detail";

// const Stack = createStackNavigator();

// class TopStack extends Component {
//   render() {
//     return (
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="SignIn" component={SignIn} />
//         <Stack.Screen name="SignUp" component={SignUp} />
//         <Stack.Screen name="VerifyCode" component={VerifyCode} />
//         <Stack.Screen name="RecoveryPassStep1" component={RecoveryPassStep1} />
//         <Stack.Screen name="RecoveryPassStep2" component={RecoveryPassStep2} />
//         <Stack.Screen name="MainBody" component={MainBody} />
//         <Stack.Screen name="Detail" component={Detail} />
//       </Stack.Navigator>
//     );
//   }
// }

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <PaperProvider>
//         <NavigationContainer>
//           <TopStack />
//         </NavigationContainer>
//       </PaperProvider>
//     );
//   }
// }

import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import RecoveryPassStep1 from "./pages/authPages/recoveryPassStep1";
import RecoveryPassStep2 from "./pages/authPages/recoveryPassStep2";
import SignIn from "./pages/authPages/signIn";
import SignUp from "./pages/authPages/signUp";
import VerifyCode from "./pages/authPages/verifyCode";

import authServices from "./services/authServices";

import MainBody from "./pages/mainBody";
import Detail from "./pages/detail";

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function UserHomeScreen(props) {
  const { signOut } = React.useContext(AuthContext);

  return (
    <PaperProvider>
      <MainBody response={props.route.params.response} _signOut={signOut} />
    </PaperProvider>
  );
  // return (
  //   <>
  //     {console.log(
  //       "[INFO] Response in UserHomeScreen: ",
  //       props.route.params.response
  //     )}
  //     <Text>Home</Text>
  //   </>
  // );
}

function ProviderHomeScreen(props) {
  const { signOut } = React.useContext(AuthContext);
  return (
    <>
      {console.log(
        "[INFO] Response in ProviderHomeScreen: ",
        props.route.params.response.roleId
      )}
      <Text>Provider Home</Text>
    </>
  );
}

function SignInScreen(props) {
  const { signIn } = React.useContext(AuthContext);

  return <SignIn signIn={signIn} navigation={props.navigation} />;
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            response: null,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            response: action.response,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            response: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      response: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        let response = await authServices.login(data);
        dispatch({
          type: "SIGN_IN",
          token: response.token,
          response: response,
        });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            headerShown: false,
          }}
        >
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <>
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                // initialParams={authContext: }
                options={{
                  title: "Sign in",
                  // When logging out, a pop animation feels intuitive
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
              <Stack.Screen name="VerifyCode" component={VerifyCode} />
              <Stack.Screen
                name="RecoveryPassStep1"
                component={RecoveryPassStep1}
              />
              <Stack.Screen
                name="RecoveryPassStep2"
                component={RecoveryPassStep2}
              />
            </>
          ) : state.response.roleId === 2 ? (
            // User is signed in
            <Stack.Screen
              name="UserHome"
              component={UserHomeScreen}
              initialParams={{ response: state.response }}
            />
          ) : (
            <Stack.Screen
              name="ProviderHome"
              component={ProviderHomeScreen}
              initialParams={{ response: state.response }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
