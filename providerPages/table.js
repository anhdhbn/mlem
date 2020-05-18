import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
export default function(props){
  return(<View style={styles.container}>
    <Text>Table Page</Text>
  </View>)
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})
