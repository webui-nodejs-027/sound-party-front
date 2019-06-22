import React from "react";
import GenreApp from '../Genre/GenreApp'
import AuthorApp from '../Author/AuthorApp'
import MainCardApp from '../MainCard/MainCardApp'

class MainPage extends React.Component {

  render() {
    return (
      <div className="MainBlock" >
        <MainCardApp/>
        <GenreApp/>
        <AuthorApp/>
      </div>
    );
  }
}

export default MainPage;



