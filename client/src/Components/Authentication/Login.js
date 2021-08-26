import {
  Button,
  FormHelperText,
  Select,
  InputLabel,
  MenuItem,
  Slide,
  TextField,
  FormControl,
} from "@material-ui/core";
import React, { useState } from "react";
import { ReactComponent as Svg } from "../../assets/login_logo.svg";
import "./Login.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import PhoneIcon from "@material-ui/icons/Phone";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BASE_URL from "../../baseURL";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import PaymentIcon from "@material-ui/icons/Payment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getTime } from "date-fns/esm";
import { setMonth, setYear } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    margin: "4px",
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  pan: "",
  dob: {
    day: "1",
    month: "1",
    year: "2014",
  },
};

const Login = ({ setCreds }) => {
  const classes = useStyles();
  const transitionDuration = 500;
  const handleClick = (e) => {
    e.preventDefault();
    setElementIn(false);
    setTimeout(() => {
      setElementIn(true);
      if (active === "login") setActive("register");
      else setActive("login");
    }, transitionDuration);
    setValues(initialValues);
    setMessage("");
  };
  const [message, setMessage] = useState("");
  const [values, setValues] = useState(initialValues);
  const [elementIn, setElementIn] = useState(true);
  const [active, setActive] = useState("login");
  const types = ["MERCHANT", "BUYER"];
  const [selectedType, setSelectedType] = useState(types[0]);
  const handleTypeChange = (e) => {
    e.preventDefault();
    setSelectedType(e.target.value);
  };

  const [startDate, setStartDate] = useState(new Date());
  const handledobChange = (date) => {
    const dob = date;
    //  setDay(dob.getDate());
    //  setMonth(dob.getMonth());
    //  setYear(dob.getFullYear());
    const d = dob.getDate(),
      m = dob.getMonth(),
      y = dob.getFullYear();
    setStartDate(date);
    setValues({ ...values, dob: { day: d, month: m, year: y } });
    //  console.log(typeof(date[0]),startDate.getDate());
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function RegisterUser() {
    console.log(`values`, values);
    let URL;
    URL =
      selectedType === "MERCHANT"
        ? BASE_URL + "merchants/"
        : BASE_URL + "buyers/";
    console.log(`URL`, URL);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({user:{firstName:`${values.firstName}`,
      //                     lastName:`${values.lastName}`,
      //                     email:`${values.email}`,
      //                     password:`${values.password}`,
      //                     mobileNo:`${values.phone}`,
      //                     accountType:`${selectedType.toLowerCase()}`
      //                  }})
      body: JSON.stringify({
        fusionUser: {
          ifiID: "140793",
          spoolID: "3deb5a70-311c-11ea-978f-2e728ce88125",
          individualType: "RAH",
          firstName: `${values.firstName}`,
          lastName: `${values.lastName}`,
          dob: {
            day: `${values.dob.day}`,
            month: `${values.dob.month}`,
            year: `${values.dob.year}`,
          },
          kycDetails: {
            kycStatus: "MINIMAL",
            kycStatusPostExpiry: "KYC_EXPIRED",
            kycAttributes: {},
            authData: {
              PAN: `${values.pan}`,
            },
            authType: "PAN",
          },
          vectors: [
            {
              type: "e",
              value: `${values.email}`,
              isVerified: true,
            },
          ],
        },
        user: {
          firstName: `${values.firstName}`,
          email: `${values.email}`,
          password: `${values.password}`,
          accountType: `${selectedType.toLowerCase()}`,
        },
      }),
    };
    console.log(
      `requestOptions.body`,
      requestOptions.body,
      typeof requestOptions.body
    );
    fetch(`${URL}`, requestOptions)
      .then((response) => {
        console.log(`response`, response);
        if (response.status === 200) {
          // console.log(`response`, response)
          setMessage("Registered!!, Please Login");
        } else {
          setMessage("Error in Registering");
        }
      })
      .catch((err) => console.log(`err`, err));
  }

  async function LoginUser() {
    let URL;
    URL =
      selectedType === "MERCHANT"
        ? BASE_URL + "merchants/signin"
        : BASE_URL + "buyers/signin";
    console.log(`URL`, URL);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `${values.email}`,
        password: `${values.password}`,
      }),
    };
    // const response = await fetch(`${apiURL}`);
    // const info = await response.json();
    console.log(`requestOptions.body`, requestOptions.body);
    fetch(`${URL}`, requestOptions)
      .then(async (response) => {
        const info = await response.json();

        if (response.status === 200) {
          // setMessage("Registered!!, Please Login")
          setCreds({
            id: selectedType === "MERCHANT" ? info.merchantID : info.buyerID,
            token: info.token,
            accountType: selectedType === "MERCHANT" ? "MERCHANT" : "BUYER",
          });
        } else {
          setMessage("Invalid Credentials");
        }
      })
      .catch((err) => console.log(`err`, err));

    await setValues(initialValues);
  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("in Reguster", values);
    RegisterUser();
    // setValues(initialValues);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("in login", values);
    LoginUser();
    // setValues(initialValues);
  };
  return (
    <div
      style={{
        display: "flex",
        height: "95vh",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div>
        <h1>DIMENSIONS</h1>
        <Svg style={{ height: "50%", transform: "scale(0.5)" }} />
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "#6C63FF",
          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Slide in={elementIn} timeout={transitionDuration} direction="left">
          <div>
            {active === "login" && (
              <div>
                <div className="auth-header">LOGIN</div>
                <Paper component="form" className={classes.root}>
                  <AlternateEmailIcon />
                  <TextField
                    label="Email"
                    className={classes.input}
                    placeholder="Email"
                    name="email"
                    fullWidth
                    required
                    value={values.email}
                    onChange={handleInputChange}
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <VpnKeyIcon />

                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    className={classes.input}
                    fullWidth
                    placeholder="Password"
                    requiredvalue={values.password}
                    onChange={handleInputChange}
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <TextField
                    select
                    label="Account Type"
                    name="accountType"
                    value={selectedType}
                    onChange={handleTypeChange}
                    fullWidth
                    required
                    helperText="Select account that suits you"
                  >
                    {types.map((e) => {
                      return (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Paper>
                <div style={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogin}
                  >
                    Submit
                  </Button>
                  <Button onClick={handleClick}>
                    {active === "login" ? "REGISTER" : "LOGIN"}
                  </Button>
                </div>
              </div>
            )}
            {active === "register" && (
              <div>
                <div className="auth-header">REGISTER</div>
                <Paper component="form" className={classes.root}>
                  <PersonIcon />
                  <TextField
                    label="First Name"
                    name="firstName"
                    className={classes.input}
                    placeholder="first Name"
                    required
                    value={values.firstName}
                    onChange={handleInputChange}
                  />
                  <hr />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    className={classes.input}
                    placeholder="lastname"
                    value={values.lastName}
                    onChange={handleInputChange}
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <AlternateEmailIcon />
                  <TextField
                    label="Email"
                    className={classes.input}
                    name="email"
                    placeholder="Email"
                    fullWidth
                    required
                    value={values.email}
                    onChange={handleInputChange}
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <VpnKeyIcon />
                  <TextField
                    label="Password"
                    type="password"
                    name="password"
                    className={classes.input}
                    placeholder="Password"
                    fullWidth
                    required
                    value={values.password}
                    onChange={handleInputChange}
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <TextField
                    select
                    label="Account Type"
                    value={selectedType}
                    name="accountType"
                    onChange={handleTypeChange}
                    fullWidth
                    helperText="Select account that suits you"
                    required
                  >
                    {types.map((e) => {
                      return (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Paper>
                <Paper component="form" className={classes.root}>
                  DOB
                  <CalendarTodayIcon />
                  <DatePicker
                    selected={startDate}
                    onChange={handledobChange}
                    showYearDropdown
                  />
                </Paper>
                <Paper component="form" className={classes.root}>
                  <PaymentIcon />
                  <TextField
                    label="PAN"
                    name="pan"
                    className={classes.input}
                    placeholder="ABCDE4563A"
                    fullWidth
                    value={values.pan}
                    onChange={handleInputChange}
                  />
                </Paper>

                <Paper component="form" className={classes.root}>
                  <PhoneIcon />
                  <TextField
                    label="Phone"
                    name="phone"
                    className={classes.input}
                    placeholder="Phone"
                    fullWidth
                    value={values.phone}
                    onChange={handleInputChange}
                  />
                </Paper>
                <div style={{ display: "flex" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={handleRegister}
                  >
                    Submit
                  </Button>
                  <Button onClick={handleClick}>
                    {active === "login" ? "REGISTER" : "LOGIN"}
                  </Button>
                </div>
                <div style={{ backgroundColor: "greenyellow" }}>{message}</div>
              </div>
            )}
          </div>
        </Slide>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
export default Login;
