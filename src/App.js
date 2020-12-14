import './App.css';
import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StarWarsPeopleList from './screens/StarWarsPeopleList'
import StarWarsPersonDetail from './screens/StarWarsPersonDetail'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPeople: relayStylePagination(),
      },
    },
  },
});

/* const query = gql`
  query luke {
    person @rest(type: "Person", path: "people/1/") {
      name
    }
  }
`; */

const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: cache
});

/* 
client.query({ query }).then(response => {
  console.log(response.data.name);
}); */

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={StarWarsPeopleList}/>
            <Route exact path="/person/:id" component={StarWarsPersonDetail}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>

    
  );
}

export default App;
