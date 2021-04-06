import React from "react";
import { makeStyles, TextField,Grid } from "@material-ui/core";


const useStyles = theme => makeStyles({
  input: {
      color: 'white',

  }
});

const MyFile = (props) => {
  const classes = useStyles();
  return (<>
  <Grid container>
   
    <Grid item xs={5} sm={5} md={5} lg={5}>
    <span style={{color:"#ECEDED"}}>
        {props.name}
    </span>
    </Grid>
    <Grid item xs={5} sm={5} md={5} lg={5}>
    {/* <TextField
    fullWidth
      style={{color:"#ECEDED"}}
      variant="outlined"
        value={}
        InputProps={{
          readOnly: true,
          style:{color:"#ECEDED",
          background:"transparent",
         
           "&:focus":
           {background:"#6163FF"}}
        }}
      /> */}
     { props.hash}
    </Grid>
    <Grid item xs={5} sm={5} md={5} lg={5}>
    { props.sender &&(
      <span style={{color:"#ECEDED" }}>
        {props.sender}
      </span>)}
    </Grid>
  </Grid>
    <div
      style={{
        height: "55px",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      
      <br />   
    </div><br/></>
  );
};

export default MyFile;
