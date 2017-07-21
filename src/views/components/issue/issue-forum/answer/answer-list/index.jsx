import React from 'react';
import PropTypes from 'prop-types';
import IssueAnswerItem from '../answer-item/index';

const IssueAnswerList = (props) => {
  const { answers, issueId } = props;
  return (
    <div className="row aeg-m-top">
      <div className="small-12 column">
        <h3 className="subheader">Answers</h3>
        {Object.keys(answers).map(key => (
          <IssueAnswerItem
            key={key}
            answer={answers[key]}
            issueId={issueId}
          />
        ))}
      </div>
    </div>
  );
};

IssueAnswerList.propTypes = {
  answers: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  issueId: PropTypes.string.isRequired,
};

export default IssueAnswerList;
