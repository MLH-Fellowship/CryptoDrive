// import React, { Component } from "react";
// import { Grid } from "@material-ui/core";
// // Import React FilePond
// // import { FilePond, registerPlugin } from "react-filepond";

// class DragAndDrop extends Component {
//   state = {
//     drag: false,
//   };
//   dropRef = React.createRef();
//   handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };
//   handleDragIn = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     this.dragCounter++;
//     if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
//       this.setState({ drag: true });
//     }
//   };
//   handleDragOut = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     this.dragCounter--;
//     if (this.dragCounter === 0) {
//       this.setState({ drag: false });
//     }
//   };
//   handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     this.setState({ drag: false });
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       this.props.handleDrop(e.dataTransfer.files);
//       e.dataTransfer.clearData();
//       this.dragCounter = 0;
//     }
//   };
//   componentDidMount() {
//     let div = this.dropRef.current;
//     div.addEventListener("dragenter", this.handleDragIn);
//     div.addEventListener("dragleave", this.handleDragOut);
//     div.addEventListener("dragover", this.handleDrag);
//     div.addEventListener("drop", this.handleDrop);
//   }
//   componentWillUnmount() {
//     let div = this.dropRef.current;
//     div.removeEventListener("dragenter", this.handleDragIn);
//     div.removeEventListener("dragleave", this.handleDragOut);
//     div.removeEventListener("dragover", this.handleDrag);
//     div.removeEventListener("drop", this.handleDrop);
//   }
//   render() {
//     return (
//       <div
//         style={{ display: "inline-block", position: "relative" }}
//         ref={this.dropRef}
//       >
//         {this.state.dragging && (
//           <div
//             style={{
//               border: "dashed grey 4px",
//               backgroundColor: "rgba(255,255,255,.8)",
//               position: "absolute",
//               top: 0,
//               bottom: 0,
//               left: 0,
//               right: 0,
//               zIndex: 9999,
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 right: 0,
//                 left: 0,
//                 textAlign: "center",
//                 color: "grey",
//                 fontSize: 36,
//               }}
//             >
//               <div>drop here :)</div>
//             </div>
//           </div>
//         )}
//         {this.props.children}
//       </div>
//     );
//   }
// }
// export default DragAndDrop;

// // // Import FilePond styles
// // import "filepond/dist/filepond.min.css";

// // // Import the Image EXIF Orientation and Image Preview plugins
// // // Note: These need to be installed separately
// // // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// // import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
// // import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// // import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// // // Import  Redirect and ROute
// // import { Redirect } from "react-router-dom";
// // import * as ROUTES from "./../../constants/routes";
// // // Register the plugins
// // registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// // export default function DragAndDrop() {
// //   function getToken() {
// //     const tokenString = sessionStorage.getItem("token");
// //     const userToken = JSON.parse(tokenString);
// //     return userToken;
// //   }

// //   const token = getToken();
// //   const [files, setFiles] = useState([]);

// //   if (!token) {
// //     return <Redirect to={ROUTES.SIGN_IN} />;
// //   }

// //   return (
// //     <Grid container>
// //       <Grid item xs={12} sm={12} md={12} lg={12}>
// //         <br />
// //         <br />
// //         <center>
// //           {" "}
// //           <h2>Use CryptoDrive Here </h2>
// //         </center>
// //         <FilePond
// //           files={files}
// //           allowReorder={true}
// //           allowMultiple={true}
// //           server="http://localhost:8000/upload"
// //           onupdatefiles={setFiles}
// //           labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
// //           name="file"
// //         />
// //         {console.log(files)}
// //       </Grid>
// //     </Grid>

// //   );
// // }
