import React, { useEffect, useState } from "react";
import { CoinList } from "../../config/api/api";
import { Link } from "react-router-dom";
import axios from "axios";
import addCommas from "../../config/addCommas";
import {
  Typography,
  Container,
  Paper,
  TextField,
  Pagination,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import { createUseStyles } from "react-jss";
import { useCurrency } from "../../context/selectContext";

const styles = createUseStyles({
  cell: {
    fontSize: "1rem",
    color: "whitesmoke",
    fontWeight: "bold",
    fontFamily: "Raleway",
  },
  greencell: {
    fontSize: "1rem",
    color: "green",
    fontWeight: "bold",
    fontFamily: "Raleway",
  },
  redcell: {
    fontSize: "1rem",
    color: "red",
    fontWeight: "bold",
    fontFamily: "Raleway",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
});

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency } = useCurrency();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(Number(1));
  const classes = styles();

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency.type), {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        setCoins(data);
        setLoading(false);
        console.log("Rendered Table");
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
    console.log("Rendered Table Currency");
  }, [currency]);

  console.log("Rendered Table Component");

  return (
    <section>
      <Container
        sx={{ display: "flex", flexFlow: "column nowrap", gap: "0.5rem" }}
      >
        <Typography
          variant="h5"
          textAlign={"left"}
          sx={{
            fontWeight: "200",
            fontFamily: "monospace",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Crypto Currency with MarketCap
        </Typography>

        <TextField
          label="Search"
          variant="filled"
          color="success"
          focused
          sx={{
            width: "100%",
            fontWeight: "700",
            fontFamily: "monospace",
            backgroundColor: "darkgrey",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {loading ? (
          <LinearProgress color="secondary" />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              backgroundImage:
                "linear-gradient(to right, rgba(108, 17, 124, 0.838), rgb(26, 1, 28))",
            }}
          >
            <Table
              sx={{ minWidth: 650, borderRadius: "1rem" }}
              aria-label="crypto cooins"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={classes.cell}>
                    Crypto-Symbol
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    Name
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    24hrs Change
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    Market Cap
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  textAlign: "center",
                }}
              >
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => (
                    <TableRow
                      key={coin.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.cell}
                        align="center"
                      >
                        <Link to={`/crypto/${coin.id}`}>
                          <img
                            src={coin.image}
                            alt={coin.name}
                            width={"40px"}
                            height={"40px"}
                            style={{ marginLeft: "0.3rem" }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {coin.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={
                          coin.price_change_percentage_24h >= 0
                            ? classes.greencell
                            : classes.redcell
                        }
                      >
                        {coin.price_change_percentage_24h >= 0
                          ? `+${coin.price_change_percentage_24h}%`
                          : `${coin.price_change_percentage_24h}%`}
                      </TableCell>
                      <TableCell align="center" className={classes.cell}>
                        {currency.symbol}
                        {addCommas(coin.market_cap)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <Pagination
              count={Number((handleSearch()?.length / 10).toFixed(0))}
              classes={{ ul: classes.pagination }}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                color: "white",
                fontWeight: "bolder",
              }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }}
              color="secondary"
            />
          </TableContainer>
        )}
      </Container>
    </section>
  );
};

export default CryptoTable;
