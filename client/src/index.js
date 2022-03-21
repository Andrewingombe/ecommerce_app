import { render } from "react-dom";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  document.getElementById("root")
);
