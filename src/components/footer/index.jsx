import React from "react";
import "./footer.css"

const Footer = (props) => {
  const {label, link, linkText} = props;

  return <div className="footer"> 
    <p>{label}    <a href={link}>{linkText}</a></p>

  </div>;
};

export default Footer
