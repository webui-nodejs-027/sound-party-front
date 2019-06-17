import React, { Component } from "react";
import AllPlaylistsGrid from "./AllPlaylistsGrid";

class Playlist extends Component {
  constructor() {
    super();

    this.state = {
      elementsView: []
    };

    this.getPlaylists = this.getPlaylists.bind(this);
    this.create = this.create.bind(this);
    this.updatePlaylist = this.updatePlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }

  async componentDidMount() {
    const playlists = await this.getPlaylists(1);
    this.setState({ elementsView: playlists });
  }

  async getPlaylists(userId) {
    const responseJSON = await fetch(
      `http://localhost:3000/api/playlists/${userId}`,
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
      const response = await fetch(
        `http://localhost:3000/api/playlists/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body
        }
      );
      const playlists = await this.getPlaylists(1);
      console.log(playlists);
      this.setState({ elementsView: playlists });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deletePlaylist({ id }) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/playlists/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      const playlists = await this.getPlaylists(1);
      console.log(playlists);
      this.setState({ elementsView: playlists });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async create({ name, isMain, favourite, userId }) {
    try {
      const body = JSON.stringify({ name, isMain, favourite, userId });
      const response = await fetch(`http://localhost:3000/api/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body
      });
      const playlists = await this.getPlaylists(1);
      this.setState({ elementsView: playlists });
      console.log(response);
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
          onDeletePlaylist={this.deletePlaylist}
        />
      </div>
    );
  }
}
export default Playlist;
