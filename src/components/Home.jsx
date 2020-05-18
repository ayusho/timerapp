import React, { useState } from "react";
import Video from "../components/Video";
import data from "../data/data";
import axios from "axios";
import download from "downloadjs";
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },

};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 10,
    };
  }

  componentDidMount() {}

  onWatchClick = (questions) => {
    this.setState((prevState) => ({
      count: 10,
    }));
    clearInterval(this.myInterval);
    this.myInterval = setInterval(() => {
      this.setState(
        (prevState) => ({
          count: prevState.count - 1,
        }),
        async () => {
          if (this.state.count == 0) {
            console.log("calling backend api");
            clearInterval(this.myInterval);
            console.log(questions);
            let res = await fetch(`http://localhost:8082/convert`, {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(questions),
            });
            const blob = await res.blob();
            download(blob, "questions.pdf");
            // download(res.data);
            // console.log(res);
          }
        }
      );
    }, 1000);
  };
  render() {
    const { count } = this.state;
    return (
      <div className="Home">
        <Grid container className={styles.root} spacing={2}>
          {data.map((video) => (
            <Grid item xs={3}>
              <Video data={video} onWatchClick={this.onWatchClick} />
            </Grid>
          ))}
        </Grid>
        <h1 className="timer">Time left: {count}</h1>
      </div>
    );
  }
}

export default Home;
