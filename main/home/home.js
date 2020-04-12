import React from 'react';
import { View ,StyleSheet} from 'react-native';

import HeaderImage from '../../template/cardList/headerCardList';
import CardList from '../../template/cardList/cardList';
import NavBar from '../../template/cardList/NavBar';
import { ScrollView } from 'react-native-gesture-handler';
export default function () {
  const cardData = [
    {
      image: 'https://reactnative.dev/img/tiny_logo.png',
      name: 'Lau chua',
      price: '12000/nguoi'
    },
    {
      image: 'https://reactnative.dev/img/tiny_logo.png',
      name: 'Lau chua',
      price: '12000/nguoi'
    },
    {
      image: 'https://reactnative.dev/img/tiny_logo.png',
      name: 'Lau chua',
      price: '12000/nguoi'
    },
    {
      image: 'https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg',
      name: 'Lau chua',
      price: '12000/nguoi'
    }
  ];
  return (
    <View style={ styles.home }>
      <HeaderImage />
      <NavBar />
      <View style={{ overflow:'scroll' }}>
      <ScrollView >
      <CardList cardData={cardData} title={'Buffet'} />
      <CardList cardData={cardData} title={'Nướng'} />
      <CardList cardData={cardData} title={'Lẩu'} />
      <CardList cardData={cardData} title={'Đồ Ngọt'} />
      </ScrollView>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  home:{
    backgroundColor: '#dee1e3'
  }
})

// <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>