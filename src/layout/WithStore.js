import React, { Fragment } from "react";
import App from "next/app";
import { useRouter } from "next/router";
import { Backdrop,CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import * as sideNavActions from "../store/actions/sideNavActions";
import * as currencyActions from "../store/actions/currencyActions";
import * as loadingActions from "../store/actions/loadingActions";
import * as loginActions from "../store/actions/loginActions";
import { bindActionCreators } from "redux";
import TopBar from "../../components/TopBar";
import SideNav from "../../components/SideNav";
import axios from "axios";

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
var activeRequestCount = 0;

function WithStore(props) {
  axios.interceptors.request.use(
    function (config) {
      activeRequestCount++;
      if (activeRequestCount === 1) props.actions.setIsLoading(true);

      var context = localStorage.getItem("userContext");
      config.headers["Content-Type"] = "application/json";
      if (context !== null) {
        var user = JSON.parse(context);

        config.headers.Authorization = "Bearer " + user.token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      activeRequestCount--;
      if (activeRequestCount === 0) {
        props.actions.setIsLoading(false);
      }

      return response;
    },
    (error) => {
      activeRequestCount--;
      if (activeRequestCount === 0) {
        props.actions.setIsLoading(false);
      }
      return Promise.reject(error);
    }
  );
  const classes = useStyles();
  const router = useRouter();
  React.useEffect(() => {
    var localstorage = localStorage.getItem("userContext");
    if (localstorage === null) {
      if (typeof window !== "undefined" && router.pathname !== "/login") {
        router.push("/login");
      }
    }
    if (localstorage !== null && !props.userContext.id) {
      var context = JSON.parse(localstorage);
      if (context.id > 0) {
        props.actions.setLoginContext(context);
      }
    }
  }, [props.userContext]);
  if (
    typeof window !== "undefined" &&
    router.pathname !== "/login" &&
    (!props.userContext || props.userContext.id < 1)
  ) {
    router.push("/login");
  }
  return (
    <Fragment>
      {!props.userContext || !props.userContext.id ? null : (
        <Fragment>
          <TopBar />
          <SideNav />
        </Fragment>
      )}

      <main
        className={clsx(
          { [classes.content]: props.userContext.id },
          {
            [classes.contentShift]: props.sideNavIsOpen,
          }
        )}
      >
        {React.cloneElement(props.children, props)}
      </main>
      <Backdrop open={props.isLoading} style={{ zIndex: 999999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
}

function mapStateToProps(state) {
  return {
    userContext: state.loginReducer,
    sideNavIsOpen: state.sideNavReducer,
    currencies: state.currencyReducer,
    isLoading: state.loadingReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      openSideNav: bindActionCreators(sideNavActions.openSideNav, dispatch),
      closeSideNav: bindActionCreators(sideNavActions.closeSideNav, dispatch),
      setCurrencies: bindActionCreators(
        currencyActions.setCurrencies,
        dispatch
      ),
      setIsLoading: bindActionCreators(loadingActions.setIsLoading, dispatch),
      login: bindActionCreators(loginActions.login, dispatch),
      logout: bindActionCreators(loginActions.logout, dispatch),
      setLoginContext: bindActionCreators(
        loginActions.setLoginContext,
        dispatch
      ),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithStore);
