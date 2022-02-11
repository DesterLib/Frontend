import React from 'react';
import "./style.css";

const ServerError = ({ error, errorType }) => {

  if(errorType === "globalError") {
    return (
      <div className="error-container"><h3>Can't Connect to the backend. [503 - Service Unavailable]</h3><br/><h3><span  style={{marginTop: '20px'}}>(╯`□´）╯︵ ┻━┻</span></h3></div>
    );
  };

  if(errorType === "dataError") {
    return (
      <div className="error-container"><h3>Can't find items. [404 - Nothing Here !]</h3><br/><h3><span style={{marginTop: '20px'}}>╮( ꒪౪꒪)╭</span></h3></div>
    );
  };

};

export default ServerError;
