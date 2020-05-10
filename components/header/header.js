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
import { useNavigation } from "@react-navigation/native";

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        {props.onPressBack ? (
          <TouchableOpacity
            onPress={() => props.onPressBack()}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Image
              source={require("../../assets/icon/back.png")}
              style={styles.icon_button}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Image
              source={require("../../assets/icon/back.png")}
              style={styles.icon_button}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{props.title}</Text>
        <TouchableOpacity activeOpacity={0.5} style={styles.button}>
          <Image
            source={require("../../assets/icon/settings.png")}
            style={styles.icon_button}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
