import { messagesActions as actions } from 'pages/messages/messagesActions';
import ChatHead from '../chatHead/chatHead';
import { connect } from 'react-redux';
import Message from 'pages/messages/components/chat/components/message';
import PropTypes from 'prop-types';
import React from 'react';
import './chat.less';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.mounted = true;

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    setTimeout(this.checkNewMessages, 2000);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkNewMessages = () => {
    if (!this.mounted) return;
    const {
      getMessages,
      chats,
      selectedChat
    } = this.props;

    const { chatId } = chats[selectedChat];

    getMessages({ chatId });

    setTimeout(this.checkNewMessages, 1000);
  }

  onChange = e => this.setState({
    message: e.target.value
  });

  onClick = () => {
    const { message } = this.state;
    const {
      addMessage,
      chats,
      selectedChat
    } = this.props;

    const { chatId } = chats[selectedChat];

    addMessage({
      chatId,
      message
    });

    this.setState({
      message: ''
    });
  }

  render() {
    const { message } = this.state;
    const { messages, chats, selectedChat } = this.props;

    const name = chats[selectedChat] ? chats[selectedChat].name : '';

    const chatId = chats[selectedChat] ? chats[selectedChat].chatId : '';

    return (
      <div className='chat'>
        <ChatHead
          title={name}
          lastSeen=''
        />
        <div className='main layout'>
          {
            messages.map((msg, index) => <Message
              key={index}
              your={msg.your}
              chatId={chatId}
              message={msg.message}
              messageId={msg.messageId}
            />).reverse()
          }
        </div>
        <div className='typer'>
          <input
            onChange={this.onChange}
            value={message}
            placeholder='Напишите сообщение...'
          />
          <div
            onClick={this.onClick}
            className='send icon'
          />
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  chats: state.messages.chats,
  messages: state.messages.messages
});

export default connect(stateToProps, actions)(Chat);

Chat.propTypes = {
  addMessage: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  selectedChat: PropTypes.number.isRequired,
  chats: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired
};
