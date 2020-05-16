import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements'
export default function (props) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Overlay
        visible={modalVisible}
        overlayStyle={{
          width: "100%",
          height: 150,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity style={{...styles.btnView,borderBottomWidth:1}}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Tuỳ chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={{...styles.btnView,borderBottomWidth:1}}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20, color: '#DC0000' }}>Xoá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnView}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </Overlay>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowRadius: 10,
  },
  content: {
    backgroundColor: "#AFAFAF",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnView: {
    padding:5,
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})