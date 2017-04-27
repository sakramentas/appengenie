import { List } from 'immutable';
import { AnswersState } from './reducer';
import { getVisibleAnswers } from './selectors';
import { Answer } from './answer';


describe('answers', () => {
  describe('selectors', () => {
    let answers;

    beforeEach(() => {
      answers = new AnswersState({
        list: new List([
          new Answer({completed: false, title: 'answer-1'}),
          new Answer({completed: true, title: 'answer-2'})
        ])
      });
    });


    describe('getVisibleAnswers()', () => {
      it('should return list of all answers', () => {
        let answerList = getVisibleAnswers({answers});
        expect(answerList.size).toBe(2);
      });

      it('should return list of active (incomplete) answers', () => {
        answers = answers.set('filter', 'active');
        let answerList = getVisibleAnswers({answers});

        expect(answerList.size).toBe(1);
        expect(answerList.get(0).title).toBe('answer-1');
      });

      it('should return list of completed answers', () => {
        answers = answers.set('filter', 'completed');
        let answerList = getVisibleAnswers({answers});

        expect(answerList.size).toBe(1);
        expect(answerList.get(0).title).toBe('answer-2');
      });
    });
  });
});
