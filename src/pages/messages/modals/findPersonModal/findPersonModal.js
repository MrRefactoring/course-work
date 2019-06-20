import { messagesActions as actions } from 'pages/messages/messagesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './findPersonModal.less';

class FindPersonModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
  }

  changeQuery = (e) => {
    const { value } = e.target;

    this.setState({
      query: value
    }, () => this.props.findPerson({ searchQuery: this.state.query }));
  }

  addDialog = (index) => {
    const id = this.props.people[index].id;

    this.props.addChat({ personId: id });
    this.props.toggle();
  }

  preventClick = (e) => e.stopPropagation();

  renderOnePeople = (people, index) => {
    return (
      <div
        key={index}
        onClick={() => this.addDialog(index)}
        className='people'
      >
        {people.name}
      </div>
    );
  }

  render() {
    const { query } = this.state;
    const { opened, toggle, people } = this.props;

    return (
      <div onClick={toggle} className={`find people modal ${opened ? 'opened' : ''}`}>
        <div onClick={this.preventClick} className='content'>
          <div className='header'>
            Найти друзей
          </div>
          <div className='search'>
            <input
              type='text'
              name='search'
              onChange={this.changeQuery}
              placeholder='Поиск...'
              value={query}
            />
          </div>
          <div className='result'>
            {
              people.slice(0, 10).map(this.renderOnePeople)
            }
          </div>
          <div className='actions'>
            <div onClick={toggle} className='close'>
                Close
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  people: state.messages.persons
});

export default connect(stateToProps, actions)(FindPersonModal);

FindPersonModal.propTypes = {
  addChat: PropTypes.func.isRequired,
  findPerson: PropTypes.func.isRequired,
  people: PropTypes.array.isRequired,
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};
