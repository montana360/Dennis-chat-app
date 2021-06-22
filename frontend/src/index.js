import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'

const domain = "dev-qk55fqpm.us.auth0.com";
const clientID = "cofTuqUf8r2PYtjNjdxo3rc1N4Q6nTOc";

ReactDOM.render(
  <Auth0Provider domain={domain} clientId={clientID} redirectUri={window.location.origin}>
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);


