import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, SafeAreaView } from 'react-native';

import HeaderImage from '../../template/cardList/headerCardList';
import CardList from '../../template/cardList/cardList';
import NavBar from '../../template/cardList/NavBar';
import { ScrollView } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper'
export const { width, height } = Dimensions.get('window');

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
    < >
      {/* <Swiper showsButtons={false} autoplay={true} autoplayTimeout={2} showsPagination={false} style={{ height: 155 }}>
        <View style={styles.child}>
          <Image style={styles.slide} source={require('../../icon/slider/1.jpg')} />
        </View>
        <View style={styles.child}>
          <Image style={styles.slide} source={require('../../icon/slider/2.png')} />
        </View>
        <View style={styles.child}>
          <Image style={styles.slide} source={require('../../icon/slider/3.jpg')} />
        </View>
        <View style={styles.child}>
          <Image style={styles.slide} source={require('../../icon/slider/4.jpg')} />
        </View>
      </Swiper> */}
      <HeaderImage/>
      <ScrollView style={styles.home}>
        {/* <HeaderImage /> */}

        <NavBar />
        <View style={{ overflow: 'scroll' }}>
          <ScrollView >
            <CardList cardData={cardData} title={'Buffet'} />
            <CardList cardData={cardData} title={'Nướng'} />
            <CardList cardData={cardData} title={'Lẩu'} />
            <CardList cardData={cardData} title={'Đồ Ngọt'} />
          </ScrollView>
        </View>
        <Image source={require('../../icon/slider/1.jpg')} />
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  home: {
    backgroundColor: '#dee1e3',
    flex: 1,
    top:155,
    position:'absolute'
  },
  swipper: {
    height: 155,
    width,
  },
  child: {
    height: 155,
    width,
    justifyContent: 'center'
  },
  slide: {
    width,
    height: 155,
    resizeMode: 'cover',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  }
})

// <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => <Item title={item.title} />}
//         keyExtractor={item => item.id}
//       />
//     </SafeAreaView>