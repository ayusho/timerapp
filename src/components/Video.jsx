import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    minHeight: 200,
  },
  bullet: {
    display: "inline",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Video(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.data.title}
        </Typography>
        {props.data.questions.map((question) => (
          <Typography key={question} variant="body2" component="p">{question}</Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button onClick={() => {props.onWatchClick(props.data)}}size="small" variant="outlined" color="secondary">Watch</Button>
      </CardActions>
    </Card>
  );
}
