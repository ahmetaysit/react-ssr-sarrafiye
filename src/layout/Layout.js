import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Link from "next/link";
import App from "next/app";
import TopBar from "../../components/TopBar";
import SideNav from "../../components/SideNav";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import configureStore from "../store/reducers/cofigureStore";
import WithStore from "./WithStore";
import {
  MuiThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: "#26a69a",
      },
      secondary: {
        main: "#9A0036",
      },
    },
  })
);
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "lightgoldenrodyellow",
    height: "1000px",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginTop: 64,
    backgroundColor: "transparent",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
}));
const store = configureStore();
export const withLayout = (PageComponent, { ssr = true } = {}) => {
  const withLayout = ({ initialReduxState, ...props }) => {
    const classes = useStyles();

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={6}
            autoHideDuration={2000}
            preventDuplicate={false}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <WithStore {...props}>
              <PageComponent {...props} />
            </WithStore>
          </SnackbarProvider>
        </MuiThemeProvider>
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== "production") {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error("The withLayout HOC only works with PageComponents");
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    withLayout.displayName = `withLayout(${displayName})`;
  }

  return withLayout;
};
