import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Overlay,Button } from 'react-native-elements'

import search from "../../assets/icon/search.png";
import dropDownIcon from '../../assets/icon/drop_down.png';
import TickIcon from '../../assets/icon/tick.png'

export default function (props) {
  const [modalVisible, setModalVisible] = useState(true);
  const data = [
    { id: '1', kindOfFood:'Lẩu-buffet' },
    { id: '2', kindOfFood:'Lẩu-buffet' },
    { id: '3', kindOfFood:'Lẩu-buffet' },
    { id: '4', kindOfFood:'Lẩu-buffet' },
  ]

  return (
    <View style={{ backgroundColor: '#c3c3c3' }}>
      <Overlay
        isVisible={modalVisible}
        overlayStyle={{
          width: "100%",
          height: 350,
          position: "absolute",
          bottom: 0,
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={{ fontFamily: 'Regular', fontSize: 20 }}>Chọn nhóm</Text>
          </View>
          <View style={styles.toolView}>
            <View style={styles.viewInput}>
              <Image
                source={search}
                style={{ width: 13, height: 13, marginLeft: 10, marginTop: 13 }}
              />
              <TextInput
                style={styles.input}
                placeholder={"Mã...."}
              ></TextInput>
            </View>
            <View style={{ flexDirection: 'row', top: 10 }}>
              <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#8A8F9C' }}>Trạng thái</Text>
              <TouchableOpacity>
                <Image source={dropDownIcon} style={{ height: 15, width: 15, top: 3, left: 3 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ top: 4 ,height:'60%' }}>
            <FlatList showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.cardView}>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity>
                        <Image source={TickIcon} style={styles.iconstyle} />
                      </TouchableOpacity>
                      <Text>{item.kindOfFood}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
        <View style={styles.btnView}>
          <Button 
          buttonStyle={{ width: 146, height: 48, backgroundColor: '#C7c7c7', alignItems: 'center' }}
          title='Huỷ'
          onPress={()=>{setModalVisible(false)}}
          />
          
          <Button 
           buttonStyle={{ width: 146, height: 48, backgroundColor: '#DC0000', alignItems: 'center' }}
           title='Thêm'   
          />
        </View>
      </Overlay>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowRadius: 10,
    backgroundColor: '#707070',
  },
  titleView: {
    padding: 5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  toolView: {
    top: 3,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  viewInput: {
    width: 230,
    borderRadius: 20,
    height: 39,
    marginLeft: 10,
    backgroundColor: "#c4c1c0",
    flexDirection: "row",
    overflow: "hidden",
    shadowOpacity: 0.5,
  },
  cardView: {
    marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 10
  },
  iconstyle: {
    width: 18,
    height: 18,
    marginRight: 10,
    marginLeft: 10
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around', 
    padding:10
  },
})