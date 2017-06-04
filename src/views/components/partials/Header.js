import React, {Component} from 'react';
import logo from '../../../images/logo5.png'


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleToggle = ::this.handleToggle;
    this.handleClose = ::this.handleClose;
  }

  handleToggle() {
    return this.setState({open: !this.state.open});
  }

  handleClose() {
    return this.setState({open: false});
  }

  render() {
    return (
      <div className="header">
        <img src={logo} alt="Appengenie logo"/>
      </div>
    );

  }
}


export default Header;
