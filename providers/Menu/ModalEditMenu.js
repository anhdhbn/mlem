import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet} from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler';
export default function (props) {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        style={{ width: 50 }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity  style={styles.btnView}>
              <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Tuỳ chỉnh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnView}>
              <Text style={{ fontFamily: 'Regular', fontSize: 20, color: '#DC0000' }}>Xoá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnView}>
              <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Quay lại</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowRadius: 10, 
    marginTop: 22
  },
  content: {
    top: '85%',
    margin:3,
    backgroundColor: "#AFAFAF",
    borderRadius: 15,
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
    marginBottom: 2,
    backgroundColor: 'white',
    alignItems: 'center',
  }
})