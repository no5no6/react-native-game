/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import PageIndex from './src/pages/index';
import PageGame from './src/pages/game';

import PageSetting from './src/pages/setting';


class News extends Component {

  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar="false">
          <Scene key="PageIndex" component={PageIndex} title="欢迎来到谁是卧底" initial={true}/>
          <Scene key="PageSetting" component={PageSetting} title="游戏设置" />
          <Scene key="PageGame" component={PageGame} title="游戏开始" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('News', () => News);
