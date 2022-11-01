import { createRoot } from "react-dom/client";
import  App  from "../pages/index";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
    <App />
);
