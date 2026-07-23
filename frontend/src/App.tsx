import React, { useEffect, Suspense } from "react";
import Header from "./components/header/Header";
import { Provider, useSelector } from "react-redux";
// import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";
// import { Global, css } from "@emotion/core";
// import react/js

import { useDispatch } from "react-redux";

// Saving the lazy loading in a function, so we can call it ourselves for preloads
// This is important cos you can call it to start the network download of the app so its ready when needed (preloading the authenticated page after login)
const loadAuthenticatedApp = () => import("./AuthApp");
// const AuthenticatedApp = React.lazy(loadAuthenticatedApp);

// Only ever fires when react tries to render <UnauthenticatedApp/>, can never manually call it
// const UnauthenticatedApp = React.lazy(() => import("./features/auth/Auth"));

//IMPORTANT;
//Useselector watches a value on redux store and causses a re-render if it changes
//use effect on runs a piece of code once a component mounts or render
//a re-render is a top to bottom code re run
//use effect with an empty array runs once no mater he rerender
//use effect with a valuen array watches the value if it changes to re-render
//use effect without a value always rerenders

const AuthWrapper = () => {
  //use selector is a function that re-renders a component when its value changes
  //back-end sends response - redux catches it and updtaes the user, use selector catches it and updates auth wrapper

  //   const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // where preload begins
    // starts when Authwrapper mounts (immediately a user visits the page)
    loadAuthenticatedApp();
  }, []);

  return (
    ///Suspense is a must use for lazyloaded apps
    ///Fall back for if any app isnt fully loaded
    ///user is gotten from the redux global state
    //key=user.id is a security trreat that tears adown and re-render sessions if user changes
    console.log("heyy")
  );
};

const App = () => {
  return <Header />;
};

export default App;

//Remember usestate and useselector both re-renders component.
// the former watches Local component state and the latter watches Redux global state (Redux store)
