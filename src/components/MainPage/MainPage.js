import React from "react";
import GenreApp from '../Genre/GenreApp'
import AuthorApp from '../Author/AuthorApp'
import MainCardApp from '../MainCard/MainCardApp'

class MainPage extends React.Component {

  render() {
    return (
      <div className="MainBlock" style={{ border: '1px solid black', height: 'auto', marginTop : 20 }}>
        <MainCardApp/>
        <GenreApp handleChangeElectElement = {this.props.handleChangeElectElement}/>
        <AuthorApp handleChangeElectElement = {this.props.handleChangeElectElement}/>
      </div>
    );
  }
}

export default MainPage;



