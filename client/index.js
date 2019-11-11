import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import SongList from './component/songList';
import app from './component/app';
import songcreate from './component/songCreate';
import songdetail from './component/songDetail';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={app}>
          <IndexRoute component={SongList}></IndexRoute>
          <Route path='/song/create' component={songcreate}></Route>
          <Route path='/song/:id' component={songdetail}></Route>
        </Route>
      </Router>
    </ApolloProvider>
  )

};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
