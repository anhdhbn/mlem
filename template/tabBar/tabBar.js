import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './style'
export default class tabBar extends React.Component {
  icons = [];
  constructor(props) {
    super(props)
    this.icons = [];
  }
  textStyle = (active, i) => {
    return {
      fontSize: 10,
      color: active === i ? '#e91e63' : 'grey'
    }
  }

  render() {
    var logo = ['home', 'group', 'address-book','user']
    return (
      <View style={[styles.tabs]}>
        {this.props.tabs.map((tab, i) => {
          icon = logo[i]
          return (
            <TouchableOpacity key={tab} style={styles.container}
              onPress={() => this.props.goToPage(i)} >
              <Icon
                name={icon}
                size={24}
                color={this.props.activeTab === i ? '#e91e63' : 'rgb(204,204,204)'}
                ref={(icon) => { this.icons[i] = icon; }}
                type='font-awesome'
              />
              <Text style={this.textStyle(this.props.activeTab, i)}>{tab}</Text>
            </TouchableOpacity>)
        })}
      </View>
    )
  }
}