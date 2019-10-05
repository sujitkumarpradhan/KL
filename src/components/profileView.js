import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import AmazonLogo from "../assets/amazonLogo.svg";
import plus from "../assets/plus.svg";

import {
    Grid,
    Row,
    Col
} from "react-bootstrap";


class profileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.clickAllWinners = this.clickAllWinners.bind(this);
    }

    clickAllWinners() {
        this.props.history.push("/discover");
    }

    render() {
        return (
            <Grid>
                <Row className="galleryBlock show-grid">
                    <Col xs={4} md={4} className="profileDivision">
                        <Row className="show-grid copyUserDetailsProfile">
                            <Col xs={12} md={12} className="nameUser margintextProfile">
                                Nadeem Sheikh
                            </Col>

                            <Col xs={12} md={12} className="margintextProfile">
                                Site : BLR
                              </Col>

                            <Col xs={12} md={12} className="copyCreativeDisProfile">
                                About: Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy. Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy. Lorem ipsum, this is a dummy copyfor the campaign description. This is a dummy copy.
                            </Col>

                            <Col xs={12} md={12} className="margintextProfile">
                                Total smiles - 65
                              </Col>

                        </Row>
                    </Col>

                    <Col xs={8} md={8}>

                        <Row className="show-grid">
                            <Col xs={12} md={12}>
                                <Row className="show-grid copyUserDetailsProfile">
                                    {/* <Col xs={12} md={12} className="margintextProfile">
                                        Q1 2018      <span className="profileDescription">HP US | Crossscreen</span>
                                    </Col> */}

                                    <Col xs={6} md={6} className="viewMargin">
                                        <div className="entryBlock">
                                            <div>

                                                <div className="winnersNameBlock">

                                                    <span className="winnersName lineHover">Selected</span>
                                                </div>
                                                <a className="imageView">
                                                    <img
                                                        src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
                                                </a>
                                            </div>

                                        </div>
                                        <div className="">
                                            <span className="placementType">Samsung | Fire TV</span>
                                            <span className="points"> 40 <img src={AmazonLogo} /></span>
                                        </div>
                                    </Col>

                                    <Col xs={6} md={6} className="grayScale viewMargin">
                                        <div className="entryBlock">
                                            <div>

                                                <div className="winnersNameBlock">

                                                    <span className="winnersName lineHover">Not Selected</span>
                                                </div>
                                                <a className="imageView">
                                                    <img
                                                        src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
                                                </a>
                                            </div>

                                        </div>
                                        <div className="">
                                            <span className="placementType">Samsung | Fire TV</span>
                                            {/* <span className="points"> 40 <img src={AmazonLogo} /></span> */}
                                        </div>
                                    </Col>

                                    {/* <Col xs={12} md={12} className="margintextProfile">
                                        Q1 2018    <span className="profileDescription">Intel DE | Landing Page</span>
                                    </Col>

                                    <Col xs={12} md={12} className="margintextProfile">
                                        Q2 2018    <span className="profileDescription">Samsung FR | Crossscreen</span>
                                    </Col>

                                    <Col xs={12} md={12} className="margintextProfile">
                                        Q3 2018    <span className="profileDescription">Lego FR | Fire Tablet</span>
                                    </Col> */}
                                </Row>
                            </Col>

                            <Col xs={12} md={12} className="profileAllWinners" onClick={this.clickAllWinners}>
                                <img src={plus}></img> View all winners
                            </Col>
                        </Row>

                    </Col>
                </Row>
            </Grid>

        );
    }
}
export default withRouter(profileView);
