import React from "react";
import { Image, View } from "react-native";

import Swiper from "react-native-swiper";
import styles from "./style";

function SliderSwiper() {
  return (
    <Swiper
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={8}
      showsPagination={false}
      style={{ height: 155 }}
    >
      <View style={styles.child}>
        <Image
          style={styles.slide}
          source={require("../../assets/images/slider/1.jpg")}
        />
      </View>
      <View style={styles.child}>
        <Image
          style={styles.slide}
          source={require("../../assets/images/slider/2.png")}
        />
      </View>
      <View style={styles.child}>
        <Image
          style={styles.slide}
          source={require("../../assets/images/slider/3.jpg")}
        />
      </View>
      <View style={styles.child}>
        <Image
          style={styles.slide}
          source={require("../../assets/images/slider/4.jpg")}
        />
      </View>
    </Swiper>
  );
}
export default SliderSwiper;
