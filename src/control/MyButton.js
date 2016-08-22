/**
 * Created by yy on 16/7/6.
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
import { Actions } from 'react-native-router-flux';

export default class MyButton extends Component {
  constructor(props){
    super(props);
    let {text, url, delay, animation, onPress, param, style, animationOut} = this.props;
    this.state = {
      text: text || '',
      url: url || '',
      delay: delay || 0,
      animation: animation || '',
      callback: onPress || null,
      param: param || {},
      style: style || {},
      animationOut: animationOut || ''
    };
  };


  buttonPress = () => {
    if(this.state.url) Actions[this.state.url](this.state.param);
    if(this.state.callback) this.state.callback();
    if(this.state.animationOut) this.refs.button[this.state.animationOut](800);
  };

  render() {

    return (
      <View>
        <TouchableOpacity  onPress={this.buttonPress}>
          <Animatable.View ref="button" style={[styles.button, this.state.style]} animation={this.state.animation} delay={this.state.delay} >
            <Text style={styles.buttonText}>{this.state.text}</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    width:150,
    height:40,
    borderRadius: 20,
    backgroundColor: 'coral',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('MyButton', () => MyButton);
