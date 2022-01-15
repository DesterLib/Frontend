import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

import {
  App,
  Browse,
  CategoryBrowse,
  Genres,
  Login,
  Logout,
  NotFound,
  Search,
  SearchMain,
  Settings,
  SettingsLoginForm,
  StarredLists,
  theme,
  guid,
  View,
  ScrollToTop,
} from "./components";
import "./index.css";

ReactDOM.render(
  <ScrollToTop>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route
          exact
          path={"/"}
          render={(props) => <App key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/browse"}
          render={(props) => <Browse key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/browse/:category"}
          render={(props) => <CategoryBrowse key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/starred"}
          render={(props) => <StarredLists key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/genres"}
          render={(props) => <Genres key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/login"}
          render={(props) => <Login key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/logout"}
          render={(props) => <Logout key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/search"}
          render={(props) => <SearchMain key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/search/:q"}
          render={(props) => <Search key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/settings"}
          render={(props) => <Settings key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/settings/login"}
          render={(props) => <SettingsLoginForm key={guid()} {...props} />}
        />
        <Route
          exact
          path={"/view/m/:id"}
          render={(props) => <View key={guid()} type={"m"} {...props} />}
        />
        <Route
          exact
          path={"/view/tb/:id"}
          render={(props) => <View key={guid()} type={"tb"} {...props} />}
        />
        <Route
          exact
          path={"/view/ts/:id"}
          render={(props) => <View key={guid()} type={"ts"} {...props} />}
        />
        <Route
          path={""}
          render={(props) => <NotFound key={guid()} {...props} />}
        />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
  </ScrollToTop>,
  document.getElementById("root")
);
