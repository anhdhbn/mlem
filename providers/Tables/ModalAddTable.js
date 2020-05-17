import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay, Button } from 'react-native-elements'

export default function (props) {
  const {modalAddVisible,toggleModalAdd} = props.visible
  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Overlay
        isVisible={modalAddVisible}
        overlayStyle={{
          width: "100%",
          height: 150,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Thêm bàn mới</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }} >Bàn mới sẽ ở trạng thái </Text>
            <TouchableOpacity><Text style={{ fontFamily: 'Regular', fontSize: 20, color: '#00B80C' }}>Trống</Text></TouchableOpacity>
          </View>
          <View style={styles.btnView}>
            <Button
              buttonStyle={{ width: 146, height: 48, backgroundColor: '#C7c7c7', alignItems: 'center' }}
              title='Huỷ'
              onPress={() => { toggleModalAdd() }}
            />

            <Button
              buttonStyle={{ width: 146, height: 48, backgroundColor: '#DC0000', alignItems: 'center' }}
              title='Thêm'
            />
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
    borderBottomColor: '#C3C3C3',
    borderBottomWidth:1,
    borderRadius: 15,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignSelf:'center'
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