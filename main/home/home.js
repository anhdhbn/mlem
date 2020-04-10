import React from 'react';
import { View } from 'react-native';

import HeaderImage from '../../template/cardList/headerCardList';
import CardList from '../../template/cardList/cardList';
import NavBar from '../../template/cardList/NavBar';
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
    <View >
      <HeaderImage />
      <NavBar />
      <CardList cardData={cardData} title={'Buffee'} />
      <CardList cardData={cardData} title={'Buffee'} />
    </View>
  )
}