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
          height: 100,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>

            <TouchableOpacity style={styles.btnView}>
              <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Thêm bàn mới</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }} >Bàn mới sẽ ở trạng thái </Text>
            <TouchableOpacity><Text style={{ fontFamily: 'Regular', fontSize: 20, color: '#00B80C' }}>Trống</Text></TouchableOpacity>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity style={{ width: 146, height: 48, backgroundColor: '#C7c7c7', alignItems: 'center' }}>
              <Text style={{ top: 10 }}>Huỷ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 146, height: 48, backgroundColor: '#DC0000', alignItems: 'center' }}>
              <Text style={{ top: 10, color: '#ffffff' }}>Thêm</Text>
            </TouchableOpacity>
          </View>
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
    margin: 3,
    borderBottomColor:'#C3C3C3',
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})