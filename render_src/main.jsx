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
      <div className={className}>
          <BatteryLevel level={this.props.level} color="light" />
          <div className={this.props.level >= 100 ? 'energy-waves no-animation' : 'energy-waves'} style={{top: -1 * (410 + 390 * this.props.level / 100)}}>
          </div>
      </div>
    )
  }
}
class BatteryLevel extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className={this.props.color == 'dark' ? 'energy-number dark' : 'energy-number light'}>{this.props.level + '%'}</div>
    )
  }
}
class BatteryCap extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="battery-cap">
        <div className={this.props.charging ? 'electro' : 'electro hidden'}></div>
      </div>
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
      <div className={this.state.level == 0 ? 'battery-container hidden' : 'battery-container'}>
        <BatteryCap charging={this.state.charging}/>
        <div className="battery-block">
          <BatteryEnegry level={this.state.level} />
        </div>
      </div>
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
    return (<div onClick={this.handleClick} className="bar-button">{ this.props.action == 'min' ? '_' : '✕' }</div>)
  }
}
class Bar extends React.Component {
	render () {
    return (
      <div className="bar">
        <BarButton action="min" />
        <BarButton action="close" />
      </div>
    )
  }
}
ReactDOM.render(
  <div>
  	<Bar />
    <Battery charging level="0" />
  </div>,
  document.getElementById('root')
);