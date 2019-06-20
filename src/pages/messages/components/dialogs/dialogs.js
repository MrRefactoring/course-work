import { messagesActions as actions } from 'pages/messages/messagesActions';
import { connect } from 'react-redux';
import Dialog from 'components/dialog/dialog';
import PropTypes from 'prop-types';
import React from 'react';
import './dialogs.less';

class Dialogs extends React.Component {
  componentDidMount() {
    this.props.getChats();
  }

  render() {
    const {
      modalToggler,
      chats,
      selectedDialog,
      changeDialog
    } = this.props;

    return (
      <div className='dialogs'>
        <div className='search'>
          <div
            onClick={modalToggler}
            className='icon'
          />
          <div className='bar'>
            <input
              placeholder='Search'
            />
          </div>
        </div>
        {
          chats.map((chat, index) => <Dialog
            key={index}
            index={index}
            id={chat.chatId}
            name={chat.name}
            avatar={chat.avatar}
            onClick={changeDialog}
            lastMessage={chat.lastMessage || ''}
            selected={selectedDialog === index}
          />)
        }
      </div>
    );
  }
}

const stateToProps = state => ({
  chats: state.messages.chats
});

export default connect(stateToProps, actions)(Dialogs);

Dialogs.propTypes = {
  modalToggler: PropTypes.func,
  chats: PropTypes.array.isRequired,
  getChats: PropTypes.func.isRequired,
  selectedDialog: PropTypes.number.isRequired,
  changeDialog: PropTypes.func.isRequired
};
