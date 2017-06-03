import React, {Component, PropTypes} from 'react';
import {Issue} from 'src/core/issues';
import {Link} from 'react-router';
import appIcon from '../../../images/app-store-icon.png';
import LikeBtn from 'material-ui/svg-icons/action/favorite';
import {red500} from 'material-ui/styles/colors';
import PersonIcon from 'material-ui/svg-icons/social/person';
import {dateSimple} from 'src/util/date-formatter';
import {firebaseAuth, firebaseDb} from 'src/core/firebase';

class IssueItem extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      appIcon: ''
    };
    this.handleIssueClick = ::this.handleIssueClick;
  }

  componentWillMount() {
    firebaseDb.ref(`answers`).child(this.props.issue.key).limitToFirst(1)
      .once('value', (snap) => {
        let snapshot = snap.val();
        if (snapshot) {
          let snapshotFinal = Object.keys(snapshot).map(e => snapshot[e]);
          let appIcon = snapshotFinal[0].appData ? snapshotFinal[0].appData.icon_72 : null;
          this.setState({appIcon})
        }
      });
  }

  renderTitle(issue) {
    return (
      <div className="issue-item__title">
      <span
        ref={c => this.titleText = c}
        tabIndex="0">{issue.title}
      </span>
        <span className="issue-item__details">{issue.details}</span>
      </div>
    );
  }

  handleIssueClick() {
    this.props.onClick(this.props.issue.key);
  }

  render() {
    const {issue} = this.props;
    return (
      <Link activeClassName="active" to={{pathname: '/issues/page', query: {id: `${issue.key}`}}}>
        <div className="issue-item aeg-card1 align-top">
          <div className="issue-item-left ">
          <span className="issue-item-left--bodyText">
            {issue.body}
          </span>
            <span className="issue-item-left--user">
            {issue.user.displayName} • {dateSimple(issue.createdtAt)}
          </span>
          </div>
          <div className="issue-item-right row">
            <div className="small-12 column">
              {this.state.appIcon ?
                <img src={this.state.appIcon} alt="Icon"/>
                :
                <img src={appIcon} alt="Icon"/>
              }
            </div>
            <div className="row align-middle info-icons">
              <div className="like-icon row">
                <LikeBtn color={red500}/>
                <span className="">50</span>
              </div>
              {/*<div className="">*/}
                {/*<PersonIcon />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default IssueItem;
