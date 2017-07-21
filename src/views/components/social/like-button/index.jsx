import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LikeBtn = props => (
  <div>
    {props.youLiked === true ?
      <Button
        basic
        color="blue"
        content="Dislike"
        size="mini"
        icon="heart"
        onClick={props.handleLikeAnswer}
        label={{ basic: true, color: 'blue', pointing: 'left', content: `${props.likesQt}` }}
      />
      :
      <Button
        color="blue"
        content="Like"
        size="mini"
        icon="heart"
        onClick={props.handleLikeAnswer}
        label={{ basic: true, color: 'blue', pointing: 'left', content: `${props.likesQt}` }}
      />
    }
  </div>
);

LikeBtn.propTypes = {
  youLiked: PropTypes.bool.isRequired,
  likesQt: PropTypes.number.isRequired,
  handleLikeAnswer: PropTypes.func.isRequired,
};

export default LikeBtn;
