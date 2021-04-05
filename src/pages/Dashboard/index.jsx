import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MyFiles from "./myfiles";
import Dashboard from "./dashbaord";
import { Button } from "@material-ui/core";
import SaveFile from "../../components/save_file/index";
import * as ROUTES from "./../../constants/routes";
import { Redirect } from "react-router-dom";
import Logout from "./logout";
import SharedFiles from "./sharedfiles";
import { Switch, Route } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  function getPassHash() {
    const tokenString = localStorage.getItem("public_hash");
    const userToken = JSON.parse(tokenString);
    return userToken;
  }
  function getUsername() {
    const tokenString = localStorage.getItem("user_name");
    let userToken = null;

    if (tokenString) userToken = JSON.parse(tokenString);

    console.log(userToken);

    if (userToken) return userToken;
    else return false;
  }

  const token = getPassHash();
  const username = getUsername();
  if (token == null || username == null) {
    console.log(token);
    console.log(username);
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
  leftPanel: {
    width: "calc(100% - 80%)",
    paddingLeft: "30px",
    paddingTop: "20px",
    background: "#6163FF",
    color: "#ECEDED",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100%",
  },
  leftPanelHeading: {
    fontSize: "calc(100em - 98em)",
    paddingBottom: "5px",
    flexGrow: 1,
  },
  rightPanel: {
    marginLeft: "calc(100% - 80%)",
    padding: "20px",
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
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [view, setView] = React.useState(0);
  const [privateKey, setPrivateKey] = React.useState("");
  const [Component, setComponent] = React.useState(<Dashboard />);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const menuItems = ["My Files", "Upload", "Shared Files"];
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

  return (
    <div className={classes.root}>
      <div className={classes.leftPanel}>
        <b className={classes.leftPanelHeading}>Dashboard</b>

        <div className={classes.menu}>
          {menuItems.map((item, index) => (
            <div
              className={classes.navigationItem}
              onClick={() => {
                handleClick(index);
              }}
            >
              <b>{item.name}</b>
            </div>
          ))}
        </div>
        <div className={classes.menu}>
          <div className={classes.navigationItem}>Logout</div>
        </div>

        {/* <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="My Files" {...a11yProps(0)} />
        <Tab label="Upload" {...a11yProps(1)} />
        <Tab label="Shared Files" {...a11yProps(2)} />
        <Tab label="Logout" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <MyFiles privateKey={privateKey} setPrivateKey={setPrivateKey} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Dashboard  />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <SharedFiles privateKey={privateKey} setPrivateKey={setPrivateKey} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Logout />
      </TabPanel> */}
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
