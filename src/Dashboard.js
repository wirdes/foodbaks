import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Mert Erim using material-ui "}
      <Link color="inherit" href="#"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


function Dashboard(props) {
  const classes = useStyles();

  const [resturant, setresturant] = useState([]);
  const user = getUser();
  async function fetchData() {
    const { data } = await axios.get(
      `http://localhost:5000/api/resturant/findRestaurant?id=${user.id}`
    );
    setresturant(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {resturant.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.picture}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography gutterBottom variant="h7">
                      Adres:
                    </Typography>
                    {card.address}
                  </CardContent>
                  <CardActions>
                  <Typography gutterBottom variant="h7" component="h3">
                      {card.phone}
                    </Typography>
                    <Button size="small" color="primary">
                      DÜZENLE
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <input type="button" onClick={handleLogout} value="Logout" />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          FOODBAKS
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>

  );
}

export default Dashboard;
