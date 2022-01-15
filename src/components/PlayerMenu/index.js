import React, { Component } from "react";

import { Divider, Menu, MenuItem } from "@material-ui/core";
import { Button } from "react-bootstrap";

export default class PlayerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: false,
      ...props.state,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(evt) {
    this.setState({
      menuAnchor: evt.currentTarget,
    });
  }

  handleClose(evt) {
    this.setState({
      menuAnchor: false,
    });
  }

  render() {
    let { auth, id, isAndroid, isIOS, metadata, server } = this.state;

    let mobileUrl;
    const streamURL = new URL(
      `${server}/api/v1/redirectdownload/${encodeURIComponent(
        metadata.name
      )}?a=${auth}&id=${id}`
    );
    if (isAndroid) {
      const scheme = streamURL.protocol.slice(0, -1);
      streamURL.hash = `Intent;action=android.intent.action.VIEW;scheme=${scheme};type=${
        metadata.mimeType
      };S.title=${encodeURIComponent(metadata.name)};end`;
      streamURL.protocol = "intent";
      mobileUrl = streamURL.toString();
    } else if (isIOS) {
      streamURL.host = "x-callback-url";
      streamURL.port = "";
      streamURL.pathname = "stream";
      streamURL.search = `url=${server}/api/v1/redirectdownload/${encodeURIComponent(
        metadata.name
      )}?a=${auth}&id=${id}`;
      streamURL.protocol = "vlc-x-callback";
      mobileUrl = streamURL.toString();
    }

    return (
      <div className="info__button">
        <Button
          variant="primary"
          aria-controls="player-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <i className="bi bi-play-fill"></i>
          External Player
        </Button>
        <Menu
          id="player-menu"
          anchorEl={this.state.menuAnchor}
          keepMounted
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          open={Boolean(this.state.menuAnchor)}
          onClose={this.handleClose}
        >
          {isAndroid || isIOS ? (
            <div>
              <a href={mobileUrl} className="no_decoration_link">
                <MenuItem onClick={this.handleClose}>
                  {isAndroid ? "Android" : isIOS ? "IOS selector" : null}
                </MenuItem>
              </a>
              <Divider />
            </div>
          ) : (
            <div>
              <a
                href={`potplayer://${server}/api/v1/redirectdownload/${encodeURIComponent(
                  metadata.name
                )}?a=${auth}&id=${id}`}
                className="no_decoration_link"
              >
                <MenuItem onClick={this.handleClose}>PotPlayer</MenuItem>
              </a>
            </div>
          )}
          <Divider />
          <MenuItem
            onClick={() => {
              navigator.clipboard.writeText(
                `${server}/api/v1/redirectdownload/${encodeURIComponent(
                  metadata.name
                )}?a=${auth}&id=${id}`
              );
              this.handleClose();
            }}
          >
            Copy URL
          </MenuItem>
        </Menu>
      </div>
    );
  }
}
