import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Auth0Provider
    audience={process.env.REACT_APP_AUDIENCE}
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_clientID}
    authorizationParams={{
      redirect_uri: process.env.REACT_APP_redirectURI,
    }}
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>
)
