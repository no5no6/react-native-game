/**
 * Created by yy on 16/7/5.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Slider,
  Switch,
  TouchableOpacity,
  TextInput,
  View

} from 'react-native';

import MyButton from '../control/MyButton'
import MySwitch  from '../control/MySwitch'
import * as Animatable from 'react-native-animatable';

import { Actions } from 'react-native-router-flux';

export default class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {
      sumNum: 4,
      spy:1,
      civilian: 3,
      isWhite: false,
      white: 0,
      maxSpy: 2,
      isSetWordByMyself: false,
      setWord1: '',
      setWord2: '',
    };
  };

  setSumValue = (value) => {
    let spyNum = Math.floor(value / 3);
    this.setState({sumNum: value});
    this.setState({spy: spyNum});
    this.setState({civilian: value-spyNum});
    this.setState({maxSpy: Math.floor(value/2) - this.state.white});
  };

  whiteCount = (value) => {
    this.setState({isWhite: value});
    console.log(value, '1111111');
    if(value){
      this.setState({white: 1});
      if(this.state.spy + this.state.white < this.state.maxSpy){
        this.setState({civilian: this.state.civilian - 1});
      }else{
        this.setState({spy: this.state.spy - 1});
      }
    }else{
      this.setState({white: this.state.white - 1});
      this.setState({spy: this.state.spy + 1});
    }
  };

  add = () => {
    if(this.state.spy + this.state.white < this.state.maxSpy){
      this.setState({spy : this.state.spy + 1});
      this.setState({civilian: this.state.civilian - 1});
    }

    this.animate()
  };

  sub = () => {
    if(this.state.spy > 1){
      this.setState({spy : this.state.spy - 1});
      this.setState({civilian: this.state.civilian + 1});
    }

    this.animate();
  };

  animate = () => {
    this.refs.textSpy.bounce(800);
    this.refs.textCivilian.bounce(800);
  };

  setWordsByMyself = (value) => {
    this.setState({isSetWordByMyself: value});
  };

  getSetWordsByMySelf = () => {
    let obj = {
      sumNum: this.state.sumNum,
      spy: this.state.spy,
      civilian: this.state.civilian,
      white: this.state.white,
      matchWord1:this.state.setWord1,
      matchWord2: this.state.setWord2,
    }
    Actions.PageGame(obj);
  };


  render() {

    return (
      <View style={styles.viewColumn}>
        <View>
          <Text>游戏设置</Text>
        </View>
        <View style={styles.viewSettingItems}>
          <Text>参数人数:{this.state.sumNum}</Text>
          <Slider
            style={styles.sliderSumNum}
            step={1}
            minimumValue={4}
            maximumValue={12}
            onValueChange={this.setSumValue} />
          <View style={[styles.viewRow, styles.center]}>
            <Text>卧底</Text>
            <Animatable.Text ref="textSpy" style={styles.left10}>{this.state.spy}</Animatable.Text>
            <Text style={styles.viewSettingCivilian}>平民</Text>
            <Animatable.Text ref="textCivilian" style={styles.left30}>{this.state.civilian}</Animatable.Text>
            <Text style={styles.textWhite}>白板</Text>
            <MySwitch style={styles.viewSettingSwitch} value={this.state.isWhite} onChange={this.whiteCount} />
            <Text style={styles.viewSettingWhite}>{this.state.isWhite ? '开' : '关'}</Text>
          </View>
          <View style={[styles.center, styles.buttonSpy, styles.viewRow]}>
            <Text>卧底人数调整:</Text>
            <TouchableOpacity onPress={this.add} style={styles.leftAdd}>
              <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.sub} style={styles.rightAdd}>
              <Text>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.textByMyself}>
          <View style={[styles.viewRow, styles.center]}>
            <Text>自定义词组</Text>
            <MySwitch style={styles.SetWordSwitch} value={this.state.isWordByMyself} onChange={this.setWordsByMyself} />
            <Text style={styles.textByMyselfSwich}>{this.state.isSetWordByMyself ? '开' : '关'}</Text>
          </View>
          <TextInput value={this.state.setWord1} onChangeText={(setWord1) => this.setState({setWord1})} editable={this.state.isSetWordByMyself} style={[styles.textWordByMyself, styles.textWordTopOne, (this.state.isSetWordByMyself ? '' : styles.textDisable)]} placeholder="请输入词一"></TextInput>
          <TextInput value={this.state.setWord2} onChangeText={(setWord2) => this.setState({setWord2})} editable={this.state.isSetWordByMyself} style={[styles.textWordByMyself, styles.textWordTopTwo, (this.state.isSetWordByMyself ? '' : styles.textDisable)]} placeholder="请输入词二"></TextInput>
        </View>
        <View style={styles.beginButton}>
          <MyButton onPress={this.getSetWordsByMySelf} text="开始游戏"></MyButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewColumn: {
    flexDirection: 'column',
    position: 'absolute',
    top: 50,
    left: 10,
  },
  viewSettingItems:{
    top: 50,
    left: 50,
  },
  viewRow: {
    flexDirection: 'row',
    position: 'absolute',
  },
  viewSettingCivilian: {
    left: 20,
  },
  viewSettingSwitch: {
    left: 75,
  },
  SetWordSwitch:{
    left: 105,
  },
  viewSettingWhite: {
    left: 80,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSpy: {
    top: 100,
  },
  sliderSumNum: {
    width: 260
  },
  leftAdd: {
    width:30,
    height:30,
    borderRadius: 15,
    backgroundColor: 'coral',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    left: 20,
  },
  rightAdd: {
    left: 40,
    width:30,
    height:30,
    borderRadius: 15,
    backgroundColor: 'coral',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textByMyself: {
    left: 50,
    top: 210,
    flexDirection: 'column',
    position: 'absolute',
  },
  beginButton: {
    left: 100,
    top: 330,
  },
  textWhite: {
    left: 50,
  },
  left10: {
    left: 10,
  },
  left30: {
    left: 30,
  },
  textWordByMyself: {
    height: 30,
    width: 150,
    borderWidth: 1,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  textWordTopOne: {
    top: 50,
  },
  textWordTopTwo: {
    top: 70,
  },
  textByMyselfSwich: {
    left: 110,
  },
  textDisable: {
    backgroundColor: 'gainsboro',
  }
});

AppRegistry.registerComponent('Setting', () => Setting);
