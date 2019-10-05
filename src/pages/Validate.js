import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import md5 from "js-md5";
import logo from "../assets/logo.svg";
import { Grid, Row, Col, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

const GET_User = gql`
  query getUser($alias: String!) {
    getUser(alias: $alias) {
      name
      alias
      fullname
      team
      role
      site
      about
      password
      userLevel
    }
  }
`;

const cookies = new Cookies();

class Validate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlias: this.props.match.params.userAlias,
      encrpytPassword: md5(this.props.location.state.password)
    };
  }

  render() {
    return (
      <Query
        query={GET_User}
        variables={{
          alias: this.props.match.params.userAlias
        }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
            return <div>Some error occurred.</div>;
          }

          if (loading) {
            console.log("loading");
            return (
              <Grid>
                <Row className="validationPage show-grid">
                  <Col xs={12} md={12}>
                    <div className="loader">Loading...</div>
                  </Col>
                  <Col xs={12} md={12} className="validationLodingText">
                    Please wait while we are loading...
                  </Col>
                  <Col xs={12} md={12}>
                    <img className="validationLoadingLogo" src={logo} />
                  </Col>
                </Row>
              </Grid>
            );
          } else if (data === null) {
            console.log("Singup");
            return <div>Singup</div>;
          } else if (
            data.getUser != null &&
            data.getUser.password.toLowerCase() == this.state.encrpytPassword.toLowerCase()
          ) {
            var tempAuth = md5(this.props.match.params.userAlias);
            cookies.set("loginAuth", tempAuth, { path: "/" });
            if(data.getUser.userLevel == 100){
              this.props.history.push(
                `/reviwerview/${Math.random()}/${this.props.match.params.userAlias}`
              );
            } else{
              this.props.history.push(
                `/discover/${Math.random()}/${this.props.match.params.userAlias}`
              );
            }
           
            return null;
          } else {
            console.log("I'm signup");
            this.props.history.push(
              `/signup/${this.props.match.params.userAlias}`
            );
            return null;
          }
        }}
      </Query>
    );
  }
}
export default Validate;
