import React from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import TickIcon from '../../assets/icon/tick.png'
export default function (props) {
  const data = [
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: '001',
      buzzTime: '1 phút trước',
      id: '1',

    },
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: '002',
      buzzTime: '1 phút trước',
      id: '2',

    },
    {
      image: "https://reactnative.dev/img/tiny_logo.png",
      tableNum: '003',
      buzzTime: '1 phút trước',
      id: '3',

    },
  ]
  return (<View style={styles.container}>
    <FlatList
      data={data}
      keyExtractor={item => { item.id }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={styles.cardView}>
            <View style={{flexDirection:'row'}}>
              <Image
                source={{ uri: item.image }}
                style={styles.avatar}
              />
              <View>
                <Text style={{fontFamily:'Regular',fontSize:18}}>{item.tableNum}</Text>
                <Text style={{fontFamily:'Regular',fontSize:12, color:'#8A8F9C'}}>Buzz!!!</Text>
                <Text style={{fontFamily:'Regular',fontSize:12, color:'#8A8F9C'}}>{item.buzzTime}</Text>
              </View>
            </View>
            <Image source={TickIcon} style={{ height: 18, width: 18, top:25}} />
          </TouchableOpacity>
        )
      }}
    />

  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7'
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:10,
    backgroundColor:'#FFFFFF',
    marginTop:5
  },
  avatar: {
    height: 67,
    width: 67,
    borderRadius: 50,
    right:10,
  }
})
