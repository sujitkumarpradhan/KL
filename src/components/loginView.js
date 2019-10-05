import React from "react";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import {
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";

class loginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlias: "",
      userAliasValid: false
    }
    this.loginProcess = this.loginProcess.bind(this);
    this.handleUserAlias = this.handleUserAlias.bind(this);
  }

  loginProcess() {
    if (this.state.userAlias.trim() != "" && this.state.userAlias.trim() != null && this.state.userAliasValid == true) {
      console.log("going to validate page");
      this.props.history.push(
        `/validate/${
        this.state.userAlias
        }`
      );
    } else if (this.state.userAlias == "") {
      console.log("Wrong data");
      this.setState({ userAliasValid: false });
    }
  }

  handleUserAlias(e) {
    if (/^[a-zA-Z]+$/.test(e.target.value)) {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: true });
    } else if (e.target.value == "") {
      this.setState({ userAliasValid: true });
    } else {
      this.setState({ userAlias: e.target.value });
      this.setState({ userAliasValid: false });
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
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12} className="viewPageTitle">
            <div className="viewPageTitleYear">Login to Kaleidoscope</div>
            <input
              className="aliasInput"
              placeholder="Type in your alias (without @amazon.com)"
              type="text"
              pattern="[a-zA-Z]"
              value={this.state.userAlias}
              onChange={
                e => this.handleUserAlias(e)
              }
            />
            <Button className="buttonClick"
              onClick={() => {
                this.loginProcess();
              }}
            >Login</Button>
          </Col>
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
