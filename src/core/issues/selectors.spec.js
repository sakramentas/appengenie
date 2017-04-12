import { List } from 'immutable';
import { IssuesState } from './reducer';
import { getVisibleIssues } from './selectors';
import { Issue } from './issue';


describe('issues', () => {
  describe('selectors', () => {
    let issues;

    beforeEach(() => {
      issues = new IssuesState({
        list: new List([
          new Issue({completed: false, title: 'issue-1'}),
          new Issue({completed: true, title: 'issue-2'})
        ])
      });
    });


    describe('getVisibleIssues()', () => {
      it('should return list of all issues', () => {
        let issueList = getVisibleIssues({issues});
        expect(issueList.size).toBe(2);
      });

      it('should return list of active (incomplete) issues', () => {
        issues = issues.set('filter', 'active');
        let issueList = getVisibleIssues({issues});

        expect(issueList.size).toBe(1);
        expect(issueList.get(0).title).toBe('issue-1');
      });

      it('should return list of completed issues', () => {
        issues = issues.set('filter', 'completed');
        let issueList = getVisibleIssues({issues});

        expect(issueList.size).toBe(1);
        expect(issueList.get(0).title).toBe('issue-2');
      });
    });
  });
});
