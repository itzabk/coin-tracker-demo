import { Container, Typography } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import Carasol from "./Carasol";

const styles = createUseStyles({
  container: {
    minHeight: "340px",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
   
  },
  head1: {
    textAlign: "center",
    color: "pink",
    fontFamily: "Raleway",
    fontWeight: "300",
    marginBottom: "0.3rem",
    opacity: "0.9",
  },
  sub1: {
    textAlign: "center",
    color: "pink",
    opacity: "0.5",
    fontWeight: "bold",
  },
  section: {
    backgroundImage: "url(./banner1.jpg)",
    backgroundSize: "auto auto",
    boxShadow: "22px 29px 81px 0px rgba(188,60,235,0.80)",
  },
});

const Banner = () => {
  const classes = styles();
  return (
    <section className={classes.section}>
      <Container className={classes.container}>
        <Typography variant="h3" className={classes.head1}>
          ABK Coin Tracker
        </Typography>
        <br />
        <Typography variant="subtitle2" className={classes.sub1}>
          <i>
            "Tracking Crypto Coins made easy peasy. Your only destination for
            all Crypto Coins!"
          </i>
        </Typography>
        <br />
        <Carasol />
      </Container>
    </section>
  );
};

export default Banner;
