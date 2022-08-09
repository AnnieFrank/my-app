
import axios from "axios";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  const [countryCode, setCountryCode] = useState("");
  const [exchangeRateInfo, setExchangeRateInfo] = useState<undefined | any>(undefined);
  const EXCHANGE_RATE_BASE_API_URL = "https://open.er-api.com/v6";
  return (
    <div>
      <div className="search-field">
        <h1>Exchange Rate Search</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="search-bar"
            className="text"
            value={countryCode}
            onChange={(prop) => {
              setCountryCode(prop.target.value);
            }}
            label="Enter a Country Code..."
            variant="outlined"
            placeholder="Search... e.g. GBP, NZD, INR, AUD"
            size="medium"
          />
          <Button
            onClick={() => {
              search();
            }}
          >
            <SearchIcon style={{ fill: "blue" }} />
            Search
          </Button>
        </div>
      </div>

      {exchangeRateInfo === undefined ? (
        <div></div>
      ) : (
        <div
          id="exchangeRate-result"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "100px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: getBackColor(exchangeRateInfo) }}>
            <Grid
              container
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >
              <Grid item>
                <Box>
                  {exchangeRateInfo === undefined || exchangeRateInfo === null || exchangeRateInfo.result == "error" ? (
                    <h1> Entered Country Code is invalid! </h1>
                  ) : (
                    <div>
                      <h1>
                        {exchangeRateInfo.base_code}
                      </h1>
                      <p>
                        <b>Provider:</b> {exchangeRateInfo.provider}
                        <br />
                        <br />
                        <b>Last Updated:</b> {exchangeRateInfo.time_last_update_utc}
                        <br />
                        <br />
                      <h2>
                        Rates
                      </h2>
                        <b>USD:</b> ${exchangeRateInfo.rates.USD}
                        <br/>
                        <b>INR:</b> ${exchangeRateInfo.rates.INR}
                        <br/>
                        <b>NZD:</b> ${exchangeRateInfo.rates.NZD}
                        <br/>
                        <b>AUD:</b> ${exchangeRateInfo.rates.AUD}
                        <br/>
                        <b>GBP:</b> ${exchangeRateInfo.rates.GBP}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </div>
  );

  // Credit to codingsparkles for providing the color mapping
  function getBackColor(poke: any | undefined | null) {
    
    return "#A8DADC";
  }

  function search() {
    console.log(countryCode);
    if (countryCode === undefined || countryCode === "") {
      return;
    }

    axios
      .get(EXCHANGE_RATE_BASE_API_URL + "/latest/" + countryCode?.toLowerCase())
      .then((res) => {
        setExchangeRateInfo(res.data);
      })
      .catch(() => {
        setExchangeRateInfo(null);
      });
  }
}

export default App;