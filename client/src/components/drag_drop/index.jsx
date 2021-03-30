import React from "react";
import "./file_upload.css";
import StringUpload from "../../Ipfs/StringUpload";

class ImageUploader extends React.Component {
  constructor() {
    super();
    this.handleAddImage = this.handleAddImage.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragLeave = this.handleDragLeave.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleCancelUpload = this.handleCancelUpload.bind(this);
    this.state = {
      file: null,
      dragOver: false,
      errorNoficication: null,
    };
  }

  /**
     Drag and Drop Event Handlers
  **/
  handleDragEnter(e) {
    e.preventDefault();
  }
  handleDragOver(e) {
    e.preventDefault();
    if (!this.state.dragOver) {
      this.setState({
        dragOver: true,
      });
    }
  }
  handleDragLeave(e) {
    e.preventDefault();
    this.setState({
      dragOver: false,
    });
  }
  handleDrop(e) {
    e.preventDefault();
    let file = e.dataTransfer.files[0];

    // Validate file is of type Image
    // let fileType = file.type.split("/")[0];
    // if (fileType !== "image") {
    //   console.log("Not an image file");
    //   this.setState({
    //     file: null,
    //     errorNotification: "Not an image File",
    //     dragOver: false,
    //   });
    //   return setTimeout(() => {
    //     this.setState({
    //       errorNotification: null,
    //     });
    //   }, 3000);
    // }
    // this.refs.image.files = e.dataTransfer.files;
    document.getElementById("upload-image-input").fileList =
      e.dataTransfer.files[0];
    this.setState({
      file,
      dragOver: false,
    });
  }

  /**
     Handle Manually (File Input) Added Files
  **/
  handleAddImage(e) {
    e.preventDefault();
    let file = this.refs.image.files[0];

    // Validate file is of type Image
    // let fileType = this.refs.image.files[0].type.split("/")[0];
    // if (fileType !== "image") {
    //   console.log("Not an image file");
    //   this.setState({
    //     file: null,
    //     errorNotification: "Not an image File",
    //     dragOverClass: "",
    //   });
    //   return setTimeout(() => {
    //     this.setState({
    //       errorNotification: null,
    //     });
    //   }, 3000);
    // }

    this.setState({
      file,
    });
  }

  /**
     Handle Upload after Upload Button Clicked
  **/
  handleUploadImage(e) {
    e.preventDefault();
    if (this.refs.image.files[0]) {
      console.log("Uploading Image " + this.refs.image.files[0].name + "");

     
      /**
           Handle image Upload
        **/
    }
  }
  handleCancelUpload(e) {
    e.preventDefault();
    this.setState({
      file: null,
    });
  }

  render() {
    // Match drag over css to hover css
    let dragOverClass = this.state.dragOver
      ? `display-box drag-over`
      : `display-box`;

    // If file is set, change upload box text to file name
    let uploadText = this.state.file ? (
      <div>
        <h4>{this.state.file.name}</h4>
        <button
          className="cancel-upload-button btn btn-warning"
          onClick={this.handleCancelUpload}
        >
          Cancel
        </button>
        <button
          className="upload-button btn btn-primary"
          onClick={this.handleUploadImage}
        >
          Upload
        </button>
      </div>
    ) : (
      <div>
        <h4>Choose Files to Upload</h4>
      </div>
    );

    // Show Error message if file type is not an image
    let errorNotification = this.state.errorNotification ? (
      <div className="error-notification">
        <p>{this.state.errorNotification}</p>
      </div>
    ) : null;

    return (
      <div className="image-uploader-wrapper">
        <div className={dragOverClass}>
          <div className="icon-text-box">
            <div className="upload-icon">
              <i className="fa fa-upload" aria-hidden="true" />
            </div>
            <div className="upload-text">{uploadText}</div>
            {errorNotification}
          </div>
          <div>
            <input
              type="file"
              ref="image"
              id="upload-image-input"
              className="upload-image-input"
              accept="image/*"
              onDrop={this.handleDrop}
              onDragEnter={this.handleDragEnter}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragLeave}
              onChange={this.handleAddImage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploader;
