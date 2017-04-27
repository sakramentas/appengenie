import { FirebaseList } from 'src/core/firebase';
import * as answerActions from './actions';
import { AnswerModel } from './answer';


export const answerList = new FirebaseList({
  onAdd: answerActions.createAnswerSuccess,
  onChange: answerActions.updateAnswerSuccess,
  onLoad: answerActions.loadAnswersSuccess,
  onRemove: answerActions.deleteAnswerSuccess
}, AnswerModel);
