import React, { useState } from "react";
import { Grid} from '@material-ui/core'
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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function DragAndDrop() {
  const [files, setFiles] = useState([]);
  return (
    <Grid container>
         <Grid item xs={12} sm={12} md={12} lg={12}>
    <div  style={{color:'lightgreen',width:"100%",background:'black', opacity:'0.9', padding:'15px', borderRadius:"10px"}}>
CryptoDrive helps you to store your files in Decentralized fashion and works on principle of Ethical Data.<br/> 
We are one of the projects built by <br/>
<span style={{background:'white'}}>
<span style={{color:"#751b00"}}>Major</span>
<span style={{color:" #162f51"}} > League</span>
<span style={{color:"#ecc700"}}> Hacking</span></span> Fellows
<br/><br/>
<a href="yourPreferenceLink.com">Sameer</a><br/>
<a href="https://linkedin.com/in/imabp">Abir</a><br/>
<a href="yourPreferenceLink.com">Kamesh</a><br/>

    </div></Grid>
    <Grid item xs={12} sm={12} md={6} lg={6}><br/>
    <br/><br/>  <b>Use CryptoDrive Here </b><br/><br/>
    <FilePond
        files={files}
        allowReorder={true}
        allowMultiple={true}
        server="http://localhost:8000/upload"
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        name="file"
      />
  </Grid></Grid>
  );
}
