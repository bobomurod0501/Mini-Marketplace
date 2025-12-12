import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { App } from "./App";


const rootEL = document.getElementById("cart-root")
if(rootEL){
  createRoot(rootEL).render(<App />);
}
