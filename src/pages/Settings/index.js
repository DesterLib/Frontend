import React, { Component } from "react";

import { Button, CircularProgress, Switch, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";

import { Footer, Nav, SkeletonEpisodePage, theme } from "../../components";

const styles = (theme) => ({
  Form: {
    textAlign: "center",
    "& .MuiTextField-root": {
      width: "30ch",
      margin: theme.spacing(1),
      textAlign: "left",
    },
    "& .MuiTypography-root": {
      margin: "30px 30px",
    },
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
    width: "20ch",
  },
});

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      error: "",
      isLoaded: false,
      secret: window.sessionStorage.getItem("secret"),
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
    };

    this.dismissError = this.dismissError.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleKillSwitch = this.handleKillSwitch.bind(this);
    this.handleRebuild = this.handleRebuild.bind(this);
    this.handleFileBrowser = this.handleFileBrowser.bind(this);
  }

  componentDidMount() {
    let { secret, server } = this.state;

    let navProps = { ...this.props };
    navProps.classes = {};

    if (window.sessionStorage.getItem("secret") == null) {
      this.props.history.push("/settings/login");
    } else {
      let req_path = `${server}/api/v1/config`;
      let req_args = `?secret=${encodeURIComponent(secret)}`;

      axios
        .get(req_path + req_args)
        .then((response) =>
          this.setState({
            config: JSON.stringify(response.data.content, null, 4),
            isLoaded: true,
            navProps: navProps,
            tempSecret: response.data.content.secret_key,
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
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleRestart(evt) {
    evt.preventDefault();
    let { secret, server } = this.state;

    let req_path = `${server}/api/v1/restart`;
    let req_args = `?secret=${encodeURIComponent(secret)}`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: theme.palette.success.main,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Success!",
          text: "libDrive is being restarted, this might take some time, so the app won't load",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: theme.palette.success.main,
        });
      });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { secret, server } = this.state;

    let req_path = `${server}/api/v1/config`;
    let req_args = `?secret=${encodeURIComponent(secret)}`;

    axios
      .post(req_path + req_args, JSON.parse(this.state.config))
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: theme.palette.success.main,
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
              confirmButtonText: "Logout",
              confirmButtonColor: theme.palette.success.main,
            }).then((result) => {
              if (result.isConfirmed) {
                window.sessionStorage.removeItem("secret");
                this.props.history.push("/settings/login");
              }
            });
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
          Swal.fire({
            title: "Error!",
            text: `libDrive could not communicate with the server! Is ${server} the correct address?`,
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
      });
  }

  handleChange(evt) {
    this.setState({
      config: evt.target.value,
    });
  }

  handleKillSwitch(evt) {
    let config = JSON.parse(this.state.config);

    config.kill_switch = evt.target.checked;
    this.setState({ config: JSON.stringify(config, null, 4) });
    this.handleSubmit(evt);
  }

  handleRebuild(evt) {
    let { secret, server } = this.state;

    let req_path = `${server}/api/v1/rebuild`;
    let req_args = `?secret=${encodeURIComponent(secret)}`;

    axios
      .get(req_path + req_args)
      .then((response) =>
        Swal.fire({
          title: "Success!",
          text: "libDrive's metadata is being rebuilt...",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: theme.palette.success.main,
        })
      )
      .catch((error) => {
        console.error(error);
        if (auth == null || server == null) {
          this.props.history.push("/login");
        } else if (error.response) {
          if (error.response.status === 401) {
            Swal.fire({
              title: "Error!",
              text: "Your credentials are invalid!",
              icon: "error",
              confirmButtonText: "Logout",
              confirmButtonColor: theme.palette.success.main,
            }).then((result) => {
              if (result.isConfirmed) {
                this.props.history.push("/logout");
              }
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while communicating with the server!",
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
          Swal.fire({
            title: "Error!",
            text: `libDrive could not communicate with the server! Is ${server} the correct address?`,
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
      });
  }

  handleFileBrowser() {
    let { secret, server } = this.state;

    window.open(`${server}/api/v1/debug?secret=${secret}`);
  }

  render() {
    let { config, isLoaded, navProps } = this.state;
    const { classes } = this.props;

    return isLoaded ? (
      <div className="Settings">
        <Nav {...navProps} />
        <div
          style={{
            margin: "auto",
            marginTop: "50px",
            width: "80vw",
            maxWidth: "1500px",
          }}
        >
          <TextField
            style={{
              width: "100%",
              backgroundColor: theme.palette.background.paper,
            }}
            variant="outlined"
            label="Config"
            value={config}
            id="config-box"
            onChange={this.handleChange}
            multiline
            minRows={15}
            maxRows={30}
          />
        </div>
        <form
          className={classes.Form}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div style={{ margin: "30px" }}>
            <Button
              style={{ margin: "10px", width: "175px" }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit Config
            </Button>
            <Button
              style={{ margin: "10px", width: "175px" }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleRestart}
            >
              Restart Server
            </Button>
            <Button
              style={{ margin: "10px", width: "175px" }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleRebuild}
            >
              Rebuild Metadata
            </Button>
            <Button
              style={{ margin: "10px", width: "175px" }}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleFileBrowser}
            >
              File Browser
            </Button>
            <br />
            <p
              style={{
                fontSize: "16px",
                marginTop: "10px",
                marginBotoom: "5px",
              }}
            >
              Kill Switch
            </p>
            <Switch
              checked={this.state.config.kill_switch}
              onChange={this.handleKillSwitch}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </div>
        </form>
        <Footer />
      </div>
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Settings);
