import React, { Component } from "react";

import { Nav } from "../../components";

import "./index.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <Nav {...this.props} />
        <div className="nf">
          <div className="fof">
            <h1>Error 404: Not Found</h1>
          </div>
        </div>
      </div>
    );
  }
}
