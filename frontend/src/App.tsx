import React, { useEffect, Suspense } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { Global } from "@emotion/react";
import { css } from "@emotion/react";
import store, { RootState } from "./store";
import Header from "./components/header/Header";
import FullPageSpinner from "./components/FullPageSpinner";
import { theme } from "./const";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Lazy load authenticated app
const loadAuthenticatedApp = () => import("./AuthApp");
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);

// Temporary unauthenticated app component (replace with your actual component)
const UnauthenticatedApp = () => <div>Unauthenticated App</div>;

const AuthWrapper = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Preload authenticated app
    loadAuthenticatedApp();
  }, []);

  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp key={user.id} /> : <UnauthenticatedApp />}
    </Suspense>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {" "}
        // ✅ ONLY ONE Router
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <AuthWrapper />
          <ToastContainer />
          <GlobalStyles styles={""} />
        </ThemeProvider>
      </Router>
    </Provider>
  );
};

export default App;
