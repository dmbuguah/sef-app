import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import SearchFacility from './Components/SearchFacility'

function App() {
  return (
    <BrowserRouter>
      <Route path="/auth">
          <div>name</div>
      </Route>
      <Layout>
        <Switch>
          <Route path="/">
              <SearchFacility/>
          </Route>
        </Switch>
      </Layout>
      </BrowserRouter>
  );
}

export default App;
