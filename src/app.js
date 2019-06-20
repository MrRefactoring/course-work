import Authentication from 'pages/authentication/authentication';
import Logout from 'pages/logout/logout';
import Messages from 'pages/messages/messages';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.less';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/logout' component={Logout}/>
          <Route path='/messages' component={Messages}/>
          <Route exact path='/' component={Authentication}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
