import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StarWarsList from './screens/StarWarsList';
import StarWarsDetail from './screens/StarWarsDetail';
import StarWarsHome from './screens/StarWarsHome';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={StarWarsHome}/>
          <Route exact path="/list/:object" component={StarWarsList}/>
          <Route exact path="/detail/:object/:id" component={StarWarsDetail}/>
        </Switch>
      </div>
    </BrowserRouter>    
  );
}

export default App;
