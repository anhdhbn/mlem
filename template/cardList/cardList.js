import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function (props) {
  const { cardData, title } = props;
  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Text style={styles.title}>
          {title.toUpperCase()}
        </Text>
        <View  style={styles.seeAll}>
        <TouchableOpacity>
          <Text  style={{ fontSize:11,color:'#de3333'}}>Xem Tất Cả >></Text>
        </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={cardData}
        renderItem={({ item }) => {
          return <View style={{
            paddingBottom:2,
          }}>
            <TouchableOpacity style={{ backgroundColor: '#f0f3f5',padding:4,borderRadius:10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 130, height: 110 }}
              />

              <Text style={styles.foodname}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        }}
      >
      </FlatList>
    </ScrollView>

  )
}
const styles = StyleSheet.create({
  container: {
    // top: 155,
    marginTop:4,
    backgroundColor:'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 8
  },
  seeAll:{
    marginLeft:250,
    marginTop: 8
  },
  foodname: {
    fontSize: 11,
  },
  price: {
    fontSize: 9,
    color: '#009FFF'
  }
})