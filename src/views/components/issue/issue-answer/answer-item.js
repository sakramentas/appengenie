import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


import {answersActions} from 'src/core/answers';

import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import {red500} from 'material-ui/styles/colors';

import {firebaseAuth, firebaseDb} from 'src/core/firebase';

export class IssueAnswerItem extends Component {
  constructor(props) {
    super();
    this.state = {
      liked: false
    };

    this.handleLikeAnswer = ::this.handleLikeAnswer
    this.handleDislikeAnswer = ::this.handleDislikeAnswer
  }

  componentWillMount() {
    // let isLiked = answersActions.checkIfUserLiked(this.props.answer.key, 'answer');
    this.checkIfUserLiked()
  }

  checkIfUserLiked() { //TODO: REBUILD THIS COMPLETELY. IT'S A SHIT. DO THIS IN REDUX
    let currentUserUid = firebaseAuth.currentUser.uid;
    firebaseDb.ref(`users/${currentUserUid}/likes/onAnswer`).once('value', snapshot => {
      let likedbyUser = snapshot.val();
      console.log('USEEEERR!!', likedbyUser[this.props.answer.key])
      if (likedbyUser[this.props.answer.key]) {
        this.setState({liked: true})
      }
      else {
        this.setState({liked: false})
      }
    })
  }


  componentDidMount() {
    console.log('OLHA O STATE AI ', this.state.liked)
  }

  handleLikeAnswer(answer) {
    console.log('TRIGERED1!!')
    return answersActions.likeAnswer(answer.key, this.props.issueKey)
  }

  handleDislikeAnswer(answer) {
    // console.log('TRIGERED1!!')
    // return answersActions.dislikeAnswer(answer.key, this.props.issueKey)
  }

  render() {
    let {answer} = this.props;
    return (
      <Card className="issue-box__answerList">
        <CardHeader title={`${answer.appName || ''} - ${answer.body}`}
                    avatar={answer.user.image}
                    subtitle={`by ${answer.user.displayName}`}/>
        <CardActions>
          {!this.state.liked ?
            <ActionFavoriteBorder color={red500}
                                  onClick={this.handleLikeAnswer.bind(this, answer)}/>
            :
            <ActionFavorite color={red500}
                            onClick={this.handleDislikeAnswer.bind(this, answer)}/>
          }
        </CardActions>
      </Card>
    )
  }
}


