import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  header: {
    maxHeight: "10%",
  },
  section: {
    minHeight: "85vh",
  },
});
const Layout = () => {
  const classes = styles();
  return (
    <main>
      <header className={classes.header}>
        {" "}
        <Header />
      </header>
      <section className={classes.section}>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
