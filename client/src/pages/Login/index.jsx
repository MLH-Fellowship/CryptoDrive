import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
const Login = (props) => {
  const [username, setUsername] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");

  React.useEffect(() => {
    const json = JSON.stringify(publicKey);
    sessionStorage.setItem("token", json);
  }, [publicKey]);

  const buttonInlineStyle = {
    paddingTop: "3em",
  };

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

        <TextField
          fullWidth
          label="Enter public key"
          value={publicKey}
          onChange={(e) => {
            setPublicKey(e.target.value);
          }}
        />

        <div style={buttonInlineStyle}>
          <Button
            style={{
              borderRadius: 25,
              backgroundColor: "#2b3b4e",
              color: "white",
            }}
            href="/dashboard"
          >
            Enter
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
