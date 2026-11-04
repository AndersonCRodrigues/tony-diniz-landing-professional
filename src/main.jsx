import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Créditos discretos para desenvolvedores que inspecionarem o site em produção.
if (import.meta.env.PROD) {
  console.info(
    "%cTONY DINIZ — SITE OFICIAL%c\nDesenvolvimento: Anderson Costa Rodrigues\nGitHub: https://github.com/AndersonCRodrigues\nLinkedIn: https://www.linkedin.com/in/anderson-costa-rodrigues/",
    "color: #f68b2a; font-size: 16px; font-weight: 800;",
    "color: #94a3b8; font-size: 12px; line-height: 1.75;"
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
