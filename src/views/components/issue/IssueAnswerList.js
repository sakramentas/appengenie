import React, {Component} from 'react';
import IssueAnswerItem from './IssueAnswerItem';

const IssueAnswerList = (props) => {

	const {answers, issueId} = props;
	return (
		<div className="row aeg-m-top">
			<div className="small-12 column">
				<h3 className="subheader">Answers</h3>
				{Object.keys(answers).map(key => {
					return (
						<IssueAnswerItem
							key={key}
							answer={answers[key]}
							issueId={issueId}
						/>
					)
				})}
			</div>
		</div>
	)
};

export default IssueAnswerList