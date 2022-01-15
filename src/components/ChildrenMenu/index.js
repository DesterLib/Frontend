import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Badge } from "react-bootstrap";

import { guid } from "../../components";
import "./style.css"

export default class ChildrenMenuBadge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: false,
      ...props.state,
    };
  }

  render() {
    let { metadata } = this.state;
    return (
        <div>
          <h4>Seasons</h4>
          <div className="season-container">
          {metadata.children.length
            ? metadata.children.map((child) => {
                if (child.type == "directory") {
                  return (
                    <Link
                      to={`/view/ts/${child.id}?q=0`}
                      className="no_decoration_link"
                      key={guid()}
                    >
                      <h4>
                      <Badge variant="dark" className="season-single" onClick={this.handleClose}>
                        {child.name}
                      </Badge>
                      </h4>
                    </Link>
                  );
                }
              })
            : null}
          </div>
        </div>
    );
  }
}

