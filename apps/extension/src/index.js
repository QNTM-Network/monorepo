import { createRoot } from "react-dom/client";
import { App } from "./popup/popup";
import { PageProvider , ToggleProvider} from "./contexts/pageContext";
import { ProviderProvider } from "./contexts/providerContext";

const app = document.getElementById("app");
const root = createRoot(app);
root.render(
  <ProviderProvider>
  <ToggleProvider>
  <PageProvider>
    <App />
  </PageProvider>
  </ToggleProvider>
    </ProviderProvider>
);
