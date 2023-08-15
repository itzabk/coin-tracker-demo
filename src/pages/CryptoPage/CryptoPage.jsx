import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api/api";
import axios from "axios";
import { createUseStyles } from "react-jss";
import { useCurrency } from "../../context/selectContext";
import addCommas from "../../config/addCommas";
import { LinearProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import CoinChart from "../../components/CoinChart/CoinChart";

const styles = createUseStyles({
  sidebar: {
    display: "flex",
    width: "30%",
    borderRight: "1px solid violet",
    paddingLeft: "1.2rem",
    paddingRight: "1.2rem",
    paddingBottom: "1.2rem",
    borderBottom: "1px solid violet",
    margin: "0,0.5rem",
    "@media only screen and (max-width: 600px)": {
      padding: 0,
      borderRight: "none",
      borderBottom: "none",
      width: "100%",
      textAlign: "center",
      flexFlow: "column nowrap",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  head: {
    fontFamily: "Raleway",
    fontWeight: "bolder",
    fontSize: "1rem",
    color: "violet",
    padding: "0.4rem",
  },
  body: {
    fontFamily: "Raleway",
    fontWeight: "bold",
    fontSize: "0.9rem",
    color: "whitesmoke",
    textDecoration: "uppercase",
    padding: "0.4rem",
  },
  containersm: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "space-between",
  },
  chart: {
    display: "flex",
    width: "70%",
    "@media only screen and (max-width: 600px)": {
      width: "100%",
    },
  },
  main: {
    display: "flex",
    flexDirection: "row",
    "@media only screen and (max-width: 600px)": {
      flexDirection: "column",
    },
  },
});

const CryptoPage = () => {
  const classes = styles();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState([]);
  const { currency } = useCurrency();
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(SingleCoin(id), {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setCoin(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  console.log(coin);
  return (
    <main className={classes.main}>
      <section className={classes.sidebar}>
        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <div>
            <Link to={coin?.links?.homepage[0]}>
              <img
                src={coin?.image?.large}
                alt={coin.name}
                style={{ width: "8rem", height: "8rem", padding: "0.5rem" }}
              />
            </Link>
            <Typography variant="h4">{coin.name}</Typography>
            <br />
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", padding: "0.6rem" }}
            >
              {parse(`${coin?.description?.en.split(". ")[0]}.`)}
            </Typography>
            <br />
            <div className={classes.containersm}>
              <span>
                <Typography variant="h6" className={classes.head}>
                  Market Cap Rank:
                </Typography>
                <Typography className={classes.body}>
                  {coin.market_cap_rank}
                </Typography>
              </span>
              <span>
                <Typography variant="h6" className={classes.head}>
                  Liquidity Score:
                </Typography>
                <Typography className={classes.body}>
                  {" "}
                  {coin.liquidity_score}
                </Typography>
              </span>
              <span>
                <Typography variant="h6" className={classes.head}>
                  Market Cap Total:
                </Typography>
                <Typography className={classes.body}>
                  {currency.symbol}
                  {addCommas(
                    String(coin?.market_data?.market_cap[currency.type])
                  )}
                </Typography>
              </span>
            </div>
          </div>
        )}
      </section>
      <section className={classes.chart}>
        <CoinChart id={id} />
      </section>
    </main>
  );
};

export default CryptoPage;
