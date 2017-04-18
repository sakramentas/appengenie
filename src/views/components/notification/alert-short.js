import React, { Component } from 'react';
import {TweenMax} from "gsap";

class AlertShort extends Component {

  constructor(props) {
    super(props);
  }

  componentWillEnter (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback});
  }

  componentWillLeave (callback) {
    const el = this.container;
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback});
  }
  render() {
    let {text} = this.props;
    return (
      <div className="alert-short__box" ref={c => this.container = c}>
        <span>There are no suggestions for your search. You can create a new Issue with <b>{text}</b></span>
      </div>
    );
  }
}

export default AlertShort;
