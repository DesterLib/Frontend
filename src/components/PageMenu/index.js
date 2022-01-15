import React, { Component } from "react";

import { Link, Redirect } from "react-router-dom";

import { Pagination, PaginationItem } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

import { guid } from "../../components";

const styles = (theme) => ({
  root: {
    "& > *": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px",
    },
  },
});

class PageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  render() {
    let { genre, page, pages, sort } = this.state;
    const { classes } = this.props;

    if (page > pages) {
      return (
        <Redirect
          to={{
            pathname: this.props.props.location.pathname,
            search: `?page=${pages}&genre=${genre}&sort=${sort}`,
          }}
          key={guid()}
        />
      );
    } else {
      return (
        <div className={classes.root}>
          <Pagination
            page={page}
            count={pages}
            variant="outlined"
            size={
              window.innerWidth >= 600
                ? "large"
                : window.innerWidth >= 390
                ? "medium"
                : "small"
            }
            color="primary"
            renderItem={(item) =>
              item.page ? (
                <Link
                  to={{
                    pathname: this.props.props.location.pathname,
                    search: `?page=${item.page}&genre=${genre}&sort=${sort}`,
                  }}
                  key={guid()}
                  className="no_decoration_link"
                >
                  <PaginationItem {...item} />
                </Link>
              ) : (
                <PaginationItem {...item} />
              )
            }
          />
        </div>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(PageMenu);
