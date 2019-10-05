import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Discover from "./pages/Discover";
import SinglePage from "./pages/SinglePage";
import Profile from "./pages/Profile";
import Submit from "./pages/Submit";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Validate from './pages/Validate';


const client = new ApolloClient({
    link: createHttpLink({
        uri:
            "https://vbnd4rwfwve4pe5ypaosyddfey.appsync-api.ap-northeast-1.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-jmdnetpzrbhxlbe7q6r3evmbj4"
        }
    }),
    cache: new InMemoryCache()
});


ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/validate/:userAlias" component={Validate} />
                <Route path="/signup" component={Signup} />
                <Route path="/discover/:path/:userAlias" component={Discover} />
                <Route path="/entry/:id" component={SinglePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile/submit" component={Submit} />
                <Route path="/review/:id" component={Review} />
                <Route path="/" component={Login} /> 
                <Route component={Login} />
            </Switch>

        </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
);
// registerServiceWorker();
