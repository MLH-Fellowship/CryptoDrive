import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyFiles from "./myfiles";
import Dashboard from "./dashbaord";
import * as ROUTES from "./../../constants/routes";
import { Redirect, Link } from "react-router-dom";
import SharedFiles from "./sharedfiles";
import FolderIcon from "@material-ui/icons/Folder";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ShareIcon from "@material-ui/icons/Share";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Validator from "../../utility/validator";
import Logo from "./../../assets/newLogo.svg";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // Function to get the public key pass hash
  function getPassHash() {
    const tokenString = localStorage.getItem("public_hash");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  // Function to get the username from local storage
  function getUsername() {
    const tokenString = localStorage.getItem("user_name");
    let userToken = null;

    if (tokenString) userToken = JSON.parse(tokenString);

    if (userToken) return userToken;
    else return false;
  }

  const token = getPassHash();
  const username = getUsername();
  // If the username or token is equal to null then it redirects to sign in
  if (token == null || username == null) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Settings of the TabPanel

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// Stylings CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    transition: "ease 1s all",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  leftPanelRoot:{
    position: "fixed",
    width: "calc(100% - 95%)",
 
    height: "100%",
  },
  leftPanel: {
    width: "calc(100% - 95%)",
    paddingLeft: "20px",
    paddingTop: "20px",
    background: "#6163FF",
    color: "#ECEDED",
    display: "flex",
    flexDirection: "column",
    width:'100%',
    height: "100%",
  },
  leftPanelHeading: {
    fontSize: "calc(100em - 98em)",
    paddingBottom: "5px",
    flexGrow: 1,
  },
  rightPanel: {
    paddingLeft: "calc(100% - 93%)",
    paddingTop: "22px",
    width: "100%",
    background:
      "black url(https://raw.githubusercontent.com/imabp/wallpapers/main/collection/430207.jpg) no-repeat",
    backgroundSize: "cover",
  },
  menu: {
    marginTop: "10px",
    flexGrow: 5,
  },
  navigationItem: {
    transition: "ease 0.2s all",

    "&:hover": {
      cursor: "pointer",

      paddingLeft: "13px",
    },
    paddingBottom: "10px",
  },
  logout: {
    justifyContent: "right",
  },
}));

// exporting the vertical tabs main function
export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [view, setView] = React.useState(0);
  const [privateKey, setPrivateKey] = React.useState("");
  const [logout, setLogout] = React.useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // Menu items list with index
  const menuItems = [
    {
      name: "My Files",
      index: 0,
    },
    {
      name: "Upload",
      index: 1,
    },
    {
      name: "Shared Files",
      index: 2,
    },
  ];

  const handleClick = (index) => {
    setView(index);
  };
  // If person clicks on log out the local storage will be deleted and returns the Page to Signin
  if (logout) {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
  // else it will display the tab panel
  return (
    <div className={classes.root}>
      <div className={classes.leftPanelRoot} style={{display:'flex', flexDirection:'column'}}>
        
        <div>
              <Link to={ROUTES.HOME}>
                <img src={Logo} height="50" width="80" />
              </Link>
            </div>
        
        <div className={classes.leftPanel}>
          <div className={classes.menu}>
            {menuItems.map((item, index) => (
              <div
                className={classes.navigationItem}
                onClick={() => {
                  handleClick(index);
                }}
              >
                {item.index === 0 && (
                  <b>
                    <FolderIcon />
                  </b>
                )}
                {item.index === 1 && (
                  <b>
                    <CloudUploadIcon />
                  </b>
                )}
                {item.index === 2 && (
                  <b>
                    <ShareIcon />
                  </b>
                )}
              </div>
            ))}
          </div>
          <div>
            <div
              onClick={() => {
                // Removing the tokens from the local storage
                localStorage.removeItem("public_hash");
                localStorage.removeItem("user_name");
                if (!Validator("publicHash") && !Validator("username")) {
                  setLogout(true);
                }
              }}
              className={classes.navigationItem}
            >
              <ExitToAppIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.rightPanel}>
        {(view === 0 && (
          <div className={classes.displayContent}>
            {" "}
            <MyFiles privateKey={privateKey} setPrivateKey={setPrivateKey} />
          </div>
        )) ||
          (view === 1 && (
            <div className={classes.displayContent}>
              {" "}
              <Dashboard />
            </div>
          )) ||
          (view === 2 && (
            <div className={classes.displayContent}>
              <SharedFiles
                privateKey={privateKey}
                setPrivateKey={setPrivateKey}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
