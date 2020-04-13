// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {Icon} from 'react-native-vector-icons/Ionicons'
// import { MaterialCommunityIcons } from 'react-native-vector-icons';
// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed!</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// function Notifications() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       tabBarOptions={{
//         activeTintColor: '#e91e63',
//         color:'grey',
//         size: 25,
//         showIcon:true
//       }}
//     >
//       <Tab.Screen
//         name="Feed"
//         component={Feed}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: () => {
//             return(
//               <Icon size={ 20 } name={ 'cogs' } color={ 'red' }/>
//             )
//           }
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{
//           tabBarLabel: 'Updates',
          
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: 'Profile',
          
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyTabs />
//     </NavigationContainer>
//   );
// }







import React, { Component } from 'react'
import { AppRegistry,Dimensions,Image, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'
export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  
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

export default class SwiperComponent extends Component {
  render() {
    return (
      <Swiper  showsButtons={false} autoplay={true} autoplayTimeout={8} showsPagination={false}>
            <View style={styles.child}>
             <Image style={styles.slide} source={ require('./icon/slider/1.jpg')} />
           </View>
           <View style={styles.child}>
           <Image style={styles.slide} source={ require('./icon/slider/2.png')} />
           </View>
           <View style={styles.child}>
           <Image style={styles.slide} source={ require('./icon/slider/3.jpg')} />
           </View>
           <View style={styles.child}>
           <Image style={styles.slide} source={ require('./icon/slider/4.jpg')} />
           </View>
      </Swiper>
    )
  }
}