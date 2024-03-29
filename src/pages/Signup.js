import React, { Component } from 'react';
import ApolloClient from "apollo-client";
import { ApolloProvider, withApollo } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Link, Route, Switch } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { BrowserRouter } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Footer from "../components/footer";
import SignupView from "../components/signupView";

import "../style/global.css";
import Header from '../components/header';

class Signup extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <SignupView />
        <Footer />
      </div>
    );
  }
}

export default withApollo(withRouter(Signup));
