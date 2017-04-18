import React, {Component} from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

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
      <AppBar
        onClick={this.handleToggle}
        className="header">

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}>
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>

        <Link to="/"><h1 className="header__title">LookApp</h1></Link>

      </AppBar>
    );

  }
}


export default Header;
