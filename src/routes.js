import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';

import MainPage from './components/MainPage/MainPage'
import Tabs from './components/Tabs/TabsApp';

const history = createBrowserHistory();

class Routes extends React.Component {

  state = {
    elect : {
      itemId : null,
    }
  }

  handleChangeElectElement = (itemId) => {
    console.log(itemId);

    this.setState({
      elect : {
        itemId: itemId,
      }
    })
  }

  render() {
    return (
      <Router history={history}>
        <Route exact path='/' render={
          (props) => <MainPage handleChangeElectElement = {this.handleChangeElectElement}/>} />
        <Route exact path='/exploreGenres' render={
          (props) => <Tabs itemId={this.state.elect.itemId}/>}/>
      </Router>
    )

  }
}

export default Routes
