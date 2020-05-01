import React, { Component } from "react";
import "./douban.css";

class Douban extends Component {
  render() {
    return (
      <div>
        <iframe
          id="douban"
          className="douban"
          src="http://movie.douban.com"
          sandbox="allow-scripts allow-same-origin allow-popups"
          title="Douban"
        ></iframe>
      </div>
    );
  }
}

export default Douban;
