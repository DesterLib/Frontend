import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Typography } from "@material-ui/core";

import { guid } from "../../components";
import "./index.css";
import { Col, Figure, Row } from "react-bootstrap";

export default class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metadata: this.props.metadata,
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
    };
  }

  render() {
    let { metadata, server } = this.state;

    return (
      <div className="Tile">
        {metadata.length
          ? metadata.map((category) => (
              <div className="tile__category" key={guid()}>
                <Link
                  to={`/browse/${category.categoryInfo.name}`}
                  key={guid()}
                  className="tile__category__title no_decoration_link"
                >
                  {category.categoryInfo.name}
                </Link>
                <div className="tile__items">
                <Row className="p-2">
                  {category.children.length
                    ? category.children.map((item) => (
                      <Col key={guid()} className="p-sm-3" xs={6} sm={4} md={3} lg={3} xl={2}>
                          <Figure key={guid()}>
                          <Link
                            to={`/view/${item.type == "file" ? "m" : "tb"}/${
                              item.id
                            }`}
                            key={guid()}
                          >
                            <div className="card-img mb-2">
                                <div className="card-img-image">
                                    <Figure.Image 
                                      className="img-fluid card-image rounded" 
                                      src={
                                        item.posterPath ||
                                        `${server}/api/v1/image/poster?text=${item.title}&extention=jpeg`
                                      }
                                      alt={item.title}
                                    />
                                    <div className="middle">
                                        <span className="round-button">
                                            <i className="bi bi-play-fill"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Figure.Caption key={guid()}> 
                                <h6>{item.title}</h6>
                            </Figure.Caption>
                          </Link>
                      </Figure>
                      </Col>
                      ))
                    : null}
                </Row>
                </div>
              </div>
            ))
          : null}
      </div>
    );
  }
}
