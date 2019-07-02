import React, { Component } from "react";
import AllPlaylistsGrid from "./AllPlaylistsGrid";


class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementsView: [],
      idPlaylist: 1,
    };

    this.getPlaylists = this.getPlaylists.bind(this);
    this.create = this.create.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.getUserId = this.getUserId.bind(this);
    this.updateFavPlaylist = this.updateFavPlaylist.bind(this);
  }

  async componentDidMount() {
    const playlists = await this.getPlaylists(this.getUserId());
    this.setState({ elementsView: playlists });
  }

   getUserId = () => {
    const payload = localStorage
      .getItem('token')
      .split('.')[1];
    return JSON.parse(atob(payload)).id;
  };

  async getPlaylists() {
    const responseJSON = await fetch(
      `http://localhost:3001/api/playlists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const response = await responseJSON.json();
    return response;
  }

  async updatePlaylist({ id, field }) {
    try {
      const body = JSON.stringify({ name: field });
      await fetch(
        `http://localhost:3001/api/playlists/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body
        }
      );
      const playlists = await this.getPlaylists(this.getUserId());
      this.setState({ elementsView: playlists });
    } catch (error) {
      console.log(error);
    }
  }

  async updateFavPlaylist({ id, field }) {
    try {
      const body = JSON.stringify({ favourite: field });
     await fetch(
        `http://localhost:3001/api/playlists/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body
        }
      );
      const playlists = await this.getPlaylists(this.getUserId());
      this.setState({ elementsView: playlists });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlaylist({ id }) {
    try {
       await fetch(
        `http://localhost:3001/api/playlists/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const playlists = await this.getPlaylists(this.getUserId());
      this.setState({ elementsView: playlists });
    } catch (error) {
      console.log(error);
    }
  }

  async create({ name, isMain, favourite, userId }) {
    try {
      const body = JSON.stringify({ name, isMain, favourite, userId });
      await fetch(`http://localhost:3001/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });
      const playlists = await this.getPlaylists(this.getUserId());
      this.setState({ elementsView: playlists });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        <AllPlaylistsGrid
          onCreate={this.create}
          items={this.state.elementsView}
          onUpdateNamePlaylist={this.updatePlaylist}
          onUpdateFavPlaylist={this.updateFavPlaylist}
          onDeletePlaylist={this.deletePlaylist}
          defaultSettings={this.props}
        />

      </div>
    );
  }
}
export default Playlist;
