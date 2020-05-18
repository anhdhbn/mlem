import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { createStackNavigator } from '@react-navigation/stack';

import viewMoreIcon from '../../assets/icon/view_more.png';
import dropDownIcon from '../../assets/icon/drop_down.png';

const OrderStack = createStackNavigator();
/*OrderStackScreen  */
export default ({ navigation }) => (
  <OrderStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'

  }}>
    <OrderStack.Screen
      name="Home"
      component={Order}
      options={{
        title: 'Đơn Đặt Hàng',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        ),
        
      }}
    />
  </OrderStack.Navigator>
)
const Order= (props)=> {
  
  const data = [
    { id: '1', customerName: 'Đinh Tiến Đạt', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '2', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '3', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '4', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '5', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '6', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '7', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' },
    { id: '8', customerName: 'Dtd', status: 'active', phoneNumber: '0000000', price: '500000vnd' }

  ];
  return (<View style={styles.container}>
    <View style={styles.filterBar}>
      <TouchableOpacity style={{flexDirection:'row'}}>
        <Text>Sắp Xếp </Text>
        <Image source={dropDownIcon} style={{height:15,width:15,top:3}}/>
      </TouchableOpacity>
      <TouchableOpacity  style={{flexDirection:'row'}}>
        <Text>Hôm nay </Text>
        <Image source={dropDownIcon} style={{height:15,width:15,top:3}}/>
      </TouchableOpacity>
      <TouchableOpacity  style={{flexDirection:'row'}}>
        <Text>Trạng thái </Text>
        <Image source={dropDownIcon} style={{height:15,width:15,top:3}}/>
      </TouchableOpacity>
    </View>
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity 
          style={styles.card}
          onpress={()=>{props.navigation.navigate('DetailOrder')}}
          >
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{item.customerName}</Text>
              <Text style={{ fontFamily: 'Reguler', color: '#8A8F9C', fontSize: 14 }}>{item.phoneNumber}</Text>
              <Text style={{ fontFamily: 'Reguler', color: '#8A8F9C', fontSize: 14 }}>{item.status}</Text>
            </View>
            <View style={{ flexDirection: 'row', top: 10 }}>
              <Text style={{
                fontFamily: 'Reguler',
                color: '#D20000',
                fontSize: 20,

              }}>
                {item.price}
              </Text>
              <Image source={viewMoreIcon} style={{ height: 15, width: 15, top: 7 }} />
            </View>
          </TouchableOpacity>
        )
      }}
    />
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  filterBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between'
  },
  card: {
    width: '100%',
    marginTop:10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
