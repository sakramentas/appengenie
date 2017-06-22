import React from 'react';

export const LikeBtn = (props) => {
  return (
    <div>
      {props.youLiked === true ?
        <Icon onClick={props.handleLikeAnswer} name='like' color='red' size="large" />
        :
        <Icon onClick={props.handleLikeAnswer} name='heart outline' color='red' size="large" />
      }
      <h4>{props.likesQt} likes</h4>
      <h4>{props.youLiked.toString()}</h4>
    </div>
  )
};