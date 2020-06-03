import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import search from "../../assets/icon/search.png";
import dropDownIcon from '../../assets/icon/drop_down.png';

import ModalEditTable from './ModalEditTable'
import tableServices from '../../providerServices/tableServices';
const TableStack = createStackNavigator();
/* TableStackScreen */
export default TableStackScreen = ({ navigation }) => {
  const [editTableVisible, setEditTableVisible] = useState(false);
  const toggleEditTable = () => {
    setEditTableVisible(!editTableVisible);
  }
  return (
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

  )
}
const Table = (props) => {
  const [emptyTable,setEmptyTable] = useState(0)
  const [editTableVisible, setEditTableVisible] = useState(false);
  const [selectTable,setSelectTable]= useState(null);
 
  const toggleEditTable = (props) => {
    return () => {
      !editTableVisible && setSelectTable(props);
      setEditTableVisible(!editTableVisible);
    }
  };
  /* xoá món ăn đang được chọn */
  const handleDelete = async () => {
    setEditTableVisible(!editTableVisible);
    await tableServices.deleteTable(selectTable);
    getData();
  }
  /* const toggleEditTable = (props) => {
    return async()=>{
     editTableVisible===false ? await setSelectTable(props) : await getData()
      setEditTableVisible(!editTableVisible);
    }
  } */
  const [data, setData] = useState([]);
  const getData = async () => {
    const params = {};
    const respone = await tableServices.list(params)
    setData(respone);
  }
  useEffect(async() => {
   await getData();
  }, [])
  /* const data = {
    total: 50,
    emptyTable: 50,
    tables: [{ tableNum: '001', status: 'Trống' }, { tableNum: '002', status: 'Trống' }, { tableNum: '003', status: 'Trống' }]
  } */
  const countEmptyTables = async(tables)=>{
    let count = 0;
   await  tables.forEach(table => {
      table.statusId=="1" ? count ++ :null  
    });
    return count
  }
  return (<View style={styles.container}>
    
    <View style={styles.topView}>
      <Text style={{ color: '#00B80C', fontWeight: 'bold' }}>Bàn còn trống: {emptyTable}</Text>
      <Text style={{ color: '#00B80C', fontWeight: 'bold' }}>Tổng số: {data.length}</Text>
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
          placeholder={"Mã...."}
          placeholderTextColor='#B20'
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
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.cardView}
              onPress={toggleEditTable(item)}
            >
              <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#8A8F9C' }}>{item.code}</Text>
              {item.status.id == 1
                ? <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#00B80C' }}>Hoạt động</Text>
                : <Text style={{ fontFamily: 'Regular', fontSize: 16, color: '#DC0000' }}>Trống</Text>}
            </TouchableOpacity>
          )
        }}
      />
      <ModalEditTable visible={{ editTableVisible, toggleEditTable }} data={{handleDelete}} />
    </View>
  </View>)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7'
  },
  topView: {
    marginTop:15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FFFFFF',
    bottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
    borderRadius:8,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    borderRadius:3,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,


  }
})
