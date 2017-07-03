import React from 'react';
import { Button } from 'semantic-ui-react'

export const LikeBtn = (props) => {
  return (
    <div>
      {/*{props.youLiked === true ?*/}
        {/*<Icon onClick={props.handleLikeAnswer} name='like' color='red' size="large" />*/}
        {/*:*/}
        {/*<Icon onClick={props.handleLikeAnswer} name='heart outline' color='red' size="large" />*/}
      {/*}*/}
      {/*<h4>{props.likesQt} likes</h4>*/}
      {props.youLiked === true ?
        <Button
          basic
          color='blue'
          content='Dislike'
          size='mini'
          icon='heart'
          onClick={props.handleLikeAnswer}
          label={{basic: true, color: 'blue', pointing: 'left', content: `${props.likesQt}`}}
        />
        :
        <Button
          color='blue'
          content='Like'
          size='mini'
          icon='heart'
          onClick={props.handleLikeAnswer}
          label={{basic: true, color: 'blue', pointing: 'left', content: `${props.likesQt}`}}
        />
      }
    </div>
  )
};