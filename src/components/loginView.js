import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import logo from "../assets/logoHome.svg";

import { Grid, Row, Col, Button } from "react-bootstrap";

class loginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlias: "",
      password: "",
      userAliasValid: false
    };
    this.loginProcess = this.loginProcess.bind(this);
    this.handleUserAlias = this.handleUserAlias.bind(this);
    this.handleUserPassword = this.handleUserPassword.bind(this);
    this.loginButtonCheck = this.loginButtonCheck.bind(this);
  }

  loginProcess() {
    if (
      this.state.userAlias.trim() != "" &&
      this.state.userAlias.trim() != null &&
      this.state.userAliasValid == true
    ) {
      console.log("going to validate page");
      this.props.history.push({
        pathname: `/validate/${this.state.userAlias}`,
        state: { password: this.state.password }
      });
    } else if (this.state.userAlias == "") {
      console.log("Wrong data");
      this.setState({ userAliasValid: false });
    } else{
      console.log("Something went wrong========================");
    }
  }

  handleUserAlias(e) {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: true });
    } else if (e.target.value == "") {
      this.setState({ userAliasValid: true });
      this.setState({ userAlias: e.target.value });
    } else {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: false });
    }
    // console.log("Handle  user========================", /^[a-zA-Z]+$/.test(e.target.value));

    // console.log("Handle  user========================", this.state.userAlias);
  }

  handleUserPassword(e) {
    this.setState({ password: e.target.value });
    // console.log("Enter in login page =================",e.key)
    if (e.key === "Enter") {
      this.loginProcess();
    }
  }

  loginButtonCheck(e){
    if(e.key === 'Enter'){
      this.loginProcess();
    }
  }

  render() {
    // return (
    //   <Query query={GET_AllEntry}>
    //     {({ loading, error, data }) => {
    //       if (error) {
    //         console.log(error);
    //         return <div>Some error occurred.</div>;
    //       }

    //       if (loading) {
    //         return <div>Loading...</div>;
    //       } else {
    return (
      <Grid className="loginBG">
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Row className="show-grid" className="centerPannel">
              <Col xs={2} md={2} />
              <Col xs={4} md={4} className="loginPannel">
                <Row className="show-grid">
                  <Col xs={12} md={12} className="loginPannelHeading">
                    Login to continue...
                  </Col>

                  <Col xs={12} md={12}>
                    <span className="loginInputText">Alias</span>
                    <input
                      className="aliasInput"
                      placeholder="Alias (without @amazon.com)"
                      type="text"
                      pattern="[a-zA-Z]"
                      value={this.state.userAlias}
                      onChange={e => this.handleUserAlias(e)}
                    />
                  </Col>

                  <Col xs={12} md={12}>
                    <span className="loginInputText">Password</span>
                    <input
                      className="aliasInput"
                      placeholder="Password"
                      type="password"
                      pattern="[a-zA-Z]"
                      value={this.state.password}
                      onChange={e => this.handleUserPassword(e)}
                      onKeyDown={e => this.loginButtonCheck(e)}
                    />
                  </Col>

                  <Col xs={12} md={12}>
                    <Button
                      className="buttonClick"
                      onClick={() => {
                        this.loginProcess();
                      }}
                    >
                      Login
                    </Button>
                  </Col>

                  <Col xs={12} md={12} className="textCenter">
                    <span className="textForlogin">
                      Don’t have account?<a href="/signup"> Signup</a>
                    </span>
                  </Col>
                </Row>
              </Col>

              <Col xs={5} md={5} className="loginRight">
                <Row className="show-grid">
                  <Col xs={12} md={12}>
                    <img className="loginLogo" src={logo} />
                  </Col>

                  <Col xs={12} md={12}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Col>
                </Row>
              </Col>
              <Col xs={2} md={2} />
            </Row>
          </Col>

          {/* <Col xs={12} md={12} className="loginView">
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <img className="loginLogo" src={logo} />
              </Col>
              <Col xs={12} md={12}>
                <input
                  className="aliasInput"
                  placeholder="Alias (without @amazon.com)"
                  type="text"
                  pattern="[a-zA-Z]"
                  value={this.state.userAlias}
                  onChange={e => this.handleUserAlias(e)}
                />
              </Col>

              <Col xs={12} md={12}>
                <input
                  className="aliasInput"
                  placeholder="Password"
                  type="password"
                  pattern="[a-zA-Z]"
                  value={this.state.password}
                  onChange={e => this.handleUserPassword(e)}
                />
              </Col>
            </Row>

            <Button
              className="buttonClick"
              onClick={() => {
                this.loginProcess();
              }}
            >
              Login
            </Button>
            <Col xs={12} md={12}>
            <span className="textForlogin">
              New user?<a href="/signup"> Sign up</a>
            </span>
            </Col>
           
          </Col> */}
        </Row>
      </Grid>
    );
    //         }
    //       }}
    //     </Query>
    //   );
  }
}
export default withRouter(loginView);
