import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Layout from './layout/layout'

import Cources from './components/cources'
import Add from './components/add'
import Bascet from './components/bascet'

const App = () =>{
  return (
    <div className="App">
      <Layout>
      <Switch>
          <Route path="/" exact component={Cources}/>
          <Route path="/bascet" exact component={Bascet}/>
          <Route path="/add" exact component={Add}/>
          <Redirect  to="/" />
      </Switch>
      </Layout>
    </div>
  );
}

export default App;
