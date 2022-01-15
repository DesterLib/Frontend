import React, { Component } from "react";

import { Button } from "react-bootstrap";

export default class PlaylistMenu extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    let { auth, metadata, server } = this.state;
    let m3u8 = `#EXTM3U\n#EXTENC: UTF-8\n#PLAYLIST: ${metadata.name}\n`;

    for (var i = 0; i < metadata.children.length; i++) {
      m3u8 += `#EXTINF:0, ${
        metadata.children[i].name
      }\n${server}/api/v1/redirectdownload/${encodeURI(
        metadata.children[i].name
      )}?a=${auth}&id=${metadata.children[i].id}\n`;
    }

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(m3u8)
    );
    element.setAttribute("download", `${metadata.name}.m3u8`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    return (
      <div className="info__button">
        <Button
          variant="primary"
          onClick={this.handleClick}
        >
        <i className="bi bi-music-note-list"></i>Playlist
        </Button>
      </div>
    );
  }
}
