import React, { Component } from "react";

import { CircularProgress } from "@material-ui/core";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";
import queryString from "query-string";

import {
  Footer,
  Nav,
  PageMenu,
  SortMenu,
  seo,
  theme,
  Tile,
  SkeletonEpisodePage,
} from "../../components";

export default class CategoryBrowse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      genre: queryString.parse(this.props.location.search).genre || "",
      isLoaded: false,
      metadata: {},
      page: parseInt(queryString.parse(this.props.location.search).page) || 1,
      range: `${
        queryString.parse(this.props.location.search).page === undefined
          ? "0:12"
          : `${
              (parseInt(queryString.parse(this.props.location.search).page) -
                1) *
              12
            }:${
              parseInt(queryString.parse(this.props.location.search).page) * 12
            }`
      }`,
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
      sort: queryString.parse(this.props.location.search).sort || "",
      ui_config: JSON.parse(
        window.localStorage.getItem("ui_config") ||
          window.sessionStorage.getItem("ui_config") ||
          "{}"
      ),
    };
  }

  componentDidMount() {
    let { auth, genre, range, server, sort } = this.state;

    if (!auth || !server) {
      this.props.history.push("/logout");
    }

    let req_path = `${server}/api/v1/metadata`;
    let req_args = `?a=${auth}&g=${encodeURIComponent(
      genre
    )}&r=${range}&s=${sort}`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        this.setState({
          isLoaded: true,
          metadata: response.data.content,
          pages: Math.ceil(response.data.content[0]["length"] / 12) || 1,
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          let data = error.response.data;
          if (data.code === 401) {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Login",
              confirmButtonColor: theme.palette.success.main,
            }).then((result) => {
              if (result.isConfirmed) {
                this.props.history.push("/logout");
              }
            });
          } else if (!server) {
            this.props.history.push("/logout");
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "Logout",
              confirmButtonColor: theme.palette.success.main,
              cancelButtonText: "Retry",
              cancelButtonColor: theme.palette.error.main,
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.props.history.push("/logout");
              } else if (result.isDismissed) {
                location.reload();
              }
            });
          }
        } else if (error.request) {
          if (!server) {
            this.props.history.push("/logout");
          } else {
            Swal.fire({
              title: "Error!",
              text: `libDrive could not communicate with the server! Is '${server}' the correct address?`,
              icon: "error",
              confirmButtonText: "Logout",
              confirmButtonColor: theme.palette.success.main,
              cancelButtonText: "Retry",
              cancelButtonColor: theme.palette.error.main,
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.props.history.push("/logout");
              } else if (result.isDismissed) {
                location.reload();
              }
            });
          }
        }
      });
  }

  componentWillUnmount() {
    seo();
  }

  render() {
    let { genre, isLoaded, metadata, page, pages, sort, ui_config } =
      this.state;

    if (isLoaded) {
      seo({
        title: `${ui_config.title || "libDrive"}${genre ? ` - ${genre}` : ""}`,
        description: `Browse ${genre ? `the ${genre} genre` : "genres"} on ${
          ui_config.title || "libDrive"
        }!`,
      });
    }

    return isLoaded ? (
      <div className="CategoryBrowse">
        <Nav {...this.props} />
        <Tile metadata={metadata} />
        <PageMenu
          state={{ genre: genre, page: page, pages: pages, sort: sort }}
          props={this.props}
        />
        <SortMenu state={{ genre: genre, sort: sort }} props={this.props} />
        <Footer />
      </div>
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}
