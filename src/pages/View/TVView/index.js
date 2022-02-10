import React, { Component } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  Avatar,
  Chip,
  ClickAwayListener,
  Container,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import YouTubeIcon from "@material-ui/icons/YouTube";

import Artplayer from "artplayer/examples/react/Artplayer";
import { default as toWebVTT } from "srt-webvtt";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";

import {
  ChildrenMenu,
  DownloadMenu,
  guid,
  PlayerMenu,
  PlaylistMenu,
  seo,
  StarDialog,
  theme,
  TrailerDialog,
} from "../../../components";
import { Alert, Badge, Button, Col, Figure, Ratio, Row } from "react-bootstrap";
import { PLACEHOLDER_BACKDROP } from "../../../config";

export class TVBView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.state,
      tooltipOpen: false,
      tooltipOpen2: false,
      trailer: {},
    };
    this.prettyDate = this.prettyDate.bind(this);
    this.handleStar = this.handleStar.bind(this);
    this.handleStarClose = this.handleStarClose.bind(this);
    this.handleTrailer = this.handleTrailer.bind(this);
    this.handleTrailerClose = this.handleTrailerClose.bind(this);
  }

  componentDidMount() {
    let { metadata, ui_config } = this.state;

    seo({
      title: `${ui_config.title || "libDrive"} - ${
        metadata.title || metadata.name
      }`,
      description: `Watch ${metadata.title || metadata.name} on ${
        ui_config.title || "libDrive"
      }! — ${metadata.overview}`,
      image: metadata.backdropPath,
      type: "video.movie",
    });
  }

  prettyDate() {
    let old_date = this.state.metadata.releaseDate;
    let date_comp = old_date.split("-");
    let date = new Date(date_comp[0], date_comp[1], date_comp[2]);
    return date.toDateString();
  }

  handleStar() {
    this.setState({ openStarDialog: true });
  }

  handleStarClose(evt) {
    if (evt == "starred") {
      this.setState({ openStarDialog: false, starred: true });
    } else if (evt == "unstarred") {
      this.setState({
        openStarDialog: false,
        starred:
          JSON.parse(window.localStorage.getItem("starred_lists") || "[]").some(
            (i) => i.children.some((x) => x.id == this.state.metadata.id)
          ) || false,
      });
    } else {
      this.setState({ openStarDialog: false });
    }
  }

  handleTrailer() {
    let { auth, metadata, server, trailer } = this.state;

    if (!trailer.key) {
      let req_path = `${server}/api/v1/trailer/${metadata.apiId}`;
      let req_args = `?a=${auth}&t=tv&api=${metadata.api}`;

      axios
        .get(req_path + req_args)
        .then((response) =>
          this.setState({
            openTrailerDialog: true,
            trailer: response.data.content,
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
                text: "No trailer could be found.",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: theme.palette.success.main,
              });
            }
          } else if (error.request) {
            if (!server) {
              this.props.history.push("/logout");
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong while looking for trailers.",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: theme.palette.success.main,
              });
            }
          }
        });
    } else {
      this.setState({ openTrailerDialog: true });
    }
  }

  handleTrailerClose() {
    this.setState({ openTrailerDialog: false });
  }

  render() {
    let { metadata, server, starred, tooltipOpen, tooltipOpen2, trailer } =
      this.state;

    return (
      <div className="TVBView">
        <div className="backdrop-img"><img src={metadata.backdropPath} alt={metadata.title + "[backdrop]"}/></div>
        <div className="item-details-content">
            <div className="row">
                    <div className="col-lg-3">
                        <div className="item-details-content-poster"> 
                        <img className="img-fluid rounded" src={metadata.posterPath} alt={metadata.title + "[poster]"} />
                            <div className="item-details-btn"> 
                            <Button as={Link} to={`/view/ts/${metadata.children[0].id}?q=0`} className="s-btn-1" variant="primary">Watch</Button>
                              <div className="item-details-btn-bottom">
                                  <Button className="s-btn-2" variant="primary" onClick={this.handleTrailer}><i className="bi bi-youtube"></i></Button>
                                  <Button className="s-btn-2" variant="primary"><i className="bi bi-bookmark-plus"></i></Button>
                              </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="item__details__text">
                            <div className="item__details__title">
                              <h3>{metadata.title}</h3> <span>Original Title: {metadata.title}</span> 
                            </div>
                            <div className="vote__container">
                              Rating
                                <ClickAwayListener
                                  onClickAway={() => this.setState({ tooltipOpen2: false })}
                                >
                                  <Tooltip
                                    title={
                                      <Typography variant="subtitle2">
                                        {metadata.voteAverage}/10
                                      </Typography>
                                    }
                                    arrow
                                    placement="right"
                                    open={tooltipOpen2}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    onClose={() => this.setState({ tooltipOpen2: false })}
                                    PopperProps={{
                                      disablePortal: true,
                                    }}
                                  >
                                    <div onClick={() => this.setState({ tooltipOpen2: true })}>
                                      <Rating
                                        name="Rating"
                                        value={metadata.voteAverage}
                                        max={10}
                                        readOnly
                                      />
                                    </div>
                                  </Tooltip>
                                </ClickAwayListener>
                              </div>
                              <p>{metadata.overview}</p>
                              <div className="item__details__widget">
                              <ChildrenMenu state={this.state} />
                                <div className="row">
                                    <div className="col">
                                    <ul>
                                        <li><span>Type:</span>{" "}T.V Serie</li>
                                        <li><span>Release Date:</span>{" "}
                                        {metadata.language
                                              ? `${this.prettyDate()} (${metadata.language.toUpperCase()})`
                                              : this.prettyDate()}
                                        </li>
                                        <li><span>Genre:</span>
                                        {metadata.adult ? (
                                          <Chip
                                            color="secondary"
                                            avatar={<Avatar>R</Avatar>}
                                            className="info__genre"
                                            label={"Adult (18+)"}
                                            variant="outlined"
                                          />
                                        ) : null}
                                        {metadata.genres && metadata.genres.length
                                          ? metadata.genres.map((genre) => (
                                              <Link
                                                to={`/genres?genre=${genre}`}
                                                className="no_decoration_link"
                                                key={guid()}
                                              >
                                                <Chip
                                                  avatar={<Avatar style={{backgroundColor: '#14dca0', color: '#000', fontWeight: 'bold'}}>{genre.charAt(0)}</Avatar>}
                                                  className="info__genre random_color"
                                                  label={genre}
                                                  variant="outlined"
                                                />
                                              </Link>
                                            ))
                                          : null}
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <StarDialog
          isOpen={this.state.openStarDialog}
          handleClose={this.handleStarClose}
          metadata={metadata}
        />
        <TrailerDialog
          isOpen={this.state.openTrailerDialog}
          handleClose={this.handleTrailerClose}
          metadata={metadata}
          trailer={trailer}
        />
      </div>
    );
  }
}

export class TVSView extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.state, subtitleMenuAnchor: false };
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubtitleMenuOpen = this.handleSubtitleMenuOpen.bind(this);
    this.handleSubtitleMenuClose = this.handleSubtitleMenuClose.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleParentSeason = this.handleParentSeason.bind(this);
  }

  componentDidMount() {
    let { metadata, q, ui_config } = this.state;

    metadata.children.length > 0 ?
    seo({
      title: `${ui_config.title || "libDrive"} - ${metadata.children[q].name}`,
      description: `Watch ${metadata.children[q].name} on ${
        ui_config.title || "libDrive"
      }!`,
      type: "video.episode",
    })
    : 
    seo({
      title: `${ui_config.title || "libDrive"} - NotFound`,
      description: `Watch --NotFound-- on ${
        ui_config.title || "libDrive"
      }!`,
      type: "video.episode",
    })
  }

  componentWillUnmount() {
    let { id, q, watching } = this.state;

    watching[id] = q;

    window.localStorage.setItem("watching", JSON.stringify(watching));
  }

  async onFileChange(evt) {
    if (evt.target.files.length) {
      if (evt.target.files[0].name.endsWith(".srt")) {
        const vtt = await toWebVTT(evt.target.files[0]);
        this.setState({
          file: vtt,
          fileName: evt.target.files[0].name,
          playerKey: guid(),
        });
      } else {
        this.setState({
          file: URL.createObjectURL(evt.target.files[0]),
          playerKey: guid(),
        });
      }
    } else {
      this.setState({ file: null, playerKey: guid() });
    }
  }

  handleSubtitleMenuOpen(evt) {
    let { tracks } = this.state;

    if (tracks.length) {
      this.setState({
        subtitleMenuAnchor: evt.currentTarget,
      });
    } else {
      const subtitleButton = document.getElementById("file-input-button");
      subtitleButton.click();
    }
  }

  handleSubtitleMenuClose() {
    this.setState({
      subtitleMenuAnchor: false,
    });
  }

  handleClickImage(url) {
    this.setState({ image_url: url });
  }

  handleCloseDialog() {
    this.setState({ image_url: null });
  }

  handleParentSeason(next) {
    let { metadata, parent_index } = this.state;

    if (next) {
      if (metadata.parent_children[parent_index + 1]) {
        this.props.history.push(
          `/view/ts/${metadata.parent_children[parent_index + 1].id}?q=0`
        );
      }
    } else {
      if (metadata.parent_children[parent_index - 1]) {
        this.props.history.push(
          `/view/ts/${metadata.parent_children[parent_index - 1].id}?q=0`
        );
      }
    }
  }

  render() {
    let {
      default_track,
      default_video,
      file,
      fileName,
      image_url,
      metadata,
      parent_index,
      playerKey,
      q,
      server,
      videos,
      tracks,
      subtitleMenuAnchor,
    } = this.state;

    if (file) {
      tracks = [{ name: fileName, url: file }];
    }

    function isHash(n, hash) {
      if (n === hash) {
        return "pls-playing";
      } else {
        return "";
      }
    }

    let sources = videos
    .map((source)=>({
        html: source.name,
        url: source.url
    }))

    return (
      <div className="TVSView">
        {metadata.children.length > 0 ?
        <>
        <Dialog
          onClose={this.handleCloseDialog}
          aria-labelledby="img-dialog"
          open={image_url ? true : false}
        >
          <DialogTitle id="img-dialog">Thumbnail</DialogTitle>
          <img src={image_url} style={{ padding: "25px" }} />
        </Dialog>
        <div className="plyr__component">
        <div className="video-top">
          <span className="video-title color-white">
          &nbsp;<Badge className="mb-1" pill bg="primary">S-{metadata.parent_children[parent_index].name.replace(/\D/g, "").replace(/\b(0(?!\b))+/g, "")}.E-{q+1}</Badge>
          <br/>
            <span className='break'>|</span> {metadata.children[q].name}
          </span>
        </div>
        <Ratio aspectRatio="16x9">
          <Artplayer
            option={{
                theme: '#14dca0',
                url: videos[0].url,
                aspectRatio: true,
                setting: true,
                hotkey: true,
                fullscreen: true,
                whitelist: ['*'],
                playbackRate: true,
                localSubtitle: true,
                quality: sources,
                subtitle: {
                  url: '',
                  type: 'srt',
                  style: {
                      color: '#03A9F4',
                  },
                  encoding: 'utf-8',
                  bilingual: true,
                },
            }}
        />
      </Ratio>
        <div className="d-flex justify-content-between pt-3">
            { q < 1 ? <Button disabled variant="dark">First Episode</Button> 
            : 
            <Button 
                as={Link} 
                to={{
                    pathname: window.location.pathname,
                    search: `?q=${+q - 1}`,
                }} 
                variant="primary">Previous
            </Button>
            }
            { q === metadata.children.length - 1 ? 
            <Button 
              disabled 
              variant="dark">Last Episode
            </Button> 
            : 
            <Button
              as={Link} 
              to={{
                  pathname: window.location.pathname,
                  search: `?q=${+q + 1}`,
              }} 
              variant="primary">Next
            </Button>
            }
        </div>
        <div
          className="file__info"
          style={{ background: theme.palette.background.paper }}
        >
        { metadata.parent_children[parent_index - 1] ? 
              <Button className="season-btn"
                className="season-btn"
                onClick={() => this.handleParentSeason(false)}
                variant="primary">Previous Season
              </Button>
            : 
            <Button 
              className="season-btn" 
              disabled 
              variant="dark"
            >First Season
            </Button> 
        }
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "20px 5px 20px 5px",
              }}
            >
              <PlayerMenu
                state={{
                  ...this.state,
                  id: metadata.children[q].id,
                  metadata: metadata.children[q],
                }}
              />
              <DownloadMenu state={this.state} tv={true} />
              <PlaylistMenu state={this.state} />
              <div className="info__button">
                <input
                  id="file-input"
                  hidden
                  onChange={this.onFileChange}
                  type="file"
                  accept=".vtt,.srt"
                />
                <Button
                  disabled
                  variant="dark"
                  component="span"
                  aria-controls="subtitles-menu"
                  onClick={this.handleSubtitleMenuOpen}
                >
                <i className="bi bi-badge-cc-fill"></i>Subtitle
                </Button>
                <Menu
                  id="subtitles-menu"
                  anchorEl={subtitleMenuAnchor}
                  keepMounted
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  open={Boolean(subtitleMenuAnchor)}
                  onClose={this.handleSubtitleMenuClose}
                >
                  {tracks.length ? (
                    <div>
                      {tracks.map((track) => (
                        <a className="no_decoration_link" href={track.url}>
                          <MenuItem onClick={this.handleSubtitleMenuClose}>
                            {track.name}
                          </MenuItem>
                        </a>
                      ))}
                      <Divider />
                    </div>
                  ) : null}
                  <MenuItem
                    onClick={() => {
                      document.getElementById("file-input-button").click();
                      this.setState({ subtitleMenuAnchor: false });
                    }}
                  >
                    Upload
                  </MenuItem>
                </Menu>
                <label htmlFor="file-input" id="file-input-button" />
              </div>
            </div>
          </div>
          { metadata.parent_children[parent_index + 1] ? 
            <Button 
              className="season-btn"
              onClick={() => this.handleParentSeason(true)}
              variant="primary">Next Season
            </Button>
            :
            <Button 
              className="season-btn"
              disabled 
              variant="dark">Last Season
            </Button> 
            }
        </div>
          <Container fluid>
                <Row className="m-2 pt-2">
                    <h2 className="color-white">Episodes</h2>
                    {metadata.children.length ? (metadata.children.map((child, n) => (
                        <Col key={guid()} className="p-3" xs={12} sm={6} md={4} lg={3} xl={3}>
                            <Link
                              to={{
                                pathname: window.location.pathname,
                                search: `?q=${n}`,
                              }}
                            >
                                <Figure>
                                    <div className="card-img mb-2">
                                        <div className="card-info-episode">
                                            <h5><Badge pill bg="dark">S-{metadata.parent_children[parent_index].name.replace(/\D/g, "").replace(/\b(0(?!\b))+/g, "")}.E-{n+1}</Badge></h5>
                                        </div>
                                        <div className="card-img-image">
                                            <Figure.Image 
                                              className="img-fluid card-image rounded"
                                              onClick={() =>
                                                this.handleClickImage(
                                                  `${server}/api/v1/image/thumbnail?id=${child.id}`
                                                )
                                              }
                                              onError={(e)=>{e.target.onerror = null; e.target.src=PLACEHOLDER_BACKDROP}}
                                              src={`${server}/api/v1/image/thumbnail?id=${child.id}`}
                                            />
                                            <div className="middle">
                                                <span className="round-button">
                                                    <i className="bi bi-play-fill"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Figure.Caption> 
                                        <span>{child.name}</span>
                                    </Figure.Caption>
                                </Figure>
                            </Link>
                        </Col>
                    ))): null}
                </Row>
            </Container>
        </div>
        </>
        : 
        <div>
          <Alert className="m-3">No Episodes Found</Alert>
          <div className="d-flex justify-content-between p-3">
            { metadata.parent_children[parent_index - 1] ? 
              <Button 
                onClick={() => this.handleParentSeason(false)}
                variant="primary">Previous Season
              </Button>
            : 
            <Button disabled variant="dark">First Season</Button> 
            }
            { metadata.parent_children[parent_index + 1] ? 
            <Button
              onClick={() => this.handleParentSeason(true)}
              variant="primary">Next Season
            </Button>
            :
            <Button 
              disabled 
              variant="dark">Last Season
            </Button> 
            }
        </div>
        </div>
        }
      </div>
    );
  }
}
