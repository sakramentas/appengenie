import React, { Component } from 'react';
import {likesActions, getLikes, getVisibleLikes, getLikesValue} from 'src/core/likes'
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import {red500} from 'material-ui/styles/colors';

export class LikeButton extends Component {
  constructor(props) {
    super();
    // this.state = {
    //   liked: false
    // };

    this.handleLikeAnswer = ::this.handleLikeAnswer
    // this.handleDislikeAnswer = ::this.handleDislikeAnswer
  }

  // componentWillMount() {
  //   // let isLiked = answersActions.checkIfUserLiked(this.props.answer.key, 'answer');
  //   this.checkIfUserLiked()
  // }

  // checkIfUserLiked() { //TODO: REBUILD THIS COMPLETELY. IT'S A SHIT. DO THIS IN REDUX
  //   let currentUserUid = firebaseAuth.currentUser.uid;
  //   firebaseDb.ref(`users/${currentUserUid}/likes/onAnswer`).once('value', snapshot => {
  //     let likedbyUser = snapshot.val();
  //     console.log('USEEEERR!!', likedbyUser[this.props.answer.key])
  //     if (likedbyUser[this.props.answer.key]) {
  //       this.setState({liked: true})
  //     }
  //     else {
  //       this.setState({liked: false})
  //     }
  //   })
  // }

  componentWillMount() {
    // let {answerId, issueId} = this.props;
    // // console.log('OLHA O STATE AI ', this.state.liked)
    // likesActions.loadLikesAnswer(issueId, answerId)
  }

  componentDidMount() {
    let {answerId, issueId, loadLikesAnswer} = this.props;
    // console.log('OLHA O STATE AI ', this.state.liked)
    loadLikesAnswer(issueId, answerId)
    console.log('PROPS OF LIKE -- ', this.props)
  }


  handleLikeAnswer() {
    console.log('TRIGERED on function!!')
    let { answerId, issueId, likeAnswer} = this.props;
    likeAnswer(answerId, issueId)
  }

  // handleDislikeAnswer(answer) {
  //   // console.log('TRIGERED1!!')
  //   // return answersActions.dislikeAnswer(answer.key, this.props.issueKey)
  // }

  checkIfUserLiked() {

  }

  render() {
    return (
      <div>
        {/*{this.props.issueId}*/}
        {Object.keys(this.props.likes)}
        <ActionFavoriteBorder color={red500} onClick={this.handleLikeAnswer} />
      </div>
    );
  }
}



// {!this.state.liked ?
//   <ActionFavoriteBorder color={red500}
//                         onClick={this.handleLikeAnswer.bind(this, answer)}/>
//   :
//   <div>
//     <ActionFavorite color={red500}
//                     onClick={this.handleDislikeAnswer.bind(this, answer)}/>
//
//   </div>
// }

const mapStateToProps = createSelector(
  getLikesValue,
  (likes) => ({
    likes
  })
);

// const mapStateToProps = (getLikes)

const mapDispatchToProps = (likesActions)

export default connect (mapStateToProps, mapDispatchToProps)(LikeButton)