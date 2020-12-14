import './App.css';
import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StarWarsList from './screens/StarWarsList';
import StarWarsDetail from './screens/StarWarsDetail';
import StarWarsHome from './screens/StarWarsHome';


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPeople: relayStylePagination(),
        allStarships: relayStylePagination(),
      },
    },
  },
});


const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: cache
});


function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={StarWarsHome}/>
            <Route exact path="/list/:object" component={StarWarsList}/>
            <Route exact path="/detail/:object/:id" component={StarWarsDetail}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>

    
  );
}

export default App;
