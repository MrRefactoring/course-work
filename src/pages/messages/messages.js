import Chat from 'pages/messages/components/chat/chat';
import Dialogs from 'pages/messages/components/dialogs/dialogs';
import FindPersonModal from 'pages/messages/modals/findPersonModal/findPersonModal';
import React from 'react';
import SettingsModal from './modals/settingsModal/settingsModal';
import './messages.less';

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedChat: 0,
      settingsOpened: false,
      findPersonModalOpened: false
    };
  }

  changeDialog = (selectedChat) => this.setState({ selectedChat });

  toggleSettings = () => {
    this.setState(prevState => ({
      settingsOpened: !prevState.settingsOpened
    }));
  }

  toggleFindPeopleModal = () => {
    this.setState(prevState => ({
      settingsOpened: false,
      findPersonModalOpened: !prevState.findPersonModalOpened
    }));
  }

  render() {
    const {
      settingsOpened,
      selectedChat,
      findPersonModalOpened
    } = this.state;

    return (
      <div className='messages'>
        <SettingsModal
          opened={settingsOpened}
          toggler={this.toggleSettings}
          findPersonModal={this.toggleFindPeopleModal}
        />
        <FindPersonModal
          opened={findPersonModalOpened}
          toggle={this.toggleFindPeopleModal}
        />
        <Dialogs
          selectedDialog={selectedChat}
          changeDialog={this.changeDialog}
          modalToggler={this.toggleSettings}
        />
        <Chat
          selectedChat={selectedChat}
        />
      </div>
    );
  }
}

export default Messages;
