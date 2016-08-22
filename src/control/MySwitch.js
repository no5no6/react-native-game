/**
 * Created by yy on 16/7/7.
 */


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  View

} from 'react-native';

export default class MySwitch extends Component {
  constructor(props){
    super(props);
    let {istrue, onChange, onTintColor, thumbTintColor, tintColor, style} = this.props;
    this.state = {
      value: istrue || false,
      callback: onChange || '',
      onTintColor: onTintColor || 'lightsalmon',
      thumbTintColor: thumbTintColor || 'indianred',
      tintColor: tintColor|| 'lightsalmon',
      style: style
    };
  };
  switchWhite = (value) => {
    this.setState({value: value});
    this.state.callback(value);
  };

  render() {

    return (
      <Switch
        style={this.state.style}
        onValueChange={this.switchWhite}
        value={this.state.value}
        onTintColor={this.state.onTintColor}
        thumbTintColor={this.state.thumbTintColor}
        tintColor={this.state.tintColor}
      />
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('MySwitch', () => MySwitch);
