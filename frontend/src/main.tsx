import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ReactGA from "react-ga4";

ReactGA.initialize("G-JTB7SV3YEY");
// Send initial pageview
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById("root")!).render(<App />);
