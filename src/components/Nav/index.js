import React, { Component } from "react";

import axios from "axios";

import NavUI from "./NavUI";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: {},
      auth:
        window.sessionStorage.getItem("auth") ||
        window.localStorage.getItem("auth") ||
        "0",
      categories: [],
      isLoaded: false,
      server:
        window.sessionStorage.getItem("server") ||
        window.localStorage.getItem("server") ||
        window.location.origin,
      ui_config: {},
    };
  }

  componentDidMount() {
    let { auth, server } = this.state;

    let req_path = `${server}/api/v1/environment`;
    let req_args = `?a=${auth}`;

    axios.get(req_path + req_args).then((response) => {
      let data = response.data;
      this.setState({
        accounts: data.content.account_list,
        categories: data.content.category_list,
        isLoaded: true,
        ui_config: data.content.ui_config,
      });
      if (typeof data.content.ui_config == "object") {
        window.localStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
        window.sessionStorage.setItem(
          "ui_config",
          JSON.stringify(data.content.ui_config)
        );
      }
    });
  }

  render() {
    let { accounts, categories, isLoaded } = this.state;

    return isLoaded ? (
      <div className="Nav">
        <NavUI
          state={{
            accounts: accounts,
            categories: categories,
            query: this.props.query,
          }}
          {...this.props}
        />
      </div>
    ) : isLoaded ? (
      <div className="Nav">
        <NavUI
          state={{
            accounts: accounts,
            categories: categories,
            query: this.props.query,
          }}
          {...this.props}
        />
      </div>
    ) : (
      <NavUI
        state={{ accounts: [], categories: [], query: this.props.query }}
        {...this.props}
      />
    );
  }
}
