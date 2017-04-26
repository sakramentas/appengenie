import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export class IssueAnswerList extends Component {
  constructor(props) {
    super()
  }

  mapAnswers() {
    let {issue} = this.props;
    for (let v in issue.answers) {
      console.log(v.answer)
    }
  }


  render() {
    let {issue, answerKey} = this.props;
    console.log('answers from list props', issue.answers)
    // for (let key in issue.answers) {
    //   if(issue.answers.hasOwnProperty(key)) {
    //     issue.answers[key]
    //   }
    // }
    return (
      <div>
        <Card className="issue-box__answerList">
          <List>
            <Subheader>Answers</Subheader>
            {/*<ListItem*/}
            {/*primaryText={user}*/}
            {/*secondaryText={*/}
            {/*<p>*/}
            {/*<span style={{color: darkBlack}}>{user.answer}</span> --*/}
            {/*{user.answer}*/}
            {/*</p>*/}
            {/*}*/}
            {/*secondaryTextLines={2}*/}
            {/*/>*/}
            {this.mapAnswers()}
          </List>
        </Card>

      </div>
    )

  }
}

// Map answers
// {(answers != null && answers.isArray) ?
//   answers.map(answer => {
//     return (
//       <ListItem
//         primaryText={answer}
//         secondaryText={
//           <p>
//             <span style={{color: darkBlack}}>Brendan Lim</span> --
//             I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
//           </p>
//         }
//         secondaryTextLines={2}
//       />
//     )
//   })
//   :
//   'aehuheauha'
// }


