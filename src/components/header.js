import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import logo from "../assets/logo.svg";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Cookies from "universal-cookie";
import md5 from "js-md5";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";

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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: this.props.match.params.userAlias,
      playvideo: false,
      mainColor: "",
      selected: "home",
      intervalId: ""
    };
    this.updatelink = this.updatelink.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleHomePage = this.handleHomePage.bind(this);

    // console.log("Number ===================", this.props.match.params.path);
  }

  updatelink(value) {
    ReactGA.event({
      category: "UserAction",
      action: value,
      label: "Header" + value
    });

    this.setState({
      selected: value
    });
  }

  handleProfile(e, alias, value) {
    // console.log(e.target.value);

    value = e.target.value;

    // if (e.target.value == "profile") {
    //   this.props.history.push("/profile/" + alias);
    // } else if (e.target.value == "logout") {
    //   cookies.remove("loginAuth", { path: "/" });
    //   this.props.history.push("/");
    // } else {
    // }



    if (value == "profile") {
      this.props.history.push("/profile/" + alias);
    } else if (value == "logout") {
      cookies.remove("loginAuth", { path: "/" });
      this.props.history.push("/");
    } else {
    }
    // this.props.history.push("/profile/" + alias);
  }

  handleHomePage(e, user) {
    if (user.userLevel == 100) {
      this.props.history.push(`/reviwerview/${Math.random()}/` + user.alias);
    } else {
      this.props.history.push(`/discover/${Math.random()}/` + user.alias);
    }
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
            return (
              <Navbar
                className="headerHeight navPadding"
                inverse
                collapseOnSelect
                fixedTop={true}
              >
                <Navbar.Header className="navbar-header-custom">
                  <Navbar.Brand className="navbar-brand-custom">
                    <a href="/">
                      <img className="logo-img" src={logo} />
                    </a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse className="headerContainer">
                  <Nav>
                    {/* <NavItem eventKey={1} href="/discover/">
                              Discover
                          </NavItem> */}

                    {/* <NavItem eventKey={1} href="/discover">
                             Hello {}
                          </NavItem> */}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
          }

          if (loading) {
            return (
              <Navbar
                className="headerHeight navPadding"
                inverse
                collapseOnSelect
                fixedTop={true}
              >
                <Navbar.Header className="navbar-header-custom">
                  <Navbar.Brand className="navbar-brand-custom">
                    <a href="/">
                      <img className="logo-img" src={logo} />
                    </a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse className="headerContainer">
                  <Nav>
                    {/* <NavItem eventKey={1} href="/discover/">
                            Discover
                        </NavItem> */}

                    {/* <NavItem eventKey={1} href="/discover">
                           Hello {}
                        </NavItem> */}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
          } else {
            return (
              <Navbar
                className="headerHeight navPadding"
                inverse
                collapseOnSelect
                fixedTop={true}
              >
                <Navbar.Header className="navbar-header-custom">
                  <Navbar.Brand className="navbar-brand-custom">
                    <a href="#">
                      <img className="logo-img" src={logo} />
                    </a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse className="headerContainer">
                  <Nav>
                    {/* <NavItem eventKey={1} href="/discover/">
                            Discover
                        </NavItem> */}

                    {/* <NavItem eventKey={1} href="/discover">
                           Hello {}
                        </NavItem> */}

                    <NavItem
                      className="headerHomeText"
                      eventKey={1}
                      onClick={e => this.handleHomePage(e, data.getUser)}
                    >
                      <span className="headerHome">Home Page</span>
                    </NavItem>

                    {/* <NavItem
                      className="headerHomeText"
                      eventKey={1}
                      onClick={e => this.handleHomePage(e, data.getUser)}
                    >
                    <img
                        className="headerUserImage"
                        src={`https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=${
                          data.getUser.alias
                        }`}
                      />
                      <span
                       onChange={e =>
                        this.handleProfile(e, data.getUser.alias, "profile")
                      }
                      className="headerHome">Hello {data.getUser.name}</span>
                    </NavItem> */}

                    <NavItem
                      className="headerprofileText"
                      eventKey={1}
                      // onClick={e => this.handleProfile(e, data.getUser.alias)}
                    >
                      <img
                        className="headerUserImage"
                        src={`https://internal-cdn.amazon.com/badgephotos.amazon.com/?uid=${
                          data.getUser.alias
                        }`}
                      />{" "}
                      <span className="headerProfile">
                        <select
                          onChange={e =>
                            this.handleProfile(e, data.getUser.alias, "profile")
                          }
                        >
                          <option value="name">
                            Hello, {data.getUser.name}
                          </option>
                          <option value="profile">Profile</option>
                          <option value="logout">Logout</option>
                        </select>
                      </span>
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            );
          }
        }}
      </Query>
    );
  }
}
export default withRouter(Header);
