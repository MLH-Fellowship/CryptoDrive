import React from 'react'
import { Grid} from '@material-ui/core'
const Info = () =>{
return (
    <Grid container alignContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
  <h3>How It Works</h3>  
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} textAlign="center">
  <li>You Upload your file to our Blockchain based IPFS Server.</li>
<li>We give you a set of key</li>
      </Grid>
    </Grid>


)
}
export default Info