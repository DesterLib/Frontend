import React, { Component } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";

export default class StarDialog extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.state, isCreateOpen: false };
  }

  render() {
    let { isOpen, metadata, trailer } = this.props;

    return (
      <div>
        <Dialog
          onClose={this.props.handleClose}
          aria-labelledby="simple-dialog-title"
          fullWidth={true}
          maxWidth={"lg"}
          open={isOpen || false}
        >
          <DialogTitle id="simple-dialog-title">
            {metadata.title} - Trailer
          </DialogTitle>
          <div style={{ padding: "0 30px 30px 30px", height: "70vh" }}>
            <iframe
              style={{ width: "100%", height: "100%", borderRadius: "12px" }}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={`${metadata.title} - Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"
              allowFullScreen
            ></iframe>
          </div>
        </Dialog>
      </div>
    );
  }
}
