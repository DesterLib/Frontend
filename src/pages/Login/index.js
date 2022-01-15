import React, { Component } from "react";

import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { Button } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Swal from "sweetalert2/src/sweetalert2.js";
import "@sweetalert2/theme-dark/dark.css";

import axios from "axios";

import { theme } from "../../components";
import Footer from "../../components/Footer";
import { Form } from "react-bootstrap";

import "./style.css";

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      error: "",
      page: false,
      password: "",
      signup: false,
      server: window.location.origin,
      username: "",
    };

    this.handleTempServerChange = this.handleTempServerChange.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleServerSubmit = this.handleServerSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  componentDidMount() {
    let { server } = this.state;

    let req_path = `${server}/api/v1/auth`;
    let req_args = `?rules=signup`;

    axios.get(req_path + req_args).then((response) => {
      let data = response.data;
      if (data.code === 200) {
        window.localStorage.setItem("auth", "0");
        window.localStorage.setItem("server", server);
        window.localStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
        window.sessionStorage.setItem("auth", "0");
        window.sessionStorage.setItem("server", server);
        window.sessionStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
        this.props.history.push("/browse");
      } else if (data.content === true) {
        this.setState({ signup: true, page: true });
      } else if (data.content === false) {
        this.setState({ signup: false, page: true });
      }
    });
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleServerSubmit(evt) {
    evt.preventDefault();
    let { server } = this.state;

    if (!server) {
      return this.setState({ error: "Server is required" });
    }
    if (!server.startsWith("http")) {
      server = `https://${server}`;
    }

    let req_path = `${server}/api/v1/auth`;
    let req_args = `?rules=signup`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        let data = response.data;
        if (data.code === 200) {
          window.localStorage.setItem("auth", "0");
          window.localStorage.setItem("server", server);
          window.localStorage.setItem(
            "ui_config",
            JSON.stringify(data.content.ui_config)
          );
          window.sessionStorage.setItem("auth", "0");
          window.sessionStorage.setItem("server", server);
          window.sessionStorage.setItem(
            "ui_config",
            JSON.stringify(data.content.ui_config)
          );
          this.props.history.push("/browse");
        } else if (data.content === true) {
          this.setState({ server: server, signup: true, page: true });
        } else if (data.content === false) {
          this.setState({ server: server, signup: false, page: true });
        }
      })
      .catch((error) => {
        console.error(error);
        try {
          let data = response.data;
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        } catch {
          Swal.fire({
            title: "Error!",
            text: `You were unable to communicate with the server. Are you sure ${server} is the correct server?`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        }
      });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let { password, server, username } = this.state;

    let req_path = `${server}/api/v1/auth`;
    let req_args = `?u=${encodeURIComponent(username)}&p=${encodeURIComponent(
      password
    )}`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        let data = response.data;
        window.localStorage.setItem("server", server);
        window.sessionStorage.setItem("server", server);
        window.localStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
        window.localStorage.setItem("auth", data.content.auth);
        window.sessionStorage.setItem("auth", data.content.auth);
        window.sessionStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
        try {
          let data = response.data;
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        } catch {
          Swal.fire({
            title: "Error!",
            text: `The username and or password was incorrect!`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        }
      });
    return this.setState({ error: "" });
  }

  handleSignup() {
    let { password, server, username } = this.state;

    if (!username) {
      return this.setState({ error: "Username is required" });
    }
    if (!password) {
      return this.setState({ error: "Password is required" });
    }

    let req_path = `${server}/api/v1/signup`;
    let req_args = `?u=${encodeURIComponent(username)}&p=${encodeURIComponent(
      password
    )}`;

    axios
      .get(req_path + req_args)
      .then((response) => {
        let data = response.data;
        window.localStorage.setItem("server", server);
        window.sessionStorage.setItem("server", server);
        window.localStorage.setItem("auth", data.content.auth);
        window.sessionStorage.setItem("auth", data.content.auth);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
        let data = error.response;
        try {
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        } catch {
          Swal.fire({
            title: "Error!",
            text: `Something went wrong while communicating with the server ${server}`,
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: theme.palette.success.main,
          });
        }
      });
    return this.setState({ error: "" });
  }

  handleTempServerChange(evt) {
    this.setState({
      server: evt.target.value,
    });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    let { error, password, page, server, username } = this.state;
    const { classes } = this.props;

    return !page ? (
      <div className="Login-form">
        <Container className="Login-form-container" component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
            <form
              className={classes.form}
              onSubmit={this.handleServerSubmit}
              noValidate
            >
              {error && (
                <div style={{}}>
                  <h3 data-test="error" onClick={this.dismissError}>
                    <button onClick={this.dismissError}>✖</button>
                    {error}
                  </h3>
                </div>
              )}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Server</Form.Label>
                <Form.Control placeholder={server} onChange={this.handleTempServerChange}/>
              </Form.Group>
              <Button
                style={{width: "100%"}}
                type="submit"
                variant="primary"
                className={classes.submit}
              >
                Next
              </Button>
            </form>
          </div>
        </Container>
        <Footer />
      </div>
    ) : (
      <div className="Login-form">
        <Container className="Login-form-container" component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
              noValidate
            >
              {error && (
                <div style={{}}>
                  <h3 data-test="error" onClick={this.dismissError}>
                    <button onClick={this.dismissError}>✖</button>
                    {error}
                  </h3>
                </div>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Server</Form.Label>
                <Form.Control disabled placeholder={server} onChange={this.handleTempServerChange}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Username" value={username} onChange={this.handleUserChange}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={this.handlePassChange}/>
              </Form.Group>
              <Button
                type="submit"
                style={{width: "100%"}}
                variant="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              {this.state.signup ? (
                <div className="Signup" style={{ textAlign: "center" }}>
                  <Button
                    type="button"
                    onClick={this.handleSignup}
                    fullWidth
                    variant="primary"
                    style={{ marginTop: 0 }}
                    className={classes.submit}
                  >
                    Sign Up
                  </Button>
                  <Typography variant="body1">
                    Be aware that the owner of this server can view your
                    credentials!
                  </Typography>
                </div>
              ) : (
                <div className="Signup"></div>
              )}
            </form>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Login);
