import React from "react";
import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Container,
  Typography,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useCurrency } from "../../context/selectContext";
import { currencyList } from "./currencyList";
import { useNavigate } from "react-router-dom";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();
  const handleSelection = (e) => {
    const result = currencyList.filter(
      (ele) => ele.type.toLowerCase() === e.target.value
    );
    setCurrency({ type: e.target.value, symbol: result[0].symbol });
  };
  return (
    <ThemeProvider theme={darkTheme}>
      {" "}
      <AppBar
        position="static"
        color="transparent"
        sx={{
          backgroundImage:
            "linear-gradient(to right, rgba(108, 17, 124, 0.838), rgb(26, 1, 28))",
        }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{
                flex: 1,
                fontWeight: "bolder",
                fontFamily: "Raleway",
                color: "violet",
                cursor: "pointer",
              }}
              onClick={() => navigate("/", { replace: true })}
            >
              ABK Coin Tracker
            </Typography>
            <FormControl sx={{ ml: "auto", minWidth: "80px" }} size="small">
              <InputLabel id="demo-select-small-label">Type</InputLabel>
              <Select
                value={currency.type}
                labelId="demo-select-small-label"
                variant="outlined"
                label="Type"
                autoWidth={true}
                onChange={handleSelection}
                sx={{ color: "violet" }}
              >
                {currencyList.map((ele) => (
                  <MenuItem value={ele.type.toLowerCase()} key={ele.id}>
                    {ele.type.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
