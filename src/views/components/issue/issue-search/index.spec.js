import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import IssueForm from './index';


describe('IssueForm', () => {
  let issueForm;


  beforeEach(() => {
    issueForm = createTestComponent(IssueForm, {
      createIssue: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.title with an empty string', () => {
      expect(issueForm.state.title).toEqual('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.title with an empty string', () => {
        issueForm.state.title = 'foo';
        expect(issueForm.state.title).toEqual('foo');

        issueForm.clearInput();
        expect(issueForm.state.title).toEqual('');
      });
    });


    describe('#onChange', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        issueForm.onChange(event);
        expect(issueForm.state.title).toEqual(event.target.value);
      });
    });


    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          issueForm.state.title = 'foo';
          issueForm.onKeyUp({keyCode: 27});
          expect(issueForm.state.title).toEqual('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        issueForm.onSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call issueActions#createIssue with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        issueForm.state.title = 'foo';
        issueForm.onSubmit(event);

        expect(issueForm.props.createIssue.callCount).toEqual(1);
        expect(issueForm.props.createIssue.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        issueForm.state.title = 'foo';
        issueForm.onSubmit(event);

        expect(issueForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        issueForm.state.title = '';
        issueForm.onSubmit(event);

        expect(issueForm.props.createIssue.callCount).toBe(0);

        issueForm.state.title = '    ';
        issueForm.onSubmit(event);

        expect(issueForm.props.createIssue.callCount).toBe(0);
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        issueForm.setState({title: 'foo'});
        Simulate.keyUp(issueForm.titleInput, {keyCode: 27});
        expect(issueForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        issueForm.setState({title: 'foo'});
        Simulate.keyUp(issueForm.titleInput, {keyCode: 27});
        expect(issueForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        issueForm.titleInput.value = 'foo';
        expect(issueForm.state.title).toEqual('');
        Simulate.change(issueForm.titleInput);
        expect(issueForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(issueForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        issueForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(issueForm), event);
        expect(issueForm.titleInput.value).toEqual('');
      });
    });
  });
});
