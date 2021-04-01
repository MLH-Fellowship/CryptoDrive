import React from "react";
import { TextField } from "@material-ui/core";

const MyFile = (props) => {
  return (
    <div
      style={{
        height: "55px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <span style={{ flexBasis: 3 }}>
        <b>Filename</b>
        <br />
        {props.filename}
      </span>
      <br />

      <TextField
        value={props.hash}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  );
};

export default MyFile;
