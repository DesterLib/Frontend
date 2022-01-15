import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { clear, guid, version } from "./components";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth"),
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server"),
    };
  }

  componentDidMount() {
    if (!window.localStorage.getItem("_VERSION")) {
      window.localStorage.setItem("_VERSION", version);
    }
    if (window.localStorage.getItem("_VERSION") !== version) {
      clear();
      window.localStorage.setItem("_VERSION", version);
    }
  }

  render() {
    let { auth, server } = this.state;

    return auth && server ? (
      <Redirect to="/browse" key={guid()} />
    ) : (
      <Redirect to="/login" key={guid()} />
    );
  }
}
