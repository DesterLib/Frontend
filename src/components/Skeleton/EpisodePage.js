import React, { Component } from "react";
import "./style.css"

class SkeletonEpisodePage extends Component {
  render() {

    return (
        <div className="loader-container">
            <div className="loader">
                <div className="square one"></div>
                <div className="square two"></div>
            </div>
        </div>
    );
  }
}

export default (SkeletonEpisodePage);
