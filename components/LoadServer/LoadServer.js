import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {  Spinner } from 'native-base';

function LoadServer() {


  return (
    <View style={styles.container}>
       <Image source={require('../../assets/icon/404.png')} style={{ width:300,height :100 }}></Image>
      <Image source={require('../../assets/icon/ooops.jpg')} style={{ width: 200, height: 80 }}></Image>
      <Spinner color='red'/>
       <Text style={{ color: 'red',fontSize:18  } }>Đang kết nối với nhà hàng</Text>
    </View>
  );
}
export default LoadServer;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

});
