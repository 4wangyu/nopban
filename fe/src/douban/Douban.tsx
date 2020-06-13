import React from 'react';
import './douban.scss';
import { AuthContext } from '../store/AuthProvider';

const Douban = () => {
  const { context } = React.useContext(AuthContext);

  return (
    <div>
      <iframe
        id="douban"
        className="douban"
        src={context?.iframeUrl}
        sandbox="allow-scripts allow-same-origin allow-popups"
        title="Douban"
      ></iframe>
    </div>
  );
};

export default Douban;
