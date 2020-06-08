import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import {
  View,

  Text,
} from "react-native";
import { TouchableOpacity } from 'react-native';
function Modal (props) {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    props.handleCancel()
  }
  handleSubmit = () => {
    props.handleSubmit()
  }
  return (
    <View>


      <Overlay isVisible={props.modalConfirmVisible} onBackdropPress={toggleOverlay}>
        <View style={{ width: 300,height:'20%', alignItems:'center',  }}>
          <View style={{ justifyContent:'center' }}>
            <View><Text style={{ fontSize: 20, padding: 25, marginTop: 10 }}>{props.title}</Text></View>
          <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
            <View>
                <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', borderRadius: 7, }}
                  onPress={() => { handleCancel() }}
                >
              <Text style={{ fontSize:18,padding:10,fontWeight:'700' }}> {props.titleCancel} </Text>
            </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{ width: 100, height: 50, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', borderRadius: 7 }}
                  onPress={() => { handleSubmit() }}
                >
              <Text style={{ fontSize:18,padding:10,color:'white',fontWeight:'700' }}> {props.titleSubmit} </Text>
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
