import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import {
  View,

  Text,
} from "react-native";
import { TouchableOpacity } from 'react-native';
function Modal(props) {
  const {
    visible,
    setVisible,
    handleSubmit,
  } = props.data
  const {
    title,
    titleSubmit,
    titleCancel
  } = props.button
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ width: 300, height: '20%', alignItems: 'center', }}>
          <View style={{ justifyContent: 'center' }}>
            <View><Text style={{ fontSize: 20, padding: 25, marginTop: 10 }}>{title}</Text></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 7, }}
                  onPress={() => { toggleOverlay() }}
                >
                  <Text style={{ fontSize: 18, padding: 10, fontWeight: '700' }}> {titleCancel} </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}
                  onPress={() => { handleSubmit() }}
                >
                  <Text style={{ fontSize: 18, color: 'white', fontWeight: '700' }}> {titleSubmit} </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Overlay>
    </View>
  );
};
export default Modal;
