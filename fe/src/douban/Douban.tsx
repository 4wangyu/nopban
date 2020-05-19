import React from "react";
import "./douban.scss";
import { AppContext } from "../App";

const Douban = () => {
  const { context } = React.useContext(AppContext);

  return (
    <div>
      <iframe
        id="douban"
        className="douban"
        src={context.iframeUrl}
        sandbox="allow-scripts allow-same-origin allow-popups"
        title="Douban"
      ></iframe>
    </div>
  );
};

export default Douban;
