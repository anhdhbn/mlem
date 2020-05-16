import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements'
export default function (props) {
  const [modalVisible, setModalVisible] = useState(true);
  const toggleOverlay =()=>{
    setModalVisible(!modalVisible)
  }
  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Overlay
        visible={modalVisible}
        overlayStyle={{
          width: "100%",
          height: 100,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity 
          style={styles.btnView}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20, color: '#DC0000' }}>Xoá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnView}
           onPress={()=>{toggleOverlay}}>
            <Text 
            style={{ fontFamily: 'Regular', fontSize: 20 }}
            >Quay lại</Text>
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
    marginBottom: 20
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    bottom: 4,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})