import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as  Router , Route , Switch , Redirect } from 'react-router-dom';

import Header from './components/header/Header.js';
import List from './components/list/List.js';
import Audio from './components/audio/Audio.js';
import Lyric from './components/lyric/Lyric.js';

// 项目用到的数据接口： https://api.hibai.cn/api/demo/index
// 项目的github地址：https://github.com/ghostdp/musicpro

class App extends Component {
  render() {
    return (
      <Router>
        <div id="main">
          <Header />
          <Switch>
            <Route path="/list" component={ List } />
            <Route path="/lyric/:id" component={ Lyric } />
            <Redirect from="/*" to="/list" />
          </Switch>
          <Audio />
        </div>
      </Router>
    );
  }
}

export default App;
