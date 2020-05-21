import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import search from "../../assets/icon/search.png";
import dropDownIcon from '../../assets/icon/drop_down.png';

import ModalEditTable from './ModalEditTable'

const TableStack = createStackNavigator();
/* TableStackScreen */
export default TableStackScreen = ({ navigation }) => {
  const [editTableVisible, setEditTableVisible] = useState(false);
  const toggleEditTable = () => {
    setEditTableVisible(!editTableVisible);
  }
  return(
  <TableStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#D20000',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff'
  }}>
    <TableStack.Screen
      name="Table"
      component={Table}
      options={{
        title: 'Bàn',
        headerLeft: () => (
          <Icon.Button name='ios-menu' size={25} backgroundColor='#D20000' onPress={() => { navigation.openDrawer() }}></Icon.Button>
        ),
        headerRight: () => (
          <AntDesign.Button name='plus' size={25} backgroundColor='#D20000' onPress={() => { }}></AntDesign.Button>
        ),
      }}
    />
  </TableStack.Navigator>

)}
const Table = (props) => {
  const [editTableVisible, setEditTableVisible] = useState(false);
  const toggleEditTable = () => {
    setEditTableVisible(!editTableVisible);
  }
  const data = {
    total: 50,
    emptyTable: 50,
    tables: [{ tableNum: '001', status: 'Trống' }, { tableNum: '002', status: 'Trống' }, { tableNum: '003', status: 'Trống' }]


  }
  return (<View style={styles.container}>
    <View style={styles.topView}>
      <Text style={{ color: '#00B80C', fontWeight: 'bold' }}>Bàn còn trống: {data.total}</Text>
      <Text style={{ color: '#00B80C', fontWeight: 'bold' }}>Tổng số: {data.emptyTable}</Text>
    </View>
    {/*  */}
    <View style={styles.toolView}>
      <View style={styles.viewInput}>
        <Image
          source={search}
          style={{ width: 13, height: 13, marginLeft: 10, top: 15 }}
        />
        <TextInput
          style={styles.input}
          placeholder={"press to search...."}
        ></TextInput>
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', top: 10, right: 10 }}>
        <Text style={{ color: '#8A8F9C' }}>Trạng thái</Text>
        <Image source={dropDownIcon} style={{ height: 15, width: 15, top: 3, left: 3 }} />
      </TouchableOpacity>
    </View>
    {/* Card View */}
    <View>
      <FlatList
        data={data.tables}
        keyExtractor={item => item.tableNum}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.cardView}
              onLongPress={toggleEditTable}
            >
              <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#8A8F9C' }}>{item.tableNum}</Text>
              <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#00B80C' }}>{item.status}</Text>
            </TouchableOpacity>
          )
        }}
      />
      <ModalEditTable visible={{editTableVisible,toggleEditTable}} />
    </View>
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7'
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    bottom: 8,
    marginTop: 3,
  },
  viewInput: {
    width: '50%',
    borderRadius: 10,
    height: 42,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    overflow: "hidden",
    shadowOpacity: 0.5,
  },
  toolView: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    padding: 5

  }
})
