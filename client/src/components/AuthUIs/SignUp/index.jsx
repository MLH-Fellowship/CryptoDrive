import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
const Login = () => {
  const [username, setUsername] = React.useState("");
  const [pubKey, setPubKey] = React.useState("asd");
  const [privateKey, setPrivate] = React.useState("asds");

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={3} lg={3}>
        <br />
        <b>
          You will be recieving a Private Key, which you need to keep it safe,
          in order to access the files.
        </b>
        <br />
        <br />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7}>
        <TextField
          fullWidth
          label="Enter A Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      
      </Grid><Grid item xs={12} sm={12} md={2} lg={2}><br/>
   <Button variant="outlined" style={{backgroundColor:'#2B3B4E', color:'#F4A200'}}>
     Sign Up
   </Button>
      
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {pubKey && (
          <h3>
            Public Key
            <br />
            <TextField
              fullWidth
            
              value={pubKey}
              InputProps={{
                readOnly: true,
              }}
            >
              {" "}
              <span style={{ color: "red" }}>{pubKey}</span>
            </TextField>
           
          </h3>
        )}{" "}
        <br />
        <br />
        {privateKey && (
          <h3>
            Private Key
            <br />
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              value={privateKey}
            >
              <span style={{ color: "red" }}>{privateKey}</span>
            </TextField>
          </h3>
        )}
      </Grid>
    </Grid>
  );
};
export default Login;
