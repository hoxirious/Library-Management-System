import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AuthLayout, MainLayout } from "views/layouts";
import "./App.sass";

function App() {
  return (
    <Router>
      <div className="app">
        <MainLayout />
        {/* <AuthLayout /> */}
      </div>
    </Router>
  )
}

export default App;
