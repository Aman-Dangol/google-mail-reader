import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "@src/router/main-router.tsx";
import { CookiesProvider } from "react-cookie";
import { getCurrentTheme } from "@src/utils/theme/theme";
import { NavProvider } from "@src/utils/context/nav-context";
const qc = new QueryClient();

const savedTheme = getCurrentTheme();

document.documentElement.setAttribute("data-theme", savedTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={qc}>
        <NavProvider>
          <RouterProvider router={router} />
        </NavProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </StrictMode>,
);
