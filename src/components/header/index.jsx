import React from "react";
import { Grid } from "@material-ui/core";
const Header = () => {
  return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <center>
          <br />
          <img src="https://raw.githubusercontent.com/MLH-Fellowship/CryptoDrive/staging/docs/assets/cd.png?token=AMYAVDGLQBOZ4HMS5SC4PC3APBWQ4" height="150px" width="150px" alt="logo" />
          <h1>CryptoDrive</h1>
        </center>
      </Grid>
    </Grid>
  );
};
export default Header;
