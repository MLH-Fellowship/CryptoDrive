import React from "react";
import Validator from "./../../utility/validator";
import { Redirect } from "react-router-dom";
import * as ROUTES from "./../../constants/routes";
import { Button } from "@material-ui/core";

const Logout = () => {
  const [logout,setLogout] = React.useState(false)
  const handler=()=>{
      localStorage.removeItem('public_hash');
      localStorage.removeItem('user_name');
      if(!Validator('publicHash') && !Validator('username')){
          setLogout(true)
      }
  }
  
  if(logout)
  {
      return <Redirect to={ROUTES.SIGN_IN}/>
  }
  return (
    <>
      <h2>Are you sure want to Logout?</h2>
      <br/>
      <Button onClick={handler} variant="contained" color="secondary">
          Logout from &nbsp; <b> {Validator("username")}</b>
      </Button>
    </>
  );
};
export default Logout;
