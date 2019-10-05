import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import plus from "../assets/plus.svg";

import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Thumbnail,
    Button,
    Jumbotron,
    Popover,
    Tooltip,
    Modal,
    ButtonGroup,
    DropdownButton,
    nav,
    Grid,
    Row,
    Col
} from "react-bootstrap";


class submitView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            alias: "",
            advertiser: "",
            placementType: "",
            designMonth: "",
            description: ""
        }
    }



    componentDidMount() {

    }

    clickAllWinners() {
        this.props.history.push("/discover");
    }



    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={4} md={4} className="profileDivision">
                        <Row className="show-grid copyUserDetailsProfile">
                            <Col xs={12} md={12} className="nameUser margintextProfile">
                                Nadeem Sheikh
                            </Col>

                            <Col xs={12} md={12} className="margintextProfile">
                                Site : Bangalore
                              </Col>

                            <Col xs={12} md={12} className="copyCreativeDisProfile">
                                About: Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy. Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy. Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy.
                            </Col>

                            <Col xs={12} md={12} className="margintextProfile">
                                Total likes - 65
                              </Col>

                            <Col xs={12} md={12} className="margintextProfile">
                                Total Views - 103
                              </Col>

                        </Row>
                    </Col>

                    <Col xs={8} md={8}>

                        <Row className="show-grid">
                            <Col xs={12} md={12}>
                                <Row className="show-grid submitForm">
                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div>Name</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <input className="" type="text" value={this.state.name}
                                            onChange={e =>
                                                this.setState({
                                                    name:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Col>

                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div>Alias</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <input className="" type="text" value={this.state.name}
                                            onChange={e =>
                                                this.setState({
                                                    alias:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Col>


                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div>Advertiser</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <input className="" type="text" value={this.state.name}
                                            onChange={e =>
                                                this.setState({
                                                    advertiser:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Col>

                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div>Placement type</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <select
                                            className="aliasInput"
                                            placeholder="Primary Market"
                                            value={this.state.placementType}
                                            onChange={e =>
                                                this.setState({
                                                    placementType:
                                                        e.target.value
                                                })
                                            }
                                        >
                                            {/* <option value="" hidden>
                                                        Primary Market
                                                    </option> */}
                                            <option value="Statics">
                                                Statics
                                                    </option>
                                            <option value="LandingPage">
                                                Landing Page
                                                    </option>

                                            <option value="FireTv">
                                                FireTv
                                                    </option>

                                            <option value="FireTablet">
                                                FireTablet
                                                    </option>
                                        </select>
                                    </Col>

                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div htmlFor="">Design month</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <input className="" type="text" value={this.state.name}
                                            onChange={e =>
                                                this.setState({
                                                    designMonth:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Col>

                                    <Col xs={3} md={3} className="margintextProfile">
                                        <div>Description</div>
                                    </Col>

                                    <Col xs={9} md={9} className="margintextProfile">
                                        <textarea rows="6" className="" type="text" value={this.state.name}
                                            onChange={e =>
                                                this.setState({
                                                    description:
                                                        e.target.value
                                                })
                                            }
                                        />
                                    </Col>


                                    <Col xs={12} md={12} className="profileAllWinners" onClick={this.clickAllWinners}>
                                        <img src={plus}></img> View all winners
                                    </Col>
                                </Row>
                            </Col>


                        </Row>

                    </Col>
                </Row>
            </Grid>

        );
    }
}
export default withRouter(submitView);
