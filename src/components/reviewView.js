import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReactGA from "react-ga";
import AmazonLogo from "../assets/amazonLogo.svg";
import work1 from "../assets/work1.png";
import arrow from "../assets/arrow.svg";
import reviewWork from "../assets/workForReview.jpg";
import reviewWork1 from "../assets/workForReview1.jpg";
import CarouselSlider from "react-carousel-slider";
import tabletP from "../assets/tablet-P.svg";
import tabletL from "../assets/tablet-L.svg";
import animatedWS from "../assets/animatedWS.mp4";
import lineHoz from "../assets/line.svg";
import WS_L from "../assets/123_base_WS_L.jpg";
import WS_P from "../assets/123_base_WS_P.jpg";


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
    Col,
    Carousel
} from "react-bootstrap";

const GET_Entry = gql`
    query GetEntry($EntryId: ID!) {
        getEntry(EntryId: $EntryId) {
            DesignerName
            Site
            Team
            ThumbnailURL
            Likes
            Quater
            Visible
            nomineeAlias
            placement
            advertiser
            description
            clientBrief
            feedback
            lp1
            lp2
            lp3
            src
            managerAlias
            additionalInfo
            frequency
            assetsPSUrl
            assetsBGUrl
            assetREFUrl
            banner1Url
            banner1Size
            banner2Url
            banner2Size
            banner3Url
            banner3Size
            fireTvUrl
            fireTab1Url
            fireTab2Url
            landingPage1Url
            landingPage2Url
            landingPage3Url
        }
    }
`;


class reviewView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chkbox: false,
            selectedIndex: 0,
            currdeg: 0
        }

        this.handleChangeChk = this.handleChangeChk.bind(this);
    }


    handleChangeChk(selectedIndex, e) {
        this.setState({
            selectedIndex: selectedIndex
        });

        console.log("value---------", selectedIndex);
    }

    render() {
        return (
            <Mutation
                refetchQueries={[
                    {
                        query: GET_Entry,
                        variables: {
                            EntryId: this.props.match.params.id
                        }
                    }
                ]}
                mutation={gql`
                mutation UpdateEntryInput(
                    $EntryId: ID!
                    $Likes: String
                ) {
                    Likes: UpdateEntryInput(
                        input: {
                            entryId: $EntryId
                            likes: $Likes
                        }
                    ) {
                        EntryId
                    }
                }
            `}
            >
                {(UpdateEntryInput, { loading, data }) => {
                    return (
                        <Query
                            query={GET_Entry}
                            variables={{
                                EntryId: this.props.match.params.id
                            }}
                        >
                            {({ loading, error, data: entry }) => {
                                if (error) {
                                    return <div>Some error occurred.</div>;
                                }

                                if (loading) {
                                    return <div>Loading...</div>;
                                } else {
                                    return (
                                        <Grid>
                                            <Row className="galleryBlock show-grid">
                                                <Carousel activeIndex={this.state.selectedIndex} interval={null} onSelect={this.handleChangeChk}>
                                                    <Carousel.Item>
                                                        <img className="carouselImg" alt="900x500" src={reviewWork} />
                                                    </Carousel.Item>

                                                    {entry.getEntry.placement == "CrossScreen" || entry.getEntry.placement == "CrossScreen DEA" || entry.getEntry.placement == "AAP Static" || entry.getEntry.placement == "AAP DEA" || entry.getEntry.placement == "Interstitial/Encore" ?
                                                        <Carousel.Item>
                                                            <img className="carouselImg" alt="900x500" src={entry.getEntry.assetREFUrl} />
                                                        </Carousel.Item> :

                                                        <Carousel.Item>
                                                            {entry.getEntry.placement == "Fire Tablet" ?
                                                                <Row className="show-grid">
                                                                    <Col xs={1} md={1}></Col>
                                                                    <Col xs={10} md={10}>
                                                                        <Row className="show-grid">
                                                                            <Col xs={7} md={7} className="tabletL-reflect">
                                                                                <img src={tabletL} />
                                                                                <img className="tabletP-image" src={WS_L} />
                                                                            </Col>
                                                                            <Col xs={5} md={5} className="tabletP-reflect">
                                                                                <img src={tabletP} />
                                                                                <img className="tabletL-image" src={WS_P} />
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col xs={1} md={1}></Col>
                                                                </Row>
                                                                :
                                                                <div className="show-grid">
                                                                    {entry.getEntry.placement == "Animated WS" ?
                                                                        <video width="90%" autoPlay loop>
                                                                            <source src={animatedWS} type="video/mp4" />
                                                                            {/* <source src="movie.ogg" type="video/ogg" /> */}
                                                                        </video>
                                                                        :
                                                                        <div className="show-grid">
                                                                            {entry.getEntry.placement == "Landing Page" ?
                                                                                <Row className="show-grid">
                                                                                    <Col xs={1} md={1}>
                                                                                    </Col>
                                                                                    <Col xs={5} md={5} className="reviwerLandingPageContainer">
                                                                                        <img className="carouselImg" alt="900x500" src={entry.getEntry.landingPage1Url} />
                                                                                    </Col>
                                                                                    <Col xs={3} md={3} className="reviwerLandingPageContainer">
                                                                                        <img className="carouselImg" alt="900x500" src={entry.getEntry.landingPage2Url} />
                                                                                    </Col>
                                                                                    <Col xs={2} md={2} className="reviwerLandingPageContainer">
                                                                                        <img className="carouselImg" alt="900x500" src={entry.getEntry.landingPage3Url} />
                                                                                    </Col>
                                                                                    <Col xs={1} md={1}></Col>
                                                                                </Row>
                                                                                :
                                                                                <embed src="https://s3-ap-northeast-1.amazonaws.com/l9-rewards-assets/00504398_Philips_AAP-static_CR1.pdf#scrollbar=0" width="100%" height="540px" />
                                                                            }
                                                                        </div>


                                                                    }
                                                                </div>
                                                            }
                                                        </Carousel.Item>

                                                    }

                                                </Carousel>
                                                <Row className="show-grid">
                                                    <Col xs={12} md={12} className="copyHolder">

                                                        <Row className="show-grid copyUserDetails">
                                                            <Col xs={12} md={12} className="margintext">
                                                                <div className="nameUser margintext reviwerText">
                                                                    {entry.getEntry.DesignerName} ({entry.getEntry.nomineeAlias})
                                                    </div>

                                                                <img className="Revimg" src={lineHoz}></img>

                                                                <div className="margintext reviwerText">
                                                                    Advertiser: {entry.getEntry.advertiser}
                                                                </div>

                                                                <img className="Revimg" src={lineHoz}></img>

                                                                <div className="margintext reviwerText">
                                                                    Placement Type: {entry.getEntry.placement}
                                                                </div>
                                                            </Col>


                                                            <Col xs={12} md={12} className="margintext copyCreativeDis">
                                                                Description: {entry.getEntry.description}
                                                            </Col>
                                                            <Col xs={8} md={8} className="margintext smiles">
                                                                Total smiles - {entry.getEntry.Likes}
                                                            </Col>
                                                        </Row>

                                                    </Col>
                                                </Row>
                                                {/* <Col xs={12} md={12}>
                                    <div style={{ display: this.state.selectedIndex == 1 ? "initial" : "none" }}>
                                        <div className="reviewButtonBlock">
                                            <Button className="buttonClick">Approved</Button>
                                            <Button className="buttonClick">Reject</Button>
                                            <div className="buttonClick">Director overwrite: No</div>
                                        </div>
                                    </div>
                                </Col> */}
                                            </Row>
                                        </Grid>)
                                }
                            }}
                        </Query>
                    );
                }
                }
            </Mutation>
        );
    }
}
export default withRouter(reviewView);
