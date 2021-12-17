import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useStoreState } from "store/StoreFront";
import { AuthLayout, MainLayout } from "views/layouts";
import "./App.sass";

const PrivateRoute: React.FunctionComponent<{
  exact: boolean,
  path: string,
  fallbackRoute: string,
}> = (props) => {
  const { isLogin } = useStoreState((state) => {
    return state.authModel;
  });

  return (
    <Route
      render={() => {
        return isLogin === true ? (
          props.children
        ) : (
          <Redirect to={props.fallbackRoute} />
        );
      }}
    />
  );

};

function App() {
  return (
    <Router>
      <div className="app">
        <Route exact path="/login" component={AuthLayout} />
        <PrivateRoute exact path="/library" fallbackRoute="/login">
          <MainLayout />
        </PrivateRoute>
        <MainLayout />
      </div>
    </Router>
  )
}

export default App;
