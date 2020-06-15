import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

function Toaster(props) {
  const {
    notification,
    visible,
    setVisible
  } = props.data
/*   const [visible, setVisible] = useState(true); */

  React.useEffect(() => {
    setTimeout(() => {
      visible ===true && setVisible(false);
    }, 2000)
  },
    []);

  return (

    <View>

      <Overlay isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: '#5897fc',
          width: '100%',
          top: 0,
          position: 'absolute'

        }}
        backdropStyle={{
          opacity: 0
        }}
      >
        <View style={{
          height: 25,
          alignItems: 'center'
        }}>
          <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: '500' }}
          >{notification} !</Text>
        </View>
      </Overlay>
    </View>
  );
}
export default Toaster;
