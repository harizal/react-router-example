import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Home from '../src/Pages/Home'
import Login from '../src/Pages/Login';
import ProductDetail from '../src/Pages/ProductDetail';
function App() {
  return (
    <Router>
      <div className="App">     
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/product/:id">
            <ProductDetail />
          </Route>          
          <Route exact path="/login">
            <Login />
          </Route>          
        </Switch>     
      </div>
    </Router>
  );
}

export default App;
