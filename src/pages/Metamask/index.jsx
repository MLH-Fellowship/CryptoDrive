import React from "react";
import { Grid } from "@material-ui/core";

const Mtmsk = () => {
  return (
    <div style={{ margin: "25px", display: "flex", justifyContent: "center" }}>
      <div>
        <center>
          <h1>
            Please Install Metamask Extension, in order to proceed with
            Cryptodrive.
          </h1>
          <br />
          Dont worry we will help you out if you are just getting started.
          <br /> <br />
          <br />
          <b>
            {" "}
            Click on the metamask icon (orange fox) below to install metamask
            extension.
          </b>
          <br /> <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://metamask.io/download.html"
          >
            <img
              src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
              height="150"
              width="150"
              alt="MetamaskIcon"
            />
          </a>
          <br />
          <br /> <br />
        </center>
        <h3>Step 1: Make an Account on Metamask Extension</h3>
        <h3>
          Step 2: Copy your Account Address It looks like this:{" "}
          <code>ox0C0D.....60A</code>
        </h3>
        <h3>
          Step 3: You do need some ethers, to start Cryptodrive, lets have
          faucet ethers from Rinkeby Testnet
        </h3>
        <h3>Step 4: You need tweet your address, dont worry its safe. </h3>
        <h3>
          Step 5: You need paste that tweet link, here{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://faucet.rinkeby.io/"
          >
            https://faucet.rinkeby.io/
          </a>{" "}
        </h3>
        <h3>
          Step 6: Now you have your ethers, in Metamask, you can check on to
          extension
        </h3>
        <h3>
          Note: If you are not able see ethers, just click on Rinkeby Test
          Network, just above your Account Address, from the drop down menu.{" "}
        </h3>
        <br />
        <h2>
          Hurray!! You did it.
          <br />
          Head over to{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.cryptodrive.tech"
          >
            Cryptodrive.tech
          </a>{" "}
          and be the owner of your own data.
        </h2>
      </div>
    </div>
  );
};
export default Mtmsk;
