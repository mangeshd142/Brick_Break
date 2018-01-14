var React = require('react');
var BricksBox = require('../view/briks-box');

var MainViewController = React.createClass({

  //@Bind: Store with state
  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillMount: function () {
  },

  //@UnBind: store with state
  componentWillUnmount: function () {
  },


  render: function () {
    return (
        <div className="mainContainer">
          <BricksBox/>
        </div>
    );
  }
});

module.exports = MainViewController;