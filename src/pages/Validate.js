import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

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
    }
}
`;

class Validate extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.userAlias);
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
                        return (<div className="containerL">
                            <div class='triangle'></div>
                            <div class='triangle'></div>
                            <div class='triangle'></div>
                            <div class='triangle'></div>
                            <div class='triangle'></div>
                        </div>);
                    } else if (data === null) {
                        console.log("Singup");
                        return <div>Singup</div>;
                    } else if (
                        data.getUser != null
                    ) {
                        console.log("I'm login");
                        this.props.history.push(
                            `/discover/${Math.random()}/${
                            this.props.match.params.userAlias
                            }`
                        );
                        return null;
                    } else {
                        console.log("I'm signup");
                        this.props.history.push(
                            `/signup/${
                            this.props.match.params.userAlias
                            }`
                        );
                        return null;
                    }
                }}
            </Query>
        );
    }
}
export default Validate;
