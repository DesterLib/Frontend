import React, { Component } from "react";

import { Redirect } from "react-router-dom";

import { guid } from "../../components";
import SkeletonEpisodePage from "../Skeleton/EpisodePage";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false };
  }

  componentDidMount() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    setTimeout(() => this.setState({ isLoaded: true }), 500);
  }

  render() {
    let { isLoaded } = this.state;

    return isLoaded ? (
      <Redirect to="/login" key={guid()} />
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}
