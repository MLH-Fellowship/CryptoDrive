import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const Login = () => {
  const [username, setUsername] = React.useState("");
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={10} md={6} lg={6} style={{ paddingLeft: "20em" }}>
        <br />
        <b>Please Provide a username to Continue</b>
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5}>
        <TextField
          fullWidth
          label="Enter A Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Login;
