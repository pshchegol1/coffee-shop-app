import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartProvider";
import { ToastProvider } from "./context/ToastProvider";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Missing <div id="root"> in index.html');

ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    {/* Opt in to v7 behavior now: silences the v6 deprecation warnings and eases the v7 upgrade. */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <CartProvider>
        {/* Inside the router: toasts can contain links. */}
        <ToastProvider>
          <App />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
