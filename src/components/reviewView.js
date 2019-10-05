import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import ReactGA from "react-ga";
import AmazonLogo from "../assets/amazonLogo.svg";
import DeviceLaptop from "../assets/laptop.svg";
import DeviceMobile from "../assets/mobile.svg";
import Devicetablet from "../assets/tablet.svg";
import clientAssets from "../assets/00662125_Ref.jpg";
import CarouselSlider from "react-carousel-slider";
import tabletP from "../assets/tablet-P.svg";
import tabletL from "../assets/tablet-L.svg";
import animatedWS from "../assets/animatedWS.mp4";
import lineHoz from "../assets/line.svg";
import WS_L from "../assets/123_base_WS_L.jpg";
import WS_P from "../assets/123_base_WS_P.jpg";

import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

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
import { element } from "prop-types";

const GET_Entry = gql`
  query GetEntry($EntryId: ID!) {
    getEntry(EntryId: $EntryId) {
      EntryId
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
      managerAlias
      additionalInfo
      award
      frequency
      assetsUrl
      banner1Url
      fireTab1Url
      fireTab2Url
      landingPage1Url
      landingPage2Url
      landingPage3Url
      managersStatus
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
    };

    this.handleChangeChk = this.handleChangeChk.bind(this);
  }

  handleChangeChk(e) {
    this.setState({
      selectedIndex: e
    });
    // if(this.state.selectedIndex == 1)
    // this.setState({
    //   selectedIndex: 2
    // });
    // else
    // this.setState({
    //   selectedIndex: 1
    // });
    // console.log("value---------", this.state.selectedIndex, e);
  }

/*
Manager status is to update the DB value based on approval

Manager approved: 100    (Approved)
Manager reject: 0       (Not Approved)
Pending action from manager: 10     (Under review)
*/

  updateMangerStatus(updateEntry, entry, status) {
    if (status == "approved") {
      updateEntry({
        variables: {
          EntryId: this.props.match.params.id,
          managersStatus: "100"
        }
      });
    } else if (status == "reject") {
      updateEntry({
        variables: {
          EntryId: this.props.match.params.id,
          managersStatus: "0"
        }
      });
    } else {
      updateEntry({
        variables: {
          EntryId: this.props.match.params.id,
          managersStatus: "10"
        }
      });
    }
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
          mutation updateEntry($EntryId: ID!, $managersStatus: String) {
            updateEntry(
              input: { EntryId: $EntryId, managersStatus: $managersStatus }
            ) {
              EntryId
            }
          }
        `}
        onCompleted={data => {
          alert("Successfully updated.");
          this.props.history.push(
            `/reviwerview/${Math.random()}/` + this.props.match.params.userAlias
          );
        }}
      >
        {(updateEntry, { loading, data }) => {
          if (loading) {
            return (
              <Grid>
                <Row className="validationPage show-grid">
                  <Col xs={12} md={12}>
                    <div className="loader">Loading...</div>
                  </Col>
                  <Col xs={12} md={12} className="validationLodingText">
                    Please wait while we are loading...
                  </Col>
                </Row>
              </Grid>
            );
          } else {
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
                    return (
                      <Grid>
                        <Row className="validationPage show-grid">
                          <Col xs={12} md={12}>
                            <div className="loader">Loading...</div>
                          </Col>
                          <Col xs={12} md={12} className="validationLodingText">
                            Please wait while we are loading...
                          </Col>
                        </Row>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid>
                        <Row className="galleryBlock show-grid">
                          <Carousel
                            infiniteLoop={false}
                            showStatus={false}
                            showIndicators={false}
                            showThumbs={false}
                            swipeable={true}
                            useKeyboardArrows={true}
                            onChange={e => this.handleChangeChk(e)}
                          >
                            <div>
                              <img
                                className="reviewImgAssets"
                                src={entry.getEntry.assetsUrl}
                              />
                            </div>

                            <div>
                              {entry.getEntry.placement == "CrossScreen" ||
                              entry.getEntry.placement == "CrossScreen DEA" ||
                              entry.getEntry.placement == "AAP Static" ||
                              entry.getEntry.placement == "AAP DEA" ||
                              entry.getEntry.placement ==
                                "Interstitial/Encore" ? (
                                <img
                                  className="reviewImgAssets"
                                  alt="900x500"
                                  src={entry.getEntry.banner1Url}
                                />
                              ) : (
                                <div>
                                  {entry.getEntry.placement == "Fire Tablet" ? (
                                    <Row className="show-grid">
                                      <Col xs={1} md={1} />
                                      <Col xs={10} md={10}>
                                        <Row className="show-grid">
                                          <Col xs={1} md={1} />
                                          <Col
                                            xs={6}
                                            md={6}
                                            className="tabletViewL tabletL-reflect"
                                          >
                                            <img className="" src={tabletL} />
                                            <img
                                              className="tabletViewImgL tabletP-image"
                                              src={entry.getEntry.fireTab1Url}
                                            />
                                          </Col>
                                          <Col
                                            xs={5}
                                            md={5}
                                            className="tabletP-reflect"
                                          >
                                            <img src={tabletP} />
                                            <img
                                              className="tabletViewImgP tabletL-image"
                                              src={entry.getEntry.fireTab2Url}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col xs={1} md={1} />
                                    </Row>
                                  ) : (
                                    <div className="show-grid">
                                      {entry.getEntry.placement ==
                                      "Animated wake screen" ? (
                                        <video width="78%" autoPlay loop>
                                          <source
                                            src={entry.getEntry.banner1Url}
                                            type="video/mp4"
                                          />
                                        </video>
                                      ) : (
                                        <div className="show-grid">
                                          {entry.getEntry.placement ==
                                          "Landing Page" ? (
                                            <Row className="show-grid">
                                              <Col
                                                xs={12}
                                                md={12}
                                                className="reviwerLandingPageContainer"
                                              >
                                                <Row className="show-grid">
                                                  <Col
                                                    xs={3}
                                                    md={3}
                                                    className="reflection cursorPointer reviwerTabletPageContainer"
                                                  >
                                                    <img
                                                      className="tabletReview"
                                                      src={Devicetablet}
                                                      alt="1"
                                                    />
                                                    <div className="tabletLandingPageContainerReview">
                                                      <img
                                                        src={
                                                          entry.getEntry
                                                            .landingPage2Url
                                                        }
                                                        alt="1"
                                                      />
                                                    </div>
                                                  </Col>

                                                  <Col
                                                    xs={6}
                                                    md={6}
                                                    className="reflectionlaptopReview cursorPointer reviwerLaptopPageContainer"
                                                  >
                                                    <img
                                                      className="laptopReview"
                                                      src={DeviceLaptop}
                                                      alt="1"
                                                    />
                                                    <div className="laptopLandingPageContainerReview">
                                                      <img
                                                        src={
                                                          entry.getEntry
                                                            .landingPage1Url
                                                        }
                                                        alt="1"
                                                      />
                                                    </div>
                                                  </Col>

                                                  <Col
                                                    xs={3}
                                                    md={3}
                                                    className="reflection cursorPointer reviwerMobilePageContainer"
                                                  >
                                                    <img
                                                      className="mobileReview"
                                                      src={DeviceMobile}
                                                      alt="1"
                                                    />
                                                    <div className="mobileLandingPageContainerReview">
                                                      <img
                                                        src={
                                                          entry.getEntry
                                                            .landingPage3Url
                                                        }
                                                        alt="1"
                                                      />
                                                    </div>
                                                  </Col>
                                                </Row>
                                              </Col>
                                            </Row>
                                          ) : (
                                            <div>
                                              <div className="note">
                                                Note: This is in pdf format.
                                                Please scroll for more pages.
                                              </div>
                                              <embed
                                                src={`${entry.getEntry.banner1Url}#scrollbar=1&toolbar=0&navpanes=1`}
                                                width="80%"
                                                height="540px"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </Carousel>

                          <Row className="show-grid">
                            <Col xs={1} md={1} />
                            <Col xs={10} md={10} className="copyHolder">
                              <Row className="show-grid copyUserDetails">
                                <Col xs={12} md={12} className="margintext">
                                  <div className="nameUser reviwerText">
                                    {entry.getEntry.DesignerName}
                                    <span className="userAliasReview">
                                      ({entry.getEntry.nomineeAlias})
                                    </span>
                                  </div>

                                  <img className="Revimg" src={lineHoz} />

                                  <div className="reviwerText">
                                    Advertiser: {entry.getEntry.advertiser}
                                  </div>

                                  <img className="Revimg" src={lineHoz} />

                                  <div className="reviwerText">
                                    Placement Type: {entry.getEntry.placement}{" "}
                                    <span
                                      style={{
                                        display:
                                          entry.getEntry.placement ==
                                          "Landing Page"
                                            ? "initial"
                                            : "none"
                                      }}
                                    >
                                      <a
                                        className="previewUrl"
                                        href="https://www.amazon.com/adlp/previewpage?pageId=edebc37d-0662-484d-abc3-7d0662784d49"
                                        target="_blank"
                                      >
                                        preview
                                      </a>
                                    </span>
                                  </div>
                                </Col>

                                <Col
                                  xs={12}
                                  md={12}
                                  className="margintext copyCreativeDisReview"
                                >
                                  Description: {entry.getEntry.description}
                                </Col>

                                <Col xs={12} md={12}>
                                  <div
                                    style={{
                                      display:
                                        this.state.selectedIndex == 1
                                          ? "initial"
                                          : "none"
                                    }}
                                  >
                                    <Row className="show-grid">
                                      <div className="reviwerButtonBlock">
                                        <button
                                          className="reviewSelectButton"
                                          onClick={async () => {
                                            const response = await this.updateMangerStatus(
                                              updateEntry,
                                              entry,
                                              "approved"
                                            );
                                          }}
                                        >
                                          Approved
                                        </button>
                                      </div>

                                      <div className="reviwerButtonBlock">
                                        <button
                                          className="reviewNotSelectButton"
                                          onClick={async () => {
                                            const response = await this.updateMangerStatus(
                                              updateEntry,
                                              entry,
                                              "reject"
                                            );
                                          }}
                                        >
                                          Reject
                                        </button>
                                      </div>
                                      <div
                                        style={{
                                          display:
                                            entry.getEntry.managersStatus != "10"
                                              ? "initial"
                                              : "none"
                                        }}
                                        className="reviwerButtonBlock backToReview"
                                        onClick={async () => {
                                          const response = await this.updateMangerStatus(
                                            updateEntry,
                                            entry,
                                            "backtoreview"
                                          );
                                        }}
                                      >
                                        Send back to review
                                      </div>

                                      <div className="reviwerButtonBlock currentStatus">
                                        Current status:{" "}
                                        {entry.getEntry.managersStatus == "10"
                                          ? "Under Review"
                                          : entry.getEntry.managersStatus ==
                                            "100"
                                          ? "Approved"
                                          : "Not approved"}
                                      </div>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Col xs={1} md={1} />
                          </Row>
                        </Row>
                      </Grid>
                    );
                  }
                }}
              </Query>
            );
          }
        }}
      </Mutation>
    );
  }
}
export default withRouter(reviewView);
