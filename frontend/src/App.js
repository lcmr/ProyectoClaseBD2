import {Login, Dashboard} from './components/views'
import { PrivateRoute } from './routes/PrivateRoute';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
