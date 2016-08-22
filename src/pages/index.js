/**
 * Created by yy on 16/7/5.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import MyButton from '../control/MyButton'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diClass: true
    };
  }

  wordAnimate = () => {
    this.refs.viewWo.swing(800).then((endState) =>{

      this.setState({diClass: false});
      this.refs.viewDi.swing(800).then(() =>{
        this.refs.viewWho.rubberBand(500).then(() => {
          this.refs.viewIs.rubberBand(500).then(() =>{
            this.refs.viewWo.rubberBand(500).then(() => {
              this.refs.viewDi.rubberBand(500).then(() => {

              });
            });
          });
        });
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexContainer}>
          <Animatable.View  animation='bounceInLeft' ref="viewWho">
            <Image
              style={styles.base}
              source={require('./../../src/images/who.png')}
            />
          </Animatable.View>
          <Animatable.View delay={300} animation='bounceInLeft' ref="viewIs">
            <Image
              style={styles.base}
              source={require('./../../src/images/is.png')}
            />
          </Animatable.View>
          <Animatable.View delay={900} animation='bounceInDown' ref="viewWo" onAnimationEnd={this.wordAnimate} >
            <Image
              style={styles.base}
              source={require('./../../src/images/wo.png')}
            />
          </Animatable.View>
          <Animatable.View delay={600} animation='bounceInDown' ref="viewDi">
            <Image
              style={[styles.base, this.state.diClass && styles.di]}
              source={require('./../../src/images/di.png')}
            />
          </Animatable.View>
        </View>
        <View style={styles.flexQuestionContainer}>
          <Animatable.View delay={4200} animation='fadeIn' ref="viewRobber">
            <Image
              style={styles.question}
              source={require('./../../src/images/question-middle.png')}
            />
          </Animatable.View>
        </View>
        <View style={styles.flexRobberContainer}>
          <Animatable.View delay={4000} animation='fadeIn' ref="viewRobber">
            <Image
              style={styles.question}
              source={require('./../../src/images/question-left.png')}
            />
          </Animatable.View>
          <Animatable.View delay={2400} animation='slideInUp' ref="viewRobber">
            <Image
              style={[styles.robber]}
              source={require('./../../src/images/robber.png')}
            />
          </Animatable.View>
          <Animatable.View delay={4400} animation='fadeIn' ref="viewRobber">
            <Image
              style={styles.question}
              source={require('./../../src/images/question-right.png')}
            />
          </Animatable.View>
        </View>
        <View style={styles.flexButtonContainer}>
          <MyButton text="创建游戏" url="PageSetting" animation="zoomInDown" delay={3200}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    width: 90,
    height: 90,
    flex: 1,
  },
  robber: {
    width: 250,
    height: 250,
  },
  question:{
    width: 30,
    height: 30,
  },
  di: {
    left: -45,
    top: 52,
  },
  flexContainer: {
    // 容器需要添加direction才能变成让子元素flex
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 10,
  },
  flexRobberContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 240,
    left: 30,
  },
  flexQuestionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 185,
    left: 170,
  },
  flexButtonContainer: {
    top: 240,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    left: -40,
    top: 100,
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

AppRegistry.registerComponent('Index', () => Index);
