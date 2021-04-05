import React from "react";
import { TextField } from "@material-ui/core";

const MyFile = (props) => {

  return (<>
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
        {props.name}
      </span>
      <br />

      <TextField
      variant="outlined"
        value={props.hash}
        InputProps={{
          readOnly: true,
        }}
      />
     { props.sender &&(
      <span style={{ flexBasis: 3 }}>
        {props.sender}
      </span>)}
    </div><br/></>
  );
};

export default MyFile;
