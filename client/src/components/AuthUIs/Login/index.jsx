import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const Login = (props) => {

  const [username, setUsername] = React.useState("");
  return (
    <Grid container spacing={4}>
      
      <Grid item xs={12} sm={10} md={6} lg={6} style={{ paddingLeft: "20em" }}>
        <br />
        <b>Please enter your user id</b>
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TextField
          fullWidth
          label="Enter your user id"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
          <center>{props.message && <span style={{color:'red'}}>{props.message}</span>}</center><br/><br/>
          </Grid>
    </Grid>
  );
};

export default Login;
