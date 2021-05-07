import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import alertify from "alertifyjs";
import Button from '@material-ui/core/Button';
import "alertifyjs/build/css/alertify.css";
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Mert Erim using material-ui "}
      <Link color="inherit" href="#"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  const errorMessage = (message) => {
    alertify.error(message);
  };

  const handleLogin = () => {
    if (email.length <= 0 || password.length <= 0) {
      errorMessage("Alanlar boş bırakılamaz.");
      return;
    }
    if (password.length < 6) {
      errorMessage("Şifreniz 6 karakterden küçük olamaz.");
      return;
    }

    setLoading(true);
    axios
      .post("http://localhost:5000/api/admin/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.access_token, response.data.data);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        errorMessage("Email yada şifreniz yanlış");
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Adresi"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            {loading ? 'Yükleniyor...' : 'Giriş Yap'}
          </Button>
  
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );

}

export default Login;
