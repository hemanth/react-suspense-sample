import axios from "axios";
import React from "react";

import {
  unstable_createResource,
  createResource as cSource
} from "react-cache";

const fetch = async (url = "https://xkcd-imgs.herokuapp.com/") => {
  try {
    return await axios.get(url);
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("Error: ", err.message);
    }
  }
};

let createResource;

if (unstable_createResource) {
  createResource = unstable_createResource;
} else {
  createResource = cSource;
}

const ImgResource = createResource(src => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
  });
});

const isBrowser = typeof window !== "undefined";

const Img = props => {
  if (isBrowser) {
    ImgResource.read(props.src);
  }

  return <img {...props} />;
};

export default class ComicFetcher extends React.Component {
  signal = axios.CancelToken.source();

  constructor() {
    super();
    this.state = { data: "" };
  }
  async componentDidMount() {
    const res = await fetch();
    this.setState({ ...res });
  }

  componentWillMount() {
    this.signal.cancel("fecth comic canceled");
  }

  render() {
    const { url, title } = this.state.data;
    if (url) {
      return <Img src={url} alt={title} />;
    }
    return null;
  }
}
