import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
const FetchComic = lazy(() => import("./fetchComic.js"));

import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchComic: false
    };
  }
  _fetchComic() {
    this.setState({
      fetchComic: true
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <button className="button" onClick={() => this._fetchComic()}>
            Fetch Comic
          </button>
        </div>
        {this.state.fetchComic ? (
          <Suspense fallback={<div className="spinner" />}>
            <FetchComic key={Date.now()} />
          </Suspense>
        ) : null}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
