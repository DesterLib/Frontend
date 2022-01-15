import React, { Component } from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import { theme } from "../../components";

export default class StarDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.state, isCreateOpen: false };
    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleCreateChange = this.handleCreateChange.bind(this);
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleCreateClose(evt) {
    this.setState({ isCreateOpen: false });
  }

  handleCreateChange(evt) {
    this.setState({ createValue: evt.target.value });
  }

  handleCreateSubmit() {
    let { createValue } = this.state;
    let starred_lists = JSON.parse(
      window.localStorage.getItem("starred_lists") || "[]"
    );
    let n = starred_lists.findIndex((i) => i.name == createValue);

    if (n == -1) {
      let metadata = {
        categoryInfo: {
          id: "starred",
          name: createValue,
          type: "Starred",
        },
        name: createValue,
        children: [],
        type: "Starred",
      };
      starred_lists.push(metadata);
      window.localStorage.setItem(
        "starred_lists",
        JSON.stringify(starred_lists)
      );
      this.setState({ isCreateOpen: false, starred_lists: starred_lists });
    } else {
      this.setState({ isCreateOpen: false });
    }
  }

  handleListItemClick(s, n) {
    if (s == "createStarredList" && n == -1) {
      this.setState({ isCreateOpen: true });
    } else {
      let { metadata } = this.props;
      let starred_lists = JSON.parse(
        window.localStorage.getItem("starred_lists") || "[]"
      );
      let i = starred_lists[n].children.findIndex((i) => i.id == metadata.id);
      if (i == -1) {
        starred_lists[n].children.unshift(metadata);
        window.localStorage.setItem(
          "starred_lists",
          JSON.stringify(starred_lists)
        );
        this.props.handleClose("unstarred");
        this.setState({ starred_lists: starred_lists });
      } else {
        starred_lists[n].children.splice(i, 1);
        window.localStorage.setItem(
          "starred_lists",
          JSON.stringify(starred_lists)
        );
        this.props.handleClose();
      }
    }
  }

  render() {
    let { isOpen, metadata } = this.props;
    let { isCreateOpen } = this.state;
    let starred_lists = JSON.parse(
      window.localStorage.getItem("starred_lists") || "[]"
    );

    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="simple-dialog-title"
          open={isOpen}
        >
          <DialogTitle id="simple-dialog-title">
            Select starred list
          </DialogTitle>
          <List>
            {starred_lists && starred_lists.length
              ? starred_lists.map((s, n) => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(s, n)}
                    key={s.name}
                  >
                    <ListItemAvatar>
                      <Avatar
                        style={
                          s.children.some((x) => x.id == metadata.id)
                            ? { backgroundColor: theme.palette.success.main }
                            : null
                        }
                      >
                        <ListIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={s.name} />
                  </ListItem>
                ))
              : null}

            <br />
            <ListItem
              autoFocus
              button
              onClick={() => this.handleListItemClick("createStarredList", -1)}
            >
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Create starred list" />
            </ListItem>
          </List>
        </Dialog>
        <Dialog
          open={isCreateOpen}
          onClose={this.handleCreateClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create starred list</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter the starred list's name in the form below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              onChange={this.handleCreateChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCreateClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
