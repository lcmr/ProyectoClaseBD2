import {Login, Dashboard, Carga, Tablas, Grafica} from './components/views'
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
        <PrivateRoute exact path="/cargar" component={Carga}/>
        <PrivateRoute exact path="/grafica" component={Grafica}/>
        <PrivateRoute exact path="/tabla" component={Tablas}/>
        <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
