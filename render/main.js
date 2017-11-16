const remote = require('electron').remote;

class BatteryEnegry extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let className = 'energy';
    if (this.props.level > 70)
      className = 'energy green';
    else
    if (this.props.level > 40)
      className = 'energy blue';
    else
    if (this.props.level > 20)
      className = 'energy yellow';
    else
      className = 'energy red';
    return (
      React.createElement("div", {className: className}, 
          React.createElement(BatteryLevel, {level: this.props.level, color: "light"}), 
          React.createElement("div", {className: this.props.level >= 100 ? 'energy-waves no-animation' : 'energy-waves', style: {top: -1 * (410 + 390 * this.props.level / 100)}}
          )
      )
    )
  }
}
class BatteryLevel extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      React.createElement("div", {className: this.props.color == 'dark' ? 'energy-number dark' : 'energy-number light'}, this.props.level + '%')
    )
  }
}
class BatteryCap extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      React.createElement("div", {className: "battery-cap"}, 
        React.createElement("div", {className: this.props.charging ? 'electro' : 'electro hidden'})
      )
    )
  }
}
class Battery extends React.Component {
  constructor (props) {
    super(props);
    this.state = {level: this.props.level, charging: this.props.charging}
  }
  componentDidMount() {
    const thisBattery = this;
    let updating = setInterval(() => {
      navigator.getBattery().then(function(result) {
        thisBattery.setState({level: result.level * 100});
        thisBattery.setState({charging: result.charging});
      });
    }, 500);
  }
  componentWillUnmount () {
    clearInterval(updating);
  }
  render () {
    return (
      React.createElement("div", {className: this.state.level == 0 ? 'battery-container hidden' : 'battery-container'}, 
        React.createElement(BatteryCap, {charging: this.state.charging}), 
        React.createElement("div", {className: "battery-block"}, 
          React.createElement(BatteryEnegry, {level: this.state.level})
        )
      )
    )
  }
}
class BarButton extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e) {
    if (this.props.action == 'min') {
      var window = remote.getCurrentWindow();
      window.minimize();  
    }
    if (this.props.action == 'close') {
      var window = remote.getCurrentWindow();
      window.close();  
    }
  }
  render () {
    return (React.createElement("div", {onClick: this.handleClick, className: "bar-button"},  this.props.action == 'min' ? '_' : '✕'))
  }
}
class Bar extends React.Component {
	render () {
    return (
      React.createElement("div", {className: "bar"}, 
        React.createElement(BarButton, {action: "min"}), 
        React.createElement(BarButton, {action: "close"})
      )
    )
  }
}
ReactDOM.render(
  React.createElement("div", null, 
  	React.createElement(Bar, null), 
    React.createElement(Battery, {charging: true, level: "0"})
  ),
  document.getElementById('root')
);