import React from "react";
import "./douban.css";

const Douban = () => {
  return (
    <div>
      <iframe
        id="douban"
        className="douban"
        src="https://movie.douban.com"
        sandbox="allow-scripts allow-same-origin allow-popups"
        title="Douban"
      ></iframe>
    </div>
  );
};

export default Douban;
