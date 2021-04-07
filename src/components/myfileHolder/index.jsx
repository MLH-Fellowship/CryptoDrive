/**
 * MyFileHolder component.
 * Used to display the files in MyFiles and SharedFiles component.
 * Props are : Name, Sender(only for shared files ), FileHash
 */

import React from "react";
import { makeStyles, TextField, Grid } from "@material-ui/core";

const useStyles = (theme) =>
  makeStyles({
    input: {
      color: "white",
    },
  });

const MyFile = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={5} sm={5} md={5} lg={5}>
          <span style={{ color: "#ECEDED" }}>{props.name}</span>
        </Grid>
        {props.sender && ( <Grid item xs={2} sm={2} md={2} lg={2}>
         
            <span style={{ color: "#ECEDED" }}>{props.sender}</span>
        
        </Grid>  )}
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
          <span style={{ color: "#ECEDED",opacity:'0.4' }}>{props.hash}</span>
        </Grid>
      </Grid>
      <br />
    </>
  );
};

export default MyFile;
