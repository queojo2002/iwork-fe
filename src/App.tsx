import AuthRoutes from "@crema/components/AuthRoutes";
import AppContextProvider from "@crema/context/AppContextProvider";
import { useThemeContext } from "@crema/context/AppContextProvider/ThemeContextProvider";
import AppLocaleProvider from "@crema/context/AppLocaleProvider";
import AppThemeProvider from "@crema/context/AppThemeProvider";
import AppAuthProvider from "@crema/core/AppAuthProvider";
import AppLayout from "@crema/core/AppLayout";
import { GlobalStyles } from "@crema/core/theme/GlobalStyle";
import "@crema/mockapi";
import { BrowserRouter } from "react-router-dom";
import { Normalize } from "styled-normalize";
import "./styles/index.css";

const App = () => {
  const { theme } = useThemeContext();

  return (
    <AppContextProvider>
      <AppThemeProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <AppAuthProvider>
              <AuthRoutes>
                <GlobalStyles theme={theme} />
                <Normalize />
                <AppLayout />
              </AuthRoutes>
            </AppAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
};

export default App;
