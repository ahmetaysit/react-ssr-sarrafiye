import React from "react";
import { withLayout } from "../src/layout/Layout";
import Link from "next/link";
import {
  Button,
  FormGroup,
  TextField,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import axios from "axios";
import appConfig from "../config/appConfig";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    backgroundImage: `url(${"../static/LoginBackround.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  content: {
    width:300,
    height:230,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  form:{
    width:"100%"
  },
  logo:{
    width:300,
    height:140,
    backgroundImage: `url(${"../static/istanbul.png"})`,
  }
}));

function login(props) {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  React.useEffect(() => {
    if (props) {
    }
  }, []);
  const SetLogin = () => {
    axios
      .post(appConfig.baseApiUrl + "users/authenticate", {
        userName: "test",
        password: "test",
      })
      .then((myJson) => {
        if (myJson.data !== null && myJson.data.responseData) {
          // alertify.success("giriş başarılı");
          props.actions.login(myJson.data.responseData);
          localStorage.setItem(
            "userContext",
            JSON.stringify(myJson.data.responseData)
          );
          router.push("/");
          // if (this._isMounted) this.setState({ isLoggedIn: true });
        }
      });
  };
  return (
    <div className={classes.root}>
      <div className={classes.logo}></div>
      <Card className={classes.content}>
        <CardHeader title="Kullanıcı Girişi"/>
        <CardContent>
          <Formik
            initialValues={{
              userName: "",
              password: "",
            }}
            validateOnChange={false}
            enableReinitialize
            validate={(values) => {
              const errors = {};

              return errors;
            }}
            onSubmit={(values, actions) => {
              console.log(values);
              
              axios
                .post(appConfig.baseApiUrl + "users/authenticate", values)
                .then((myJson) => {
                  if (myJson.data !== null && myJson.data.responseData) {
                    props.actions.login(myJson.data.responseData);
                    localStorage.setItem(
                      "userContext",
                      JSON.stringify(myJson.data.responseData)
                    );
                    router.push("/");
                    enqueueSnackbar("Giriş Başarılı",{variant:"success"});
                  }
                  else{
                    enqueueSnackbar(myJson.data.responseMessage,{variant:"error"});
                  }
                });
            }}
          >
            {(formProps) => (
              <form onSubmit={formProps.handleSubmit} className={classes.form}>
                <FormGroup>
                  <TextField
                    name="userName"
                    label="Kullanıcı Adı"
                    value={formProps.values.userName}
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    name="password"
                    label="Şifre"
                    value={formProps.values.password}
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button color="primary" type="submit">
                    Giriş
                  </Button>
                </FormGroup>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

export default withLayout(login);
