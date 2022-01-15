import React, { Component } from "react";

import {
  Avatar,
  Button,
  Container,
  CircularProgress,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";

import { Footer, Nav, SkeletonEpisodePage, theme } from "../../components";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SettingsLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      isLoaded: false,
      secret: "",
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
    };

    this.handleSecretChange = this.handleSecretChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let navProps = { ...this.props };
    navProps.classes = {};
    this.setState({ isLoaded: true, navProps: navProps });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { secret, server } = this.state;

    let req_path = `${server}/api/v1/config`;
    let req_args = `?secret=${encodeURIComponent(secret)}`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        window.sessionStorage.setItem("secret", secret);
        this.props.history.push("/settings");
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
              confirmButtonText: "OK",
              confirmButtonColor: theme.palette.success.main,
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: data.message,
              icon: "error",
              confirmButtonText: "OK",
              confirmButtonColor: theme.palette.success.main,
            }).then((result) => {
              location.reload();
            });
          }
        } else if (error.request) {
          Swal.fire({
            title: "Error!",
            text: "libDrive could not communicate with the server. Is ${server} the correct address?",
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

  handleSecretChange(evt) {
    this.setState({
      secret: evt.target.value,
    });
  }

  render() {
    let { isLoaded, navProps, secret } = this.state;
    const { classes } = this.props;

    return isLoaded ? (
      <div className="SettingsLoginForm">
        <Nav {...navProps} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Settings Login</Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="secret"
                label="Secret"
                name="secret"
                type="password"
                autoComplete="secret"
                onChange={this.handleSecretChange}
                value={secret}
                required
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
        <Footer />
      </div>
    ) : (
      <SkeletonEpisodePage/>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SettingsLoginForm);
