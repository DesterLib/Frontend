import React, { Component } from "react";

import { Carousel, Footer, Nav } from "../../components";

export default class StarredLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starred_lists: JSON.parse(window.localStorage.getItem("starred_lists") || "[]"),
    };
  }

  render() {
    let { starred_lists } = this.state;

    return (
      <div className="StarredLists">
        <Nav {...this.props} />
        <Carousel metadata={starred_lists} star={true} />
        <Footer />
      </div>
    );
  }
}
