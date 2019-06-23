import React from "react";
import GenreApp from './GenreApp'
import AuthorApp from './AuthorApp'
import MainCardApp from './MainCardApp'

class MainPage extends React.Component {

  render() {
    return (
      <div className="MainBlock" >
        <MainCardApp/>
        <GenreApp handleElectItemSetter={this.props.handleElectItemSetter} viewAllBtn={true} limit={6}/>
        <AuthorApp handleElectItemSetter={this.props.handleElectItemSetter} viewAllBtn={true} limit={6}/>
      </div>
    );
  }
}

export default MainPage;



