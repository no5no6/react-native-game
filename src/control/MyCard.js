/**
 * Created by yy on 16/7/8.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';


export default class MyCard extends Component {

  constructor(props){
    super(props);
    let {onDbPress, animation, onPress, cardText, style, role, forgetState} = this.props;
    this.state = {
      animation: animation || '',
      callback: onPress || null,
      dbCallback: onDbPress || null,
      cardText: cardText || 0,
      style: style || '',
      role: role || '',
      forgetState: forgetState,
      life: true
    };
  };

  buttonPress = () => {
    const DOUBLE_PRESS_DELAY = 300;

    if(this.state.dbCallback) {
      const now = new Date().getTime();
      if (this.lastPress && (now - this.lastPress) < DOUBLE_PRESS_DELAY) {
        delete this.lastPress;
        if(this.state.life){
          this.setState({cardText: this.state.role});
          this.setState({life: false});
          this.state.dbCallback();
        }
      }else {
        this.lastPress = now;
      }
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity style={this.style} onPress={this.buttonPress}>
          <Animatable.View ref="button" style={[styles.button, this.state.style]} animation={this.state.animation} >
            <Text style={styles.buttonText}>{this.state.cardText}</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    width:80,
    height:80,
    borderRadius: 20,
    backgroundColor: 'coral',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    textAlign: 'center',
    height: 50,
    width: 20
  }
});

AppRegistry.registerComponent('MyCard', () => MyCard);
