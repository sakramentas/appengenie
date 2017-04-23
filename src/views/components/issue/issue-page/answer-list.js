import React from 'react';
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

export const IssueAnswerList = ({issue, answerKey}) => {
  console.log('answers from list props', issue.answers)
  // for (let key in issue.answers) {
  //   if(issue.answers.hasOwnProperty(key)) {
  //     issue.answers[key]
  //   }
  // }
  return (
    <div>
      {answerKey}
      {Object.keys(issue.answers).map((issueId, index) => {
        return (
          <Card className="issue-box__answerList" key={index}>
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
              {issueId[index].answer}
              {console.log(issueId[index])}
            </List>
          </Card>
        )
      })}
    </div>
  )
};


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


