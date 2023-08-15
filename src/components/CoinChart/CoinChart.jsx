import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../../config/api/api";
import { useCurrency } from "../../context/selectContext";
import axios from "axios";
import { chartDays } from "../../config/data";
import { CircularProgress, Button } from "@mui/material";
import {
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Chart,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { createUseStyles } from "react-jss";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const styles = createUseStyles({
  chart: {
    padding: "2rem",
    minWidth: "90%",
    minHeight: "80%",
  },
});

const CoinChart = ({ id }) => {
  const { currency } = useCurrency();
  const [historicData, setHistoricData] = useState();
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(1);
  const classes = styles();
  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get(
          HistoricalChart(id, days, currency.type)
        );
        setHistoricData(data.prices);
        setFlag(true);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, [currency, days, id]);

  return (
    <section className={classes.chart}>
      {!flag ? (
        <CircularProgress color="secondary" />
      ) : (
        <Line
          data={{
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: historicData.map((coin) => coin[1]),
                label: `Price Momentum (${currency.symbol})`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            responsive: true,
            elements: {
              point: {
                radius: 1,
              },
            },
            title: {
              display: true,
              text: "Price Momentum",
            },
          }}
        />
      )}
      <br />
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "space-between",
          gap: "0.6rem",
        }}
      >
        {chartDays.map((ele) => (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            role="button"
            onClick={() => setDays(ele.value)}
          >
            {ele.label}
          </Button>
        ))}
      </span>
    </section>
  );
};

export default CoinChart;
