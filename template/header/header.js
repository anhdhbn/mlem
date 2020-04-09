import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./style";
export default class Header extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   nameScreen: "",
    // };
  }

  render() {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.5} style={styles.button}>
            <Image
              source={require("../../icon/back.png")}
              style={styles.icon_button}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{this.props.title}</Text>
          <TouchableOpacity activeOpacity={0.5} style={styles.button}>
            <Image
              source={require("../../icon/settings.png")}
              style={styles.icon_button}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
