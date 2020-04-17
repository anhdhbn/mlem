import React, {useState} from 'react';
import {View, Button, Platform,Text,TouchableOpacity,Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Fontisto';
import moment from 'moment';

const datePicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateShow,setDateShow] = useState('17/1/2020')
  const [timeShow,setTimeShow] = useState('20:30')

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if(mode=== 'date'){
      setDateShow(moment(currentDate).format('DD/MM/YYYY'))
    }
    if(mode === 'time'){
      setTimeShow(moment(currentDate).format('HH:mm'))
    }
  };
  

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      {/* <View>
        <Button onPress={showDatepicker} title="Show date time picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View> */}
      
      <View style={{ backgroundColor: 'white', height: 50,flexDirection:'row',justifyContent:'space-around',borderRadius: 6,
              elevation: 3,
              backgroundColor: "#fff",
              shadowOffset: { width: 1, height: 1 },
              shadowColor: "#333",
              shadowOpacity: 0.3,
              shadowRadius: 2, }}>
        <TouchableOpacity onPress={showDatepicker} style={{flexDirection:'row',marginTop:5}}>
          <Icon name="date" size={30}  color="#bf2315" style={{ marginTop: 4}}/>
          <Text style={{ fontSize:20,marginTop:8,marginLeft:4 }}>{dateShow}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimepicker} style={{flexDirection:'row',marginTop:5}}>
          <Icon name="stopwatch" size={30}  color="#bf2315" style={{ marginTop: 4}}/>
          <Text style={{ fontSize:20,marginTop:8,marginLeft:4 }}>{timeShow}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default datePicker;