/**
 * Created by yy on 16/7/5.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View

} from 'react-native';

import AnimateBackImage from '../control/AnimateBackImage';
import AnimateFrontImage from '../control/AnimateFrontImage';
import MyCard from '../control/MyCard';
import MyButton from '../control/MyButton'

import _ from 'lodash';


export default class Game extends Component {
  constructor(props){
    super(props);
    let {matchWord1, matchWord2, sumNum, spy, civilian, white} = this.props;
    this.state = {
      wordArray: [
        {word1: '王菲', word2: '那英', type: 1},
        {word1: '元芳', word2: '展昭', type: 1},
        {word1: '麻雀', word2: '乌鸦', type: 1},
        {word1: '胖子', word2: '肥肉', type: 1},
        {word1: '眉毛', word2: '胡须', type: 1},
        {word1: '何炅', word2: '维嘉', type: 1},
        {word1: '状元', word2: '冠军', type: 1},
        {word1: '饺子', word2: '包子', type: 1},
        {word1: '端午节', word2: '中秋节', type: 1},
        {word1: '摩托车', word2: '电动车', type: 1},
        {word1: '高跟鞋', word2: '增高鞋', type: 1},
        {word1: '汉堡包', word2: '肉夹馍', type: 1},
        {word1: '小矮人', word2: '葫芦娃', type: 1},
        {word1: '蜘蛛侠', word2: '蜘蛛精', type: 1},
        {word1: '辣椒', word2: '芥末', type: 1},
      ],
      matchWord1: matchWord1 || '',
      matchWord2: matchWord2 || '',
      sumNum: sumNum || 4,
      spy: spy || 2,
      civilian: civilian || 2,
      white: white || 0,
      pokerBackRows: [],
      pokerFrontRow: [],
      groupRows: [],
      imageArray: [],
      openFullScreen: false,
      cardText: 1,
      killSpyAndWhite: 0,
      killCivilian: 0,
      forgetState: false,
      pokerBackResult: []
    };
  };

  componentDidMount(){
    this.randomWord();
    this.createPokersBack();
  };

  randomWord = () => {
    let {word1, word2} = this.state.wordArray[_.random(this.state.wordArray.length)];
    this.setState({matchWord1: word1});
    this.setState({matchWord2: word2});
  };

  changePoker = (text, num, role) => {
    this.setState({openFullScreen: true});
    this.setState({pokerFrontRow: []});
    this.setState({pokerFrontRow: this.pokerFrontRow(text, num, role)});
  };

  createCard = (text, num, role) => {
    if(this.state.sumNum === this.state.cardText){
      this.setState({pokerBackRows: []});
      this.setState({pokerFrontRow: []});
    }
    this.setState({openFullScreen: false});
    this.setState({groupRows: this.addCard(text, num, role)});
  };

  cardDbPress = (arrayIndex) => {
    let person = this.state.pokerBackResult[arrayIndex-1];
    this.setState({cardText: person.props.role});
    if(person.props.role === '卧底' || person.props.role === '白板' ){
      this.setState({killSpyAndWhite: this.state.killSpyAndWhite + 1}, () => {
        this.getGameRule();
      });
    }else {
      this.setState({killCivilian: this.state.killCivilian + 1}, () => {
        this.getGameRule();
      });
    }
  };

  getGameRule = (role) => {
    if(this.state.killSpyAndWhite === this.state.spy + this.state.white){
      alert('平民获胜');
    }else if(this.state.sumNum - (this.state.killSpyAndWhite + this.state.killCivilian) === parseInt(this.state.civilian / 2 + 1)){
      alert('卧底获胜');
    }
  };

  addCard = (text, num, role) => {
    console.log(num, 'num ');
    this.state.groupRows.push(
      <MyCard
        key={'myCard' + num}
        style={{marginLeft: 35, marginTop: 20, flex:1}}
        animation= 'tada'
        cardText = {this.state.cardText}
        arrayIndex={num}
        onDbPress={() => this.cardDbPress(num)}
        role={role}
        forgetState= {this.state.forgetState}
      >
      </MyCard>
    )

    this.setState({cardText: this.state.cardText+1});

    return this.state.groupRows;
  }

  pokerFrontRow = (text, num, role) => {

    let pokerFrontRow =
      <AnimateFrontImage
        key='selectPoker'
        style={{left: 80, top: 120}}
        buttonAnimate="fadeInDown"
        imageAnimate="bounceIn"
        imageHeight={300}
        imageWidth={220}
        text={text}
        num={num}
        buttonOnPress={() => this.createCard(text, num, role)}
        buttonText= "我记住了"
        buttonAnimationOut="fadeOutDown"
        imageAnimationOut="bounceOut"
        sumNum = {this.state.sumNum}
        cardText = {this.state.cardText}
      >
      </AnimateFrontImage>

    return pokerFrontRow;
  };

  createPokersBack = () => {
    let arr = _.range(1, this.state.sumNum+1);
    this.setState({imageArray: _.cloneDeep(arr)}, () =>{
      let whiteArray = this.randomRole(this.state.white);
      let spyArray = this.randomRole(this.state.spy);

      let pokerBackRows = arr.reduce((memo, value) => {
        let text = '';
        let role = '';
        if(_.indexOf(whiteArray, value) > -1){
          text = '';
          role = '白板';
        }
        if(_.indexOf(spyArray, value)  > -1){
          text = this.state.matchWord1;
          role = '卧底';
        }
        if(_.indexOf(this.state.imageArray, value)  > -1){
          text = this.state.matchWord2;
          role = '平民';
        }

        memo.push(
          <AnimateBackImage
            key={'pokerBack'+ value}
            style={{left: 0 - value * 120}}
            animate="bounceInLeft"
            imageHeight={220}
            imageWidth={150}
            text={text}
            role={role}
            onPress={() => this.changePoker(text, value, role)}
          >
          </AnimateBackImage>
        );
        return memo;
      }, []);
      this.setState({pokerBackRows: pokerBackRows});
      this.setState({pokerBackResult: pokerBackRows});
    });
  };

  randomRole = (role) =>{
    let arr =  _.sampleSize(this.state.imageArray, role);
    _.pullAllWith(this.state.imageArray, arr);
    return arr;
  };

  getForgetWord = () => {
    console.log('setState forgetState')
    // this.refs.setNativeProps();
    //this.refs['cards'].setNativeProps({forgetState: true});
    this.setState({forgetState: true});
  }

  render() {

    return (
      <View>
        <View ref="acv" style={styles.viewRow}>
          <Text style={styles.textTittle}>请玩家依次传递手机看词</Text>
        </View>
        <View ref='cards' style={styles.viewGroup}>
          {this.state.groupRows}
        </View>
        <View ref="viewPoker" style={[styles.viewRow, styles.AnimateImage]}>
          {this.state.pokerBackRows}
        </View>
        <View style={this.state.openFullScreen ? styles.loadingView : styles.loadingViewHidden}></View>
        <View style={this.state.openFullScreen ? styles.AnimateImageFront : styles.pokerFrontHidden}>{this.state.pokerFrontRow}</View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  viewColumn: {
    flexDirection: 'column',
    top: 50,
    left: 10,
  },
  viewGroup: {
    top: 70,
    flexWrap:'wrap',
    flexDirection:'row',
    position: 'absolute',
  },
  viewRow: {
    flexDirection: 'row',
    position: 'absolute',
  },
  textTittle: {
    top: 50,
    left: 100,
  },
  AnimateImage: {
    left: 150,
    top:300,
  },
  AnimateImageFront: {
    position: 'absolute',
    top: 0,
  },
  loadingView: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 10000,
    width: 10000,
  },
  loadingViewHidden: {
    height: 0,
    opacity: 0
  },
  pokerFrontHidden: {
    width: 0,
    height: 0,
    opacity: 0
  },
  forgetButtom: {
    top: 600,
    left: 100
  }
});

AppRegistry.registerComponent('Game', () => Game);
