import React, { useState } from "react";
import {
  Image,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import SliderSwiper from "../slider/slider";
import search from "../../assets/icon/search.png";
import setting from "../../assets/icon/settings.png";
export default function (props) {
  const [responseSearch, setResponseSearch] = useState(null);
  return (
    <>
      <SliderSwiper />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigateSearchPage();
          }}
        >
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <View style={styles.viewInput}>
              <Image
                source={search}
                style={{ width: 15, height: 15, marginLeft: 10, marginTop: 12 }}
              />
              {/* <TextInput
                style={styles.input}
                placeholder={"MlemMlem"}
                placeholderTextColor="#B21"
                onPress={() => {
                  props.navigateSearchPage();
                }}
                // onChangeText={(text) => {
                //   props.searchDish(text).then((data) => {
                //     setResponseSearch(data);
                //     //console.log("[INFO] Response after search: ", data);
                //   });
                // }}
              ></TextInput> */}
              <Text style={styles.input}>Mlem Mlem</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  image: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 155,
    width: null,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  viewInput: {
    position: "relative",
    width: 350,
    borderRadius: 10,
    height: 40,
    marginLeft: 30,
    marginTop: 10,
    backgroundColor: "#c4c1c0",
    flexDirection: "row",
    overflow: "hidden",
    opacity: 0.8,
  },
  input: {
    textAlignVertical: "center",
    paddingLeft: 10,
    height: 40,
    borderRadius: 10,
    width: 350,
    color: "#B21",
  },
});
