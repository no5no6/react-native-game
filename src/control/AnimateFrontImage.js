/**
 * Created by yy on 16/7/8.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Text,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import MyButton from '../control/MyButton';

export default class AnimateFrontImage extends Component {
  constructor(props){
    super(props);
    let {buttonAnimate, imageAnimate, buttonAnimationOut, imageAnimationOut, text, imageHeight, imageWidth, style, imageOnPress, value, buttonOnPress, buttonText} = this.props;

    this.state = {
      buttonAnimate: buttonAnimate || '',
      imageAnimate: imageAnimate || '',
      buttonAnimationOut: buttonAnimationOut || '',
      imageAnimationOut: imageAnimationOut || '',
      imageHeight: imageHeight || 300,
      imageWidth: imageWidth || 200,
      text: '',
      style: style || {},
      text: text || '',
      callbackImage: imageOnPress || null,
      num: value || 0,
      callbackButton: buttonOnPress || null,
      buttonText: buttonText || ''
    };
  };


  buttonPress = () => {
    this.state.callback(this.text, this.num);
  };

  pokerLeave = () => {
    if(this.state.imageAnimationOut) this.refs.view[this.state.imageAnimationOut](800).then(() =>{
      if(this.state.callbackImage) this.state.callbackImage();
      if(this.state.callbackButton) this.state.callbackButton();
    });
  }

  render() {
    return (
      <View>
        <TouchableWithoutFeedback onPress={this.buttonPress} >
          <Animatable.View style={styles.animateView} animation={this.state.imageAnimate} ref="view">
            <Image
              style={[this.state.style, {height: parseInt(this.state.imageHeight), width:parseInt(this.state.imageWidth)}]}
              source={require('./../../src/images/poker-front.png')}
            />
            <Text style={styles.textWord}>{this.state.text}</Text>
          </Animatable.View>
        </TouchableWithoutFeedback>
        <MyButton style={styles.buttonPostion} animation={this.state.buttonAnimate} onPress={this.pokerLeave} text={this.state.buttonText} animationOut={this.state.buttonAnimationOut}></MyButton>
      </View>


    );
  }
}
const styles = StyleSheet.create({
  camera: {
    left: 100,
    top: 10,
  },
  animateView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWord: {
    left: 80,
    top:40,
    fontSize: 40,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  buttonPostion: {
    left: 120,
    top: 100
  }
});


AppRegistry.registerComponent('AnimateFrontImage', () => AnimateFrontImage);
