import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import logo from "../assets/logoHome.svg";
import md5 from "js-md5";

import {
  Grid,
  Row,
  Col,
  Button,
  DropdownButton,
  MenuItem,
  ButtonGroup
} from "react-bootstrap";

class signupView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlias: "",
      userAliasValid: false,
      firstName: "",
      lastName: "",
      site: "Select your site",
      team: "Select your team",
      role: "",
      password: "",
      confirmPassword: "",
      about: "",
      firstNameValid: true,
      lastNameValid: true,
      siteValid: true,
      teamValid: true,
      roleValid: true,
      passwordValid: true,
      confirmPasswordValid: true,
      aboutValid: true
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleUserAlias = this.handleUserAlias.bind(this);
    this.handleSelectSite = this.handleSelectSite.bind(this);
    this.handleSelectTeam = this.handleSelectTeam.bind(this);
    this.handleRole = this.handleRole.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  handleFirstName(e) {
    if (e.target.value != null && e.target.value != "") {
      this.setState({ firstName: e.target.value, firstNameValid: true });
    } else {
      this.setState({ firstName: e.target.value, firstNameValid: false });
    }
  }

  handleLasttName(e) {
    if (e.target.value != null && e.target.value != "") {
      this.setState({ lastName: e.target.value, lastNameValid: true });
    } else {
      this.setState({ lastName: e.target.value, lastNameValid: false });
    }
  }

  handleUserAlias(e) {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: true });
    } else if (e.target.value == "") {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: true });
    } else {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: false });
    }
  }

  handleSelectSite(evt) {
    if (evt != "Select your site") {
      this.setState({ site: evt, siteValid: true });
    } else {
      this.setState({ site: evt, siteValid: false });
    }
  }

  handleSelectTeam(evt) {
    if (evt != "Select your team") {
      this.setState({ team: evt, teamValid: true });
    } else {
      this.setState({ team: evt, teamValid: false });
    }
  }

  handleRole(e) {
    if (e.target.value != null && e.target.value != "") {
      this.setState({ role: e.target.value, roleValid: true });
    } else {
      this.setState({ team: e.target.value, roleValid: false });
    }
  }

  handleUserPassword(e, field) {
    if (field == "pass") {
      if (e.target.value != null && e.target.value.trim() == "") {
        this.setState({ password: e.target.value, passwordValid: true });
      } else {
        this.setState({ password: e.target.value, passwordValid: false });
      }
    } else {
      if (e.target.value != null && e.target.value.trim() == "") {
        this.setState({
          confirmPassword: e.target.value,
          confirmPasswordValid: true
        });
      } else {
        this.setState({
          confirmPassword: e.target.value,
          confirmPasswordValid: false
        });
      }
    }
  }

  onSubmitClick(e, createUser) {
    if (this.state.firstName == null || this.state.firstName.trim() == "") {
      // alert("Please fill your first name");
    }

    if (
      this.state.firstName &&
      this.state.lastName &&
      this.state.userAlias &&
      this.state.site &&
      this.state.team &&
      this.state.role &&
      this.state.about &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.password == this.state.confirmPassword
    ) {
      createUser({
        variables: {
          name: this.state.firstName,
          fullname: this.state.firstName + " " + this.state.lastName,
          alias: this.state.userAlias.toLowerCase(),
          site: this.state.site.toLocaleUpperCase(),
          team: this.state.team.toLocaleUpperCase(),
          role: this.state.role,
          about: this.state.about,
          password: md5(this.state.password),
          userLevel: 0
        }
      });
    } else {
      if (!(this.state.password == this.state.confirmPassword)) {
        alert("password not matching");
      } else {
        alert("Please fill all the data");
      }
    }
  }
  render() {
    return (
      <Mutation
        mutation={gql`
          mutation CreateUser(
            $name: String
            $fullname: String
            $alias: String!
            $site: String
            $team: String
            $role: String
            $about: String
            $password: String
            $userLevel: Int
          ) {
            User: createUser(
              input: {
                name: $name
                fullname: $fullname
                alias: $alias
                site: $site
                team: $team
                role: $role
                about: $about
                password: $password
                userLevel: $userLevel
              }
            ) {
              userId
            }
          }
        `}
        onCompleted={data => {
          alert("Successfully registered.");
          this.props.history.push("/");
        }}
      >
        {(createUser, { loading, data, error }) => {
          if (error) {
            return <div>Some error occurred.</div>;
          }

          return (
            <Grid className="loginBG">
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  <Row className="show-grid" className="centerPannel">
                    <Col xs={2} md={2} />
                    <Col xs={4} md={4} className="signupPannel">
                      <Row className="show-grid">
                        <Col xs={12} md={12} className="loginPannelHeading">
                          Signup to continue...
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">First name</span>
                          <input
                            className="signupInput"
                            placeholder=""
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.firstName}
                            onChange={e => this.handleFirstName(e)}
                          />
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">Last name</span>
                          <input
                            className="signupInput"
                            placeholder=""
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.lastName}
                            onChange={e => this.handleLasttName(e)}
                          />
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">Team</span>
                          <ButtonGroup className="margin-bottom20" justified>
                            <DropdownButton
                              bsSize="small"
                              title={this.state.team}
                              id="dropdown-team"
                              onSelect={this.handleSelectTeam}
                              placeholder="Select your team"
                            >
                              <MenuItem eventKey="ADOPS" value="Ad Ops">
                                Ad Ops
                              </MenuItem>
                              <MenuItem eventKey="ADQA" value="QA">
                                Ad QA
                              </MenuItem>
                              <MenuItem eventKey="DSS" value="DSS">
                                DSS
                              </MenuItem>
                              <MenuItem
                                eventKey="Operations Acceleration"
                                value="Operations Acceleration"
                              >
                                Operations Acceleration
                              </MenuItem>
                              <MenuItem
                                eventKey="SSPA Tier 2"
                                value="SSPA Tier 2"
                              >
                                SSPA Tier 2
                              </MenuItem>
                              <MenuItem eventKey="BTS" value="BTS">
                                BTS
                              </MenuItem>
                            </DropdownButton>
                          </ButtonGroup>
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">Site</span>
                          <ButtonGroup className="margin-bottom20" justified>
                            <DropdownButton
                              bsSize="small"
                              title={this.state.site}
                              id="dropdown-site"
                              onSelect={this.handleSelectSite}
                              placeholder="Select your site"
                              value={this.state.site}
                              // autosize={false}
                            >
                              <MenuItem eventKey="BLR" value="BLR">
                                BLR
                              </MenuItem>
                              <MenuItem eventKey="SJO" value="SJO">
                                SJO
                              </MenuItem>
                              <MenuItem eventKey="Seattle" value="Seattle">
                                Seattle
                              </MenuItem>
                              <MenuItem
                                eventKey="Bratislava"
                                value="Bratislava"
                              >
                                Bratislava
                              </MenuItem>
                              <MenuItem eventKey="Newyork" value="Newyork">
                                New York
                              </MenuItem>
                              <MenuItem eventKey="Munich" value="Munich">
                                Munich
                              </MenuItem>
                              <MenuItem eventKey="Madrid" value="Madrid">
                                Madrid
                              </MenuItem>
                              <MenuItem
                                eventKey="LosAngeles"
                                value="LosAngeles"
                              >
                                Los Angeles
                              </MenuItem>
                            </DropdownButton>
                          </ButtonGroup>
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">Alias</span>
                          <input
                            className="signupInput"
                            placeholder="Alias (without @amazon.com)"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.userAlias}
                            onChange={e => this.handleUserAlias(e)}
                          />
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">
                            Designation/ Role
                          </span>
                          <input
                            className="signupInput"
                            placeholder="Role (ex: production designer)"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.role}
                            onChange={e => this.handleRole(e)}
                          />
                        </Col>

                        <Col xs={12} md={12}>
                          <span className="loginInputText">About yourself</span>
                          <textarea
                            rows="5"
                            className="signupInput"
                            placeholder="About yourself"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.about}
                            onChange={e => {
                              if (
                                e.target.value != null &&
                                e.target.value.trim != ""
                              ) {
                                this.setState({
                                  about: e.target.value,
                                  confirmPasswordValid: true
                                });
                              } else {
                                this.setState({
                                  about: e.target.value,
                                  confirmPasswordValid: false
                                });
                              }
                            }}
                          />
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">Password</span>
                          <input
                            className="signupInput"
                            placeholder="Password"
                            type="password"
                            pattern="[a-zA-Z]"
                            value={this.state.password}
                            onChange={e => this.handleUserPassword(e, "pass")}
                          />
                        </Col>

                        <Col xs={6} md={6}>
                          <span className="loginInputText">
                            Confirm password
                          </span>
                          <input
                            className="signupInput"
                            placeholder="Password"
                            type="password"
                            pattern="[a-zA-Z]"
                            value={this.state.confirmPassword}
                            onChange={e => this.handleUserPassword(e, "Cpass")}
                          />
                        </Col>

                        <Col xs={12} md={12}>
                          <Button
                            className="buttonClick"
                            onClick={e => {
                              this.onSubmitClick(e, createUser);
                            }}
                          >
                            Signup
                          </Button>
                        </Col>

                        <Col xs={12} md={12} className="textCenter">
                          <span className="textForlogin">
                            Already have account?<a href="/"> Login</a>
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
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
                      <Row className="show-grid">
                        <Col xs={4} md={4} />
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Enter you first name"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.firstName}
                            onChange={e =>
                              this.setState({ firstName: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Enter you last name"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.lastName}
                            onChange={e =>
                              this.setState({ lastName: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={4} md={4} />
                      </Row>
                    </Col>

                    <Col xs={12} md={12}>
                      <Row className="show-grid">
                        <Col xs={4} md={4} />

                        <Col xs={2} md={2}>
                          <ButtonGroup className="margin-bottom20" justified>
                            <DropdownButton
                              bsSize="small"
                              title={this.state.team}
                              id="dropdown-team"
                              onSelect={this.handleSelectTeam}
                              placeholder="Select your team"
                              // autosize={false}
                            >
                              <MenuItem eventKey="ADOPS" value="Ad Ops">
                                Ad Ops
                              </MenuItem>
                              <MenuItem eventKey="ADQA" value="QA">
                                Ad QA
                              </MenuItem>
                              <MenuItem eventKey="DSS" value="DSS">
                                DSS
                              </MenuItem>
                              <MenuItem
                                eventKey="Operations Acceleration"
                                value="Operations Acceleration"
                              >
                                Operations Acceleration
                              </MenuItem>
                              <MenuItem
                                eventKey="SSPA Tier 2"
                                value="SSPA Tier 2"
                              >
                                SSPA Tier 2
                              </MenuItem>
                              <MenuItem eventKey="BTS" value="BTS">
                                BTS
                              </MenuItem>
                            </DropdownButton>
                          </ButtonGroup>
                        </Col>

                        <Col xs={2} md={2}>
                          <ButtonGroup className="margin-bottom20" justified>
                            <DropdownButton
                              bsSize="small"
                              title={this.state.site}
                              id="dropdown-site"
                              onSelect={this.handleSelectSite}
                              placeholder="Select your site"
                              value={this.state.site}
                              // autosize={false}
                            >
                              <MenuItem eventKey="BLR" value="BLR">
                                BLR
                              </MenuItem>
                              <MenuItem eventKey="SJO" value="SJO">
                                SJO
                              </MenuItem>
                              <MenuItem eventKey="Seattle" value="Seattle">
                                Seattle
                              </MenuItem>
                              <MenuItem
                                eventKey="Bratislava"
                                value="Bratislava"
                              >
                                Bratislava
                              </MenuItem>
                              <MenuItem eventKey="Newyork" value="Newyork">
                                New York
                              </MenuItem>
                              <MenuItem eventKey="Munich" value="Munich">
                                Munich
                              </MenuItem>
                              <MenuItem eventKey="Madrid" value="Madrid">
                                Madrid
                              </MenuItem>
                              <MenuItem
                                eventKey="LosAngeles"
                                value="LosAngeles"
                              >
                                Los Angeles
                              </MenuItem>
                            </DropdownButton>
                          </ButtonGroup>
                        </Col>

                        <Col xs={4} md={4} />
                      </Row>
                    </Col>

                    <Col xs={12} md={12}>
                      <Row className="show-grid">
                        <Col xs={4} md={4} />
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Alias (without @amazon.com)"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.userAlias}
                            onChange={e => this.handleUserAlias(e)}
                          />
                        </Col>
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Designation/role"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.role}
                            onChange={e =>
                              this.setState({ role: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={4} md={4} />
                      </Row>
                    </Col>

                    <Col xs={12} md={12}>
                      <Row className="show-grid">
                        <Col xs={4} md={4} />
                        <Col xs={4} md={4}>
                          <textarea
                            rows="4"
                            className="signupInputTextarea"
                            placeholder="About yourself"
                            type="text"
                            pattern="[a-zA-Z]"
                            value={this.state.about}
                            onChange={e =>
                              this.setState({ about: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={4} md={4} />
                      </Row>
                    </Col>

                    <Col xs={12} md={12}>
                      <Row className="show-grid">
                        <Col xs={4} md={4} />
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Password"
                            type="password"
                            pattern="[a-zA-Z]"
                            value={this.state.password}
                            onChange={e =>
                              this.setState({ password: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={2} md={2}>
                          <input
                            className="signupInput"
                            placeholder="Confirm password"
                            type="password"
                            pattern="[a-zA-Z]"
                            value={this.state.confirmPassword}
                            onChange={e =>
                              this.setState({ confirmPassword: e.target.value })
                            }
                          />
                        </Col>
                        <Col xs={4} md={4} />
                      </Row>
                    </Col>
                  </Row>

                  <Button
                    className="buttonClick"
                    onClick={e => {
                      this.onSubmitClick(e, createUser);
                    }}
                  >
                    Signup
                  </Button>

                  <Col xs={12} md={12}>
                    <span className="textForlogin">
                      Already a user?<a href="/"> Login</a>
                    </span>
                  </Col>
                </Col> */}
              </Row>
            </Grid>
          );
        }}
      </Mutation>
    );
  }
}

export default withRouter(signupView);
