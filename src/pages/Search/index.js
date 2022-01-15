import React, { Component } from "react";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";

import { Carousel, Footer, Nav, seo, SkeletonEpisodePage, theme } from "../../components";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      isLoaded: false,
      metadata: [],
      query: this.props.match.params.q,
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
      ui_config: JSON.parse(
        window.localStorage.getItem("ui_config") ||
          window.sessionStorage.getItem("ui_config") ||
          "{}"
      ),
    };
  }

  componentDidMount() {
    let { auth, query, server, ui_config } = this.state;

    if (!auth || !server) {
      this.props.history.push("/logout");
    }

    seo({
      title: `${ui_config.title || "libDrive"} - ${query}`,
      description: `Find ${query} on ${ui_config.title || "libDrive"}!`,
    });

    let req_path = `${server}/api/v1/metadata`;
    let req_args = `?a=${auth}&q=${encodeURIComponent(query)}`;

    axios
      .get(req_path + req_args)
      .then((response) =>
        this.setState({
          isLoaded: true,
          metadata: response.data.content,
        })
      )
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
    let { isLoaded, metadata, query } = this.state;

    return isLoaded ? (
      <div className="Search">
        <Nav {...this.props} query={query} />
        <Carousel metadata={metadata} hide={true} />
        <Footer />
      </div>
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}
