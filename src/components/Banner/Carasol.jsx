import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api/api";
import { useCurrency } from "../../context/selectContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import AliceCarousel from "react-alice-carousel";
import numberWithCommas from "../../config/addCommas";

const styles = createUseStyles({
  link: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "monospace",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "violet",
  },
  carasoul: {
    marginTop: "1rem",
    minHeight: "40%",
    marginBottom: "1rem",
  },
  name: {
    fontSize: "1.4rem",
    fontWeight: "bolder",
    color: "whitesmoke",
    fontFamily: "Raleway",
  },
  price: {
    fontSize: "1.1rem",
  },
  profit: {
    fontSize: "1rem",
    fontWeight: "bolder",
  },
});

const Carasol = () => {
  const { currency } = useCurrency();
  const [trending, setTrending] = useState([]);
  const classes = styles();

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(TrendingCoins(currency.type), {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        const result = data.map((ele) => (
          <div>
            <Link to={`/crypto/${ele.id}`} className={classes.link}>
              <img alt={ele.id} src={ele.image} height={80} width={80} />
              <br />
              <div className={classes.name}>
                <b>{ele.id}</b>
              </div>
              <br />
              <div className={classes.price}>
                {currency.symbol}
                {numberWithCommas(ele.current_price)}
              </div>
              <div
                className={classes.profit}
                style={
                  ele.price_change_percentage_24h >= 0
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {ele.price_change_percentage_24h >= 0
                  ? `+${ele.price_change_percentage_24h}%`
                  : `${ele.price_change_percentage_24h}%`}
              </div>
            </Link>
          </div>
        ));
        setTrending(result);
        console.log("Rendered Carasol");
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    console.log("Rendered Carasol Currency");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  console.log("Rendered Carasol Component");

  const responsive = {
    0: {
      items: 2,
    },
    720: {
      items: 4,
    },
  };
  return (
    <div className={classes.carasoul}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1100}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={trending}
        autoPlay
      />
    </div>
  );
};

export default Carasol;
