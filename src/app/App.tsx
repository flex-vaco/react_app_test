import React from "react";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "../_start/layout/core";
import { MasterLayout } from "../_start/layout/MasterLayout";
import { Logout } from "./modules/auth/Logout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { PublicRoutes } from "./routing/PublicRoutes";
import { ErrorsPage } from "./modules/errors/ErrorsPage";

type Props = {
  basename: string;
};

const App: React.FC<Props> = ({ basename }) => {
  //const items = JSON.parse(localStorage.getItem('items'));

  const user = localStorage.getItem("user");
  //console.log("RAPP", JSON.parse(user || '{}'))
  //const isLoggedIn= ((localStorage.getItem("user") !== null) && (needsPasswordReset !== 1));

  // const isAuthorized = useSelector<RootState>(
  //   ({ auth }) => auth.user,
  //   shallowEqual
  // );
  // const isAuthorized = (accessToken) ? true : false;
//console.log("APP--", JSON.stringify(localStorage.getItem("user")))
const isAuthorized = (user) ? true : false;
  return (
    <BrowserRouter basename={basename}>
      <ThemeProvider>
        <Switch>
          <HashRouter>
          <Route path="/error" component={ErrorsPage} />
          <Route path="/logout" component={Logout} />
          {!isAuthorized ? (
            <Route>
              <PublicRoutes />
            </Route>
          ) : (
            <>
              <MasterLayout>
                <PrivateRoutes />
              </MasterLayout>
            </>
          )}
          </HashRouter>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export { App };
