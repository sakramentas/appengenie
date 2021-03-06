import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Task from 'src/core/tasks';


class TrendingItem extends Component {
  static propTypes = {
    deleteTrending: PropTypes.func.isRequired,
    // trending: PropTypes.instanceOf(Task).isRequired,
    updateTrending: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {editing: false};

    this.delete = ::this.delete;
    this.editTitle = ::this.editTitle;
    this.saveTitle = ::this.saveTitle;
    this.stopEditing = ::this.stopEditing;
    this.toggleStatus = ::this.toggleStatus;
    this.onKeyUp = ::this.onKeyUp;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.trending !== this.props.trending ||
           nextState.editing !== this.state.editing;
  }

  delete() {
    this.props.deleteTrending(this.props.trending);
  }

  editTitle() {
    this.setState({editing: true});
  }

  saveTitle(event) {
    if (this.state.editing) {
      const { trending } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== trending.title) {
        this.props.updateTrending(trending, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    let checked = !this.props.trending.completed;
    this.props.updateTrending(this.props.trending, {completed: checked});
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      this.saveTitle(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  renderTitle(trending) {
    return (
      <div
        className="trending-item__title"
        ref={c => this.titleText = c}
        tabIndex="0">{trending.title}
      </div>
    );
  }

  renderTitleInput(trending) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="trending-item__input"
        defaultValue={trending.title}
        maxLength="64"
        onBlur={this.saveTitle}
        onKeyUp={this.onKeyUp}
        ref={c => this.titleInput = c}
        type="text"
      />
    );
  }

  render() {
    const { editing } = this.state;
    const { trending } = this.props;

    return (
      <div className={classNames('trending-item', {'trending-item--completed': trending.completed, 'trending-item--editing': editing})} tabIndex="0">
        <div className="cell">
          <button
            aria-hidden={editing}
            aria-label="Mark trending as completed"
            className={classNames('btn trending-item__button', {'hide': editing})}
            onClick={this.toggleStatus}
            ref={c => this.toggleStatusButton = c}
            type="button">
            <svg className={classNames('icon', {'icon--active': trending.completed})} width="24" height="24" viewBox="0 0 24 24">
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
            </svg>
          </button>
        </div>

        <div className="cell">
          {editing ? this.renderTitleInput(trending) : this.renderTitle(trending)}
        </div>

        <div className="cell">
          <button
            aria-hidden={!editing}
            aria-label="Cancel editing"
            className={classNames('btn trending-item__button', {'hide': !editing})}
            onClick={this.stopEditing}
            ref={c => this.cancelEditButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Edit trending"
            className={classNames('btn trending-item__button', {'hide': editing})}
            onClick={this.editTitle}
            ref={c => this.editButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
          <button
            aria-hidden={editing}
            aria-label="Delete trending"
            className={classNames('btn trending-item__button', {'hide': editing})}
            onClick={this.delete}
            ref={c => this.deleteButton = c}
            type="button">
            <svg className="icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}

export default TrendingItem;
