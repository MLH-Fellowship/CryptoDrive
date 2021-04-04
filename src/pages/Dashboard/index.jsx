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
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [privateKey, setPrivateKey] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
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
      <TabPanel value={value} index={2}></TabPanel>
      <TabPanel value={value} index={3}>
        <Logout />
      </TabPanel>
    </div>
  );
}
