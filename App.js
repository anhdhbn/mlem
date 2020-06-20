import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider as PaperProvider } from "react-native-paper";

import RecoveryPassStep1 from "./customerPages/authPages/recoveryPassStep1";
import RecoveryPassStep2 from "./customerPages/authPages/recoveryPassStep2";
import SignIn from "./customerPages/authPages/signIn";
import SignUp from "./customerPages/authPages/signUp";
import VerifyCode from "./customerPages/authPages/verifyCode";

import authServices from "./customerServices/authServices";

import MainBody from "./customerPages/mainBody";

import MainProvider from "./providers/MainProvider";
import SlideBar from "./providers/SideBar";
import Spinner from "./components/Spinner/Spinner";

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Spinner />
    </View>
  );
}

function NoInternetScreen() {
  return (
    <View>
      <Text>NoInternet</Text>
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
}

function ProviderHomeScreen(props) {
  const { signOut } = React.useContext(AuthContext);
  return <SlideBar />;
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
            isLoading: false,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            response: null,
            isLoading: false,
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
      let typeToken = null;
      let response;
      try {
        typeToken = await AsyncStorage.getItem("typeToken");
        if (typeToken === "fb") {
          userToken = await AsyncStorage.getItem("userToken");
          console.log("Params to post token: ", { token: userToken });
          response = await authServices.postTokenFB({ token: userToken });
          console.log("RESPONSE after post token: ", response);
        } else if (typeToken === "gg") {
          let Id = await AsyncStorage.getItem("Id", data.Id);
          let DisplayName = await AsyncStorage.getItem(
            "DisplayName",
            data.DisplayName
          );
          let Email = await AsyncStorage.getItem("Email", data.Email);
          let params = { Id: Id, DisplayName: DisplayName, Email: Email };

          console.log("Params to post token: ", params);
          response = await authServices.postTokenFB(params);
          console.log("RESPONSE after post token: ", response);
        }
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // dispatch({ type: "RESTORE_TOKEN", token: userToken });

      if (typeToken) {
        dispatch({
          type: "SIGN_IN",
          token: "userToken",
          response: response,
          isLoading: false,
        });
      } else {
        dispatch({
          type: "RESTORE_TOKEN",
          token: null,
          response: null,
          isLoading: false,
        });
      }
    };

    bootstrapAsync();
  }, []);

  const checkNoInternet = () => {
    const netInfo = useNetInfo();
    // console.log("[INFO] Use netinfo: ", netInfo.isConnected);
    return !netInfo.isConnected;
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (data, typeData = null) => {
        if (typeData === "fb") {
          await AsyncStorage.setItem("typeToken", "fb");
          await AsyncStorage.setItem("userToken", data);
          let response = await authServices.postTokenFB({ token: data });
          console.log("[INFO] Response after auth with fb: ", response);
          console.log(data);

          dispatch({
            type: "SIGN_IN",
            token: data,
            response: response,
            isLoading: false,
          });

          return true;
        } else if (typeData === "gg") {
          await AsyncStorage.setItem("typeToken", "gg");
          await AsyncStorage.setItem("Id", data.Id);
          await AsyncStorage.setItem("DisplayName", data.DisplayName);
          await AsyncStorage.setItem("Email", data.Email);
          let response = await authServices.postTokenGG(data);
          console.log("[INFO] Response after auth with gg: ", response);
          console.log(data);

          dispatch({
            type: "SIGN_IN",
            token: data.Id,
            response: response,
            isLoading: false,
          });

          return true;
        } else {
          // In a production app, we need to send some data (usually username, password) to server and get a token
          // We will also need to handle errors if sign in failed
          // After getting token, we need to persist the token using `AsyncStorage`
          // In the example, we'll use a dummy token
          let response = await authServices.login(data).catch((reason) => {
            // console.log("==========================================");
            const message = reason.response.data;
            console.log(message);

            return false;
          });

          dispatch({
            type: "SIGN_IN",
            token: response.token,
            response: response,
          });
          return true;
        }
      },
      signOut: () => {
        try {
          AsyncStorage.removeItem("userToken");
          console.log("Remove usertoken");
        } catch (e) {
          // remove error
        }
        dispatch({ type: "SIGN_OUT" });
      },
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
          {checkNoInternet() ? (
            <Stack.Screen name="NoInternet" component={NoInternetScreen} />
          ) : state.isLoading ? (
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
                // initialParams={{
                //   isWrong: state.isWrong,
                //   setIsWrong: setIsWrong,
                // }}
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
          ) : state.response.roleId === 1 ? (
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
