import React, {Component} from 'react';
import {likesActions, getLikes, getVisibleLikes, getLikesValue} from 'src/core/likes'
import {connect} from 'react-redux';
import {createSelector} from 'reselect';

import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import {firebaseAuth, firebaseDb} from 'src/core/firebase';

import {red500} from 'material-ui/styles/colors';

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      numLikes: null
    };
    let {answerId, issueId, loadLikesAnswer, checkIfUserLiked} = this.props;
    let currentUserUid = firebaseAuth.currentUser.uid;

    firebaseDb.ref(`users/${currentUserUid}/likes/onAnswer`).on('value', snapshot => {
      // console.log('THE SNAPSHOT ', snapshot.val())
      let valueSnapshot = snapshot.val();
      console.log('S N A P S H O T VALUES ----- ', snapshot.val(), snapshot.key, answerId)
      if (valueSnapshot[answerId]) {
        this.setState({
          isLiked: true
        });
        loadLikesAnswer(issueId, answerId);
      }

    });

    firebaseDb.ref(`answers/${issueId}/${answerId}`).child('likes').once('value', snapshot => {
      let snapshotVal = snapshot.val();
      console.log('snap val', snapshotVal)
      if (snapshotVal) {
        this.setState({
          numLikes: Object.keys(snapshotVal).length
        });
      }
    })


    // firebaseDb.on('child_added', snapshot => {
    //   if (initialized) {
    //     dispatch(this._actions.onAdd(this.unwrapSnapshot(snapshot)));
    //   }
    //   else {
    //     list.push(this.unwrapSnapshot(snapshot));
    //   }
    // });

    // firebaseDb.ref(`users/${currentUserUid}/likes/onAnswer`).on('child_added', snapshot => {
    //   let valueSnapshot = snapshot.val();
    //   console.log('S N A P S H O T VALUES ----- ', snapshot.val(), snapshot.key, this.props.answerId)
    //   // if (valueSnapshot[this.props.answerId]) {
    //   //   this.setState({isLiked: true, teste: 'working'})
    //   // } else {
    //     this.setState({isLiked: true, teste: ' working'})
    //   // }
    // });

    // firebaseDb.on('child_removed', snapshot => {
    //   dispatch(this._actions.onRemove(this.unwrapSnapshot(snapshot)));
    // });


    this.handleLikeAnswer = ::this.handleLikeAnswer
    // this.handleDislikeAnswer = ::this.handleDislikeAnswer
  }

  //
  // checkIfUserLiked() {
  //   let currentUserUid = firebaseAuth.currentUser.uid;
  //   let isLiked = false;
  //   firebaseDb.ref(`users/${currentUserUid}/likes`).once('value', snapshot => {
  //     // console.log('THE SNAPSHOT ', snapshot.val())
  //     if (snapshot[this.props.answerId]) {
  //       this.setState({isLiked: true})
  //     } else {
  //       this.setState({isLiked: false})
  //     }
  //   })
  // };

  // getNumLikes() {
  //   this.setState({numLikes: Object.keys(this.props.likes).length })
  // }

  componentWillMount() {
    let {answerId, issueId, loadLikesAnswer, checkIfUserLiked} = this.props;
    loadLikesAnswer(issueId, answerId);
    // let {answerId, issueId} = this.props;
    // // console.log('OLHA O STATE AI ', this.state.liked)
    // likesActions.loadLikesAnswer(issueId, answerId)
  }

  componentDidMount() {
    let {answerId, issueId, loadLikesAnswer, checkIfUserLiked} = this.props;
    // console.log('OLHA O STATE AI ', this.state.liked)
    // setTimeout(() => console.log('PROPS OF LIKE -- ', this.props.likes.isLiked), 3000)
    // console.log('CHECKIN LIKES  ', checkIfUserLiked(answerId));
    // this.checkIfUserLiked()
  }


  handleLikeAnswer() {
    let {answerId, issueId, likeAnswer} = this.props;
    console.log('HANDLE ANSWER LIKE ', answerId, issueId)
    likeAnswer(answerId, issueId);
    // this.forceUpdate()
  }

  // handleDislikeAnswer(answer) {
  //   // console.log('TRIGERED1!!')
  //   // return answersActions.dislikeAnswer(answer.key, this.props.issueKey)
  // }


  render() {
    return (
      <div>
        {/*{this.props.issueId}*/}
        {this.state.isLiked === true ? 'You like it' : 'You dont like it'}

        <LikeButtonElement liked={this.state.isLiked}
                           handleLikeAnswer={this.handleLikeAnswer}
                           numLikes={this.state.numLikes}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)


const LikeButtonElement = ({liked, handleLikeAnswer, numLikes}) => {
  return (
    <div onClick={handleLikeAnswer}>
      {liked === false ?
        <ActionFavoriteBorder color={red500}
        />
        :
        <div>
          <ActionFavorite color={red500}
          />

        </div>
      }
      <span style={{color: 'red'}}>{numLikes}</span>
    </div>
  )
}