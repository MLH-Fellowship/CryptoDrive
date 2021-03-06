/**
 * SaveFile Component
 * 
 * Used to deliver .pem files based on the key fetched from IPFS.
 * An example can be seen in Signup page, when you are able to download
 * Public and Private Keys.
 */

import React, { useEffect, useState } from "react";

export const SaveFile = ({ text, fileName, buttonText }) => {
  // set up local state for generating the download link
  const [downloadLink, setDownloadLink] = useState("");

  // function for generating file and set download link
  const makeTextFile = () => {
    // This creates the file.
    // In my case, I have an array, and each item in
    // the array should be on a new line, which is why
    // I use .join('\n') here.
    const data = new Blob([text], { type: "text/plain" });

    // this part avoids memory leaks
    if (downloadLink !== "") window.URL.revokeObjectURL(downloadLink);

    // update the download link state
    setDownloadLink(window.URL.createObjectURL(data));
  };

  // Call the function if list changes
  useEffect(() => {
    makeTextFile();
  }, [text]);

  return (
    <a
      // this attribute sets the filename
      download={`${fileName}.pem`}
      // link to the download URL
      href={downloadLink}
    >
      {buttonText}
    </a>
  );
};

export default SaveFile;
