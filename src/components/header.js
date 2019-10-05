import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from 'react-ga';
import logo from "../assets/logo.svg";

import {
    Navbar,
    Nav,
    NavItem
} from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";


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
    }


    updatelink(value) {
        ReactGA.event({
            category: 'UserAction',
            action: value,
            label: 'Header' + value
        });

        this.setState({
            selected: value
        });
    }


    render() {
        return (

            <Navbar className="navPadding" inverse collapseOnSelect fixedTop={true}>
                <Navbar.Header className="navbar-header-custom">
                    <Navbar.Brand className="navbar-brand-custom">
                        <a href="/"><img className="logo-img" src={logo}></img></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        {/* <NavItem eventKey={1} href="/discover">
                            Discover
                        </NavItem> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
export default withRouter(Header);
