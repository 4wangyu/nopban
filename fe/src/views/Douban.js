import React, { Component } from "react";
import "./douban.css";

class Douban extends Component {
  render() {
    return (
      <div>
        <iframe
          className="douban"
          src="http://movie.douban.com"
          sandbox=""
          title="Douban"
        ></iframe>
      </div>
    );
  }
}

export default Douban;
