import React from 'react';
import { Image, TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';

import search from '../../icon/search.png';
import setting from '../../icon/settings.png';
import background from '../../icon/background.jpeg';
export default function () {
  return (
    <View
      style={styles.header}
    >
      <Image
        source={background}
        style={styles.image}
      ></Image>

      <View style={{ justifyContent:'center',flexDirection: 'row' }}>
      <View style={styles.viewInput}>
        <Image source={search} style={{ width: 15, height: 15, marginLeft: 10, marginTop: 8 }} />
        <TextInput style={styles.input} placeholder={'press to search....'}></TextInput>
      </View>
      <TouchableOpacity>
        <Image source={setting} style={{ width: 25, height: 25, marginLeft: 70, marginTop: 10}} />
      </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row'
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 155,
    width: null,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  viewInput: {
    position: 'relative',
    width: 250,
    borderRadius: 10,
    height: 30,
    marginLeft: 50,
    marginTop: 10,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    overflow: "hidden"
  },
  input: {
    height: 35,
    borderRadius: 10,
    width: 300,
    backgroundColor: '#F3F3F3'
  }
})