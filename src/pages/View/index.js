import React, { Component } from "react";

import { CircularProgress } from "@material-ui/core";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";
import queryString from "query-string";

import { Footer, guid, Nav, seo, SkeletonEpisodePage, theme } from "../../components";
import MovieView from "./MovieView";
import { TVBView, TVSView } from "./TVView";
import "./index.css";

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      id: this.props.match.params.id,
      isAndroid: /(android)/i.test(
        navigator.userAgent || navigator.vendor || window.opera
      ),
      isIOS:
        /iPad|iPhone|iPod/.test(
          navigator.userAgent || navigator.vendor || window.opera
        ) && !window.MSStream,
      isLoaded: false,
      metadata: {},
      openStarDialog: false,
      playerKey: guid(),
      q:
        queryString.parse(this.props.location.search).q ||
        JSON.parse(window.localStorage.getItem("watching") || "{}")[
          this.props.match.params.id
        ] ||
        0,
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
      videos: [],
      starred:
        JSON.parse(window.localStorage.getItem("starred_lists") || "[]").some(
          (i) => i.children.some((x) => x.id == this.props.match.params.id)
        ) || false,
      tracks: [{ name: null, url: null }],
      type: this.props.type,
      ui_config: JSON.parse(
        window.localStorage.getItem("ui_config") ||
          window.sessionStorage.getItem("ui_config") ||
          "{}"
      ),
      watching: JSON.parse(window.localStorage.getItem("watching") || "{}"),
    };
  }

  async componentDidMount() {
    let { auth, id, q, server, type } = this.state;
    q = parseInt(q);

    if (!auth || !server) {
      this.props.history.push("/logout");
    }

    document.documentElement.style.setProperty(
      "--plyr-color-main",
      theme.palette.primary.main
    );
    document.documentElement.style.setProperty(
      "--plyr-video-background",
      theme.palette.background.default
    );
    document.documentElement.style.setProperty(
      "--plyr-menu-background",
      theme.palette.background.paper
    );
    document.documentElement.style.setProperty(
      "--plyr-menu-color",
      theme.palette.text.primary
    );

    let req_path = `${server}/api/v1/metadata`;
    let req_args = `?a=${auth}&id=${encodeURIComponent(id)}`;

    var response1 = await axios.get(req_path + req_args).catch((error) => {
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
            text: `Something went wrong while communicating with the server! Is '${server}' the correct address?`,
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

    var metadata = response1.data.content;
    var response2;

    if (type == "m") {
      let req_path = `${server}/api/v1/streammap`;
      let req_args = `?a=${auth}&id=${encodeURIComponent(id)}&parent=${
        metadata.parents[0]
      }&name=${encodeURIComponent(metadata.name)}&t=${
        metadata.type
      }&server=${encodeURIComponent(server)}`;

      response2 = await axios.get(req_path + req_args).catch((error) => {
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
              text: `Something went wrong while communicating with the server! Is '${server}' the correct address?`,
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
    } else if (type == "ts") {
      if (metadata.children.length && metadata.children[q]) {
        let req_path = `${server}/api/v1/streammap`;
        let req_args = `?a=${auth}&id=${encodeURIComponent(
          metadata.children[q].id
        )}&parent=${id}&name=${encodeURIComponent(
          metadata.children[q].name
        )}&t=${metadata.children[q].type}&server=${encodeURIComponent(server)}`;


        console.log(req_path + req_args)

        response2 = await axios.get(req_path + req_args).catch((error) => {
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
                text: `Something went wrong while communicating with the server! Is '${server}' the correct address?`,
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
      } else {
        response2 = {
          data: { content: { default_video: 0, videos: [], subtitles: [] } },
        };
      }
    }

    var parent_index;
    if (metadata.parent_children) {
      for (let i = 0; i < metadata.parent_children.length; i++) {
        if (metadata.parent_children[i].id == id) {
          parent_index = i;
        }
      }
    }

    if (type == "m" || type == "ts") {
      this.setState({
        default_track: response2.data.content.default_track,
        default_video: response2.data.content.default_video,
        isLoaded: true,
        metadata: response1.data.content,
        parent_index: parent_index,
        q: q,
        type: type,
        videos: response2.data.content.videos,
        tracks: response2.data.content.tracks,
      });
    } else {
      this.setState({
        isLoaded: true,
        metadata: response1.data.content,
        type: type,
      });
    }
  }

  componentWillUnmount() {
    seo();
  }

  render() {
    let { isLoaded, metadata, ui_config } = this.state;

    if (isLoaded) {
      seo({
        title: metadata.title
          ? `${ui_config.title || "libDrive"} - ${metadata.title}`
          : ui_config.title || "libDrive",
        description: `Watch ${metadata.title || metadata.name} on ${
          ui_config.title || "libDrive"
        }!`,
        image: metadata.backdropPath,
      });
    }

    return isLoaded && metadata.type == "file" ? (
      <div className="View">
        <Nav {...this.props} />
        <MovieView state={this.state} />
        <Footer />
      </div>
    ) : isLoaded && metadata.type == "directory" && metadata.title ? (
      <div className="View">
        <Nav {...this.props} />
        <TVBView state={this.state} />
        <Footer />
      </div>
    ) : isLoaded && metadata.type == "directory" ? (
      <div className="View">
        <Nav {...this.props} />
        <TVSView state={this.state} history={this.props.history} />
        <Footer />
      </div>
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}
