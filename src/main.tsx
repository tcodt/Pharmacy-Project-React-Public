import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import theme from "./theme.ts";
import "./index.css";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { AuthProvider } from "./hooks/AuthContext.tsx";
import AuthProvider from "react-auth-kit";
import store from "./store.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  </StrictMode>
);
