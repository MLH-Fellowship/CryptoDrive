/**
 * Filebar Component
 * Used to display the filenames and sizes in MyFiles Section.
 * Every filebar component has Filename and Sizes, computed in MBs
 */

import React from "react";

const FileBar = (props) => {
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
      <span>
        <b>Filename</b>
        <br />
        {props.filename}
        <br />
      </span>
      <span>
        <b>Size(MB)</b>:<br />
        {props.filesize / 1000000}
      </span>
    </div>
  );
};

export default FileBar;
