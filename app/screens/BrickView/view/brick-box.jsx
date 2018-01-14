/**
 * Created by CS99 on 07/03/2017.
 */
const React = require('react');
const BriksData = require('../tack/mock-data-for-briks1');
const BriksData2 = require('../tack/mock-data-for-briks2');
const _ = require('lodash');

let BricksBox = React.createClass({

  iAnglePosition: -5,
  iUpDownPosition: -5,
  iBallSpeed: 50,
  strong: '#484140',
  middle: '#BB3927',
  low: '#CC944D',
  getInitialState: function () {
    let initialState = {
      briks: new BriksData,
      slider: {
        marginLeft: 220
      },
      huntingBall: {
        marginLeft: 249,
        marginTop: 468
      },
      score: 0
    };
    return initialState;
  },

  componentDidMount: function () {
    let intervalId = setInterval(this.timer, this.iBallSpeed);
    // store intervalId in the state so it can be accessed later:
    this.setState({intervalId: intervalId});
  },

  componentWillUnmount: function () {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  },

  keyPress: function (oEvent) {
    let oState = this.state;
    let iMarginLeft = oState.slider.marginLeft;
    this.setState(oState);
    if (oEvent.keyCode == 74 || oEvent.keyCode == 37) {
      if (iMarginLeft >= 10) {
        oState.slider.marginLeft = iMarginLeft - 10;
      }
    }
    else if (oEvent.keyCode == 75 || oEvent.keyCode == 39) {
      if (iMarginLeft <= 420) {
        oState.slider.marginLeft = iMarginLeft + 10;
      }
    }
    this.setState(oState);
  },

  timer: function () {
    let oState = this.state;
    let iMarginTop = oState.huntingBall.marginTop;
    let iMarginLeft = oState.huntingBall.marginLeft;


    if (iMarginLeft <= 3) {
      this.iAnglePosition = 5;
    }
    else if (iMarginTop <= 3) {
      this.iUpDownPosition = 5;
    }
    else if (iMarginLeft >= 490) {
      this.iAnglePosition = -5;
    }
    else if (iMarginTop >= 470 && ((oState.slider.marginLeft - 10) < iMarginLeft && (oState.slider.marginLeft + 60) > iMarginLeft)) {
      this.iUpDownPosition = -5;
    }
    else if (iMarginTop >= 490) {
      alert("Game Over, Your score is " +this.state.score);
      this.iUpDownPosition = -5;
      this.iAnglePosition = -5;
      oState.slider.marginLeft = 220;
      iMarginLeft = 249;
      iMarginTop = 468;
      this.state.score = 0;
      this.state.briks = new BriksData
    } else {
      let _this = this;
      _.remove(this.state.briks, function (obrik) {
        if ((oState.huntingBall.marginTop > obrik.marginTop-8) && (oState.huntingBall.marginTop < obrik.marginTop + 10) && (oState.huntingBall.marginLeft > obrik.marginLeft - 15)
            && (oState.huntingBall.marginLeft < obrik.marginLeft + 45)) {
          _this.iUpDownPosition = -_this.iUpDownPosition;
          _this.state.score++;
          if(obrik.strength != 1){
              obrik.strength--;
          }else{
              return obrik;
          }

        }
      });
      if(_.isEmpty(this.state.briks)){
          _this.state.score = _this.state.score+50;
          alert("1st Level complete and 1st Level Score is: " +_this.state.score);

          this.state.briks = BriksData2;
          this.iBallSpeed = this.iBallSpeed-10;
          oState.slider.marginLeft = 220;
          iMarginLeft = 249;
          iMarginTop = 468;
          let intervalId = setInterval(this.timer, this.iBallSpeed);
          this.state.intervalId= intervalId;
      }
    }
    oState.huntingBall.marginTop = iMarginTop + this.iUpDownPosition;
    oState.huntingBall.marginLeft = iMarginLeft + this.iAnglePosition;
    this.setState(oState);
  },
  getBricks: function (oStyle) {
    return (<div className="breakingBricks" style={oStyle}></div>);
  },

  render: function () {
    let aBricks = [];
    let _this = this;
    _.forEach(this.state.briks, function (oBrick) {
      let sColor = '';
      if(oBrick.strength == 3){
          sColor = _this.strong;
      } else if(oBrick.strength == 2){
          sColor = _this.middle;
      } else if(oBrick.strength == 1){
          sColor = _this.low;
      }
      let oStyle = {
        marginLeft: oBrick.marginLeft,
        marginTop: oBrick.marginTop,
        backgroundColor: sColor
      };
      aBricks.push(_this.getBricks(oStyle));
    });

    return (
        <div className="brickBox" onKeyDown={this.keyPress} tabIndex="0">
          {aBricks}
          <div className="huntingBall" style={this.state.huntingBall}></div>
          <div className="slider" style={this.state.slider}></div>
        </div>
    );
  }
});
module.exports = BricksBox;