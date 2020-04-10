import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function (props) {
  const { cardData, title } = props;
  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
        <TouchableOpacity >
          <Text style={{marginLeft:'auto'}} >Xem Tất Cả >></Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        data={cardData}
        renderItem={({ item }) => {
          return <View style={{
            padding: 5
          }}>
            <TouchableOpacity>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
              />

              <Text style={styles.foodname}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        }}
      >
      </FlatList>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    top: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodname: {
    fontSize: 16,
  },
  price: {
    fontSize: 13,
    color: '#009FFF'
  }
})