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

export const IssueAnswerList = ({answers}) => {

  return (
    <div>
      <Card className="issue-box__answerList">
        <List>
          <Subheader>Answers</Subheader>
          {answers.map((answer, index) => <ListItem key={index}>{answer.body} - by {answer.user.displayName}</ListItem> )}
        </List>
      </Card>

    </div>
  )
};

