import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

import buffet from '../../icon/food/buffet.png';
import seafood from '../../icon/food/seafood.png';
import vegetable from '../../icon/food/food.png';
import meat from '../../icon/food/meat.png';
import wine from '../../icon/food/wine-bottle.png';
import all from '../../icon/food/supermarket.png';
export default function () {
  const kindFoods = [
    {
      id: '1',
      name: 'Tất Cả',
      icon: all
    },
    {
      id: '2',
      name: 'Lẩu-buffet',
      icon: buffet
    },
    {
      id: '3',
      name: 'Hải Sản',
      icon: seafood
    },
    {
      id: '4',
      name: 'Rau Củ',
      icon: vegetable
    },
    {
      id: '5',
      name: 'Thịt',
      icon: meat
    },
    {
      id: '6',
      name: 'Đồ Uống',
      icon: wine
    },
  ]
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={kindFoods}
        renderItem={({ item }) => {
          return (<TouchableOpacity style={styles.element}>
            <Image source={item.icon} style={styles.icon} />
            <Text>{item.name}</Text>
          </TouchableOpacity>)
        }}
        keyExtractor={item => item.id}
      >

      </FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // top:155,
    marginTop: 4,
    backgroundColor: 'white'
  },
  element: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
})