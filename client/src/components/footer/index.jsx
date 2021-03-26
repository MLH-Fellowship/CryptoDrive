import React from "react";
import "./footer.css"

const Footer = (props) => {
  const {label, link, linkText} = props;

  return <div className="footer"> 
    <p>{label}</p>
    <a href={link}>{linkText}</a>
  </div>;
};

export default Footer
