import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react"
import './index.css';
import App from './App';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={client_id}
    redirectUri={window.location.origin}
    audience={"https://" + domain + "/api/v2/"}
    scope="read:current_user"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
