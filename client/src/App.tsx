import "./App.scss";
import { observer } from "mobx-react";
import { authStore } from "./stores/auth.store";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Loading from "./components/loading/Loading";
import SignIn from "./pages/signin/SignIn";
import { Navigate } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import privateRoutes from "./routes/routes";
import { PrivateRoute } from "./routes/PrivateRoute";

const App = observer(() => {

  return (
    <Fragment>
      <ReactNotification />
      {authStore.isLoading ? <Loading /> : null}
      <Router>
        <Container fluid className="default">
          <Routes>
            {privateRoutes.map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <PrivateRoute>
                    <item.component />
                  </PrivateRoute>
                }
              ></Route>
            ))}
            <Route path="/login" element={<SignIn />}></Route>
          </Routes>
        </Container>
      </Router>
    </Fragment>
  );
});

export default App;
function useNavigate() {
  throw new Error("Function not implemented.");
}
