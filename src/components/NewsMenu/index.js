import React, { Component } from "react";

import {
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

import axios from "axios";

import { guid, theme, version } from "../../components";

export default class NewsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dismissed:
        (window.localStorage.getItem("dismissed") || "false") == "true",
      isLoaded: false,
      isNew: false,
      lastChecked: new Date(
        window.localStorage.getItem("last_news_check") || "0"
      ).getTime(),
      menuAnchor: false,
      news: JSON.parse(window.localStorage.getItem("news") || "[]"),
      now: new Date().getTime(),
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    let { isNew, lastChecked, news, now } = this.state;
    let targetTime = lastChecked + 3 * 60 * 60 * 1000;

    if (news.length && news[0].tag_name) {
      if (version != news[0].tag_name.replace("v", "")) {
        isNew = true;
      }
    }

    if (now >= targetTime) {
      axios
        .get("https://api.github.com/repos/libDrive/libDrive/releases")
        .then((response) => {
          let data = response.data;
          window.localStorage.setItem("news", JSON.stringify(data));
          window.localStorage.setItem("last_news_check", now);
          if (
            news.length &&
            data.length &&
            news[0].tag_name != data[0].tag_name
          ) {
            window.localStorage.setItem("dismissed", "false");
            this.setState({
              dismissed: false,
              isLoaded: true,
              isNew: isNew,
              news: data,
            });
          } else {
            this.setState({
              isLoaded: true,
              isNew: isNew,
              news: data,
            });
          }
        });
    } else {
      this.setState({ isLoaded: true, isNew: isNew });
    }
  }

  handleClick(evt) {
    let { news, now } = this.state;

    this.setState({
      menuAnchor: evt.currentTarget,
    });

    axios
      .get("https://api.github.com/repos/libDrive/libDrive/releases")
      .then((response) => {
        let data = response.data;
        window.localStorage.setItem("news", JSON.stringify(data));
        window.localStorage.setItem("last_news_check", now);
        window.localStorage.setItem("dismissed", "true");
        this.setState({
          dismissed: true,
          news: data,
        });
      });
  }

  handleClose() {
    this.setState({
      menuAnchor: false,
    });
  }

  render() {
    let { dismissed, isNew, isLoaded, menuAnchor, news } = this.state;

    return isLoaded ? (
      <div className="NewsMenu">
        <IconButton
          aria-label="more"
          aria-controls="news-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {!dismissed && isNew ? (
            <Badge badgeContent={"N"} color="primary">
              <NotificationsIcon />
            </Badge>
          ) : (
            <NotificationsIcon />
          )}
        </IconButton>
        <Menu
          id="news-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={this.handleClose}
        >
          <List style={{ width: "530px", maxwidth: "90vw" }}>
            <ListItem pri="true" alignItems="flex-start">
              <ListItemText
                primary={
                  isNew ? (
                    <strong style={{ color: theme.palette.warning.main }}>
                      There is a new version available!
                    </strong>
                  ) : (
                    <strong style={{ color: theme.palette.success.main }}>
                      You are on the latest version
                    </strong>
                  )
                }
              />
            </ListItem>
            <Divider />
            {news.length
              ? news.slice(0, 3).map((item) => (
                  <ListItem pri="true" key={guid()} alignItems="flex-start">
                    <ListItemText
                      primary={<strong>libDrive {item.tag_name}</strong>}
                      secondary={
                        <React.Fragment>
                          <span style={{ whiteSpace: "pre-line" }}>
                            Version: {item.tag_name}
                            {"\n"}
                            Date: {new Date(item.published_at).toDateString()}
                            {"\n"}
                            Info:{" "}
                            <a
                              href={item.html_url}
                              target="_blank"
                              className="no_decoration_link"
                            >
                              <u>
                                {item.html_url.replace(
                                  "https://github.com/",
                                  ""
                                )}
                              </u>
                            </a>
                          </span>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))
              : null}
          </List>
        </Menu>
      </div>
    ) : null;
  }
}
