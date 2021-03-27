import React, { useState } from "react";
import { Grid } from "@material-ui/core";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Import Login 
import {LoginUI} from './../AuthUIs'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function DragAndDrop() {

  function getToken() {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }
  
  const token = getToken();
  const [files, setFiles] = useState([]);


  if (!token) {
    return <LoginUI/>;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <br />
        <br />
        <center>
          {" "}
          <h2>Use CryptoDrive Here </h2>
        </center>
        <FilePond
          files={files}
          allowReorder={true}
          allowMultiple={true}
          server="http://localhost:8000/upload"
          onupdatefiles={setFiles}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          name="file"
        />
        {console.log(files)}
      </Grid>
    </Grid>
  );
}
