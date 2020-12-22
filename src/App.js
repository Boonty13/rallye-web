import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navigation from './components/Navigation'
import Chat from './screens/Chat'
import Infos from './screens/Infos'
import MapLive from './screens/MapLive'
import Media from './screens/Media'
import MyAccount from './screens/MyAccount'
import News from './screens/News'
import Program from './screens/Program'
import Ranking from './screens/Ranking'
import Teams from './screens/Teams'
import Welcome from './screens/Welcome'

function App() {
  return (
    <Router>
      <div style={{display: 'flex', flexDirection: "column", height: '100vh'}}>
       
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/chat" component={Chat} />
          <Route path="/infos" component={Infos} />
          <Route path="/maplive" component={MapLive} />
          <Route path="/media" component={Media} />
          <Route path="/myaccount" component={MyAccount} />
          <Route path="/news" component={News} />
          <Route path="/program" component={Program} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/teams" component={Teams} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
