import React from "react";
import { withRouter } from "react-router-dom";
import AmazonLogo from "../assets/amazonLogo.svg";
import lineHoz from "../assets/line.svg";
import plus from "../assets/plus.svg";
import plusActive from "../assets/plusActive.svg";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Cookies from "universal-cookie";
import md5 from "js-md5";

import { Grid, Row, Col } from "react-bootstrap";

const GET_AllEntry = gql`
  query GetListEntries {
    listEntries {
      items {
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
        banner1Url
        fireTab1Url
        fireTab2Url
        landingPage1Url
        landingPage2Url
        landingPage3Url
      }
    }
  }
`;

const cookies = new Cookies();

class allEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: "Q4",
      check: false
    };
    this.sendToReview = this.sendToReview.bind(this);
  }

  sendToReview(alias, id) {
    console.log(id);
    this.props.history.push("/entry/" + alias + "/" + id);
  }

  frequencyChange(quater) {
    this.setState({
      frequency: quater
    });
  }

  componentDidMount() {
    var tempAuth = md5(this.props.match.params.userAlias);
    if (tempAuth != cookies.get("loginAuth")) {
      this.props.history.push(`/`);
    }
    // console.log("log============", cookies.get("loginAuth"));
  }

  render() {
    return (
      <Query query={GET_AllEntry}>
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
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
                <Row className="show-grid">
                  <Col xs={12} md={12} className="viewPageTitle">
                    <Row className="show-grid">
                      <Col xs={12} md={6}>
                        <div className="viewPageTitleYear">2018</div>
                        <div
                          style={{
                            display:
                              this.state.frequency == "Q1" ? "initial" : "none"
                          }}
                          className="viewPageTitleMonth"
                        >
                          QUARTER 1 WINNERS
                        </div>

                        <div
                          style={{
                            display:
                              this.state.frequency == "Q2" ? "initial" : "none"
                          }}
                          className="viewPageTitleMonth"
                        >
                          QUARTER 2 WINNERS
                        </div>

                        <div
                          style={{
                            display:
                              this.state.frequency == "Q3" ? "initial" : "none"
                          }}
                          className="viewPageTitleMonth"
                        >
                          QUATER 3 WINNERS
                        </div>

                        <div
                          style={{
                            display:
                              this.state.frequency == "Q4" ? "initial" : "none"
                          }}
                          className="viewPageTitleMonth"
                        >
                          QUARTER 4 WINNERS
                        </div>
                      </Col>

                      <Col xs={6} md={6} className="viewPageBottomQuaterNew">
                        <div className="">
                          <img src={lineHoz} />
                          {this.state.frequency == "Q1" ? (
                            <span>
                              <img
                                src={plusActive}
                                onClick={() => this.frequencyChange("Q1")}
                              />
                              Q1
                            </span>
                          ) : (
                            <span>
                              <img
                                src={plus}
                                onClick={() => this.frequencyChange("Q1")}
                              />
                              Q1
                            </span>
                          )}
                          <img src={lineHoz} />
                          {this.state.frequency == "Q2" ? (
                            <span>
                              <img
                                src={plusActive}
                                onClick={() => this.frequencyChange("Q2")}
                              />
                              Q2
                            </span>
                          ) : (
                            <span>
                              <img
                                src={plus}
                                onClick={() => this.frequencyChange("Q2")}
                              />
                              Q2
                            </span>
                          )}
                          <img src={lineHoz} />
                          {this.state.frequency == "Q3" ? (
                            <span>
                              <img
                                src={plusActive}
                                onClick={() => this.frequencyChange("Q3")}
                              />
                              Q3
                            </span>
                          ) : (
                            <span>
                              <img
                                src={plus}
                                onClick={() => this.frequencyChange("Q3")}
                              />
                              Q3
                            </span>
                          )}
                          <img src={lineHoz} />
                          {this.state.frequency == "Q4" ? (
                            <span>
                              <img
                                src={plusActive}
                                onClick={() => this.frequencyChange("Q4")}
                              />
                              Q4
                            </span>
                          ) : (
                            <span>
                              <img
                                src={plus}
                                onClick={() => this.frequencyChange("Q4")}
                              />
                              Q4
                            </span>
                          )}
                          <img src={lineHoz} />
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col xs={12} md={12}>
                    <Row className="show-grid">
                      {data.listEntries.items
                        .filter(entry => {
                          if (this.state.frequency === entry.Quater) {
                            return true;
                          } else {
                            false;
                          }
                        })
                        .map(entry => {
                          return (
                            <Col
                              style={{
                                display: entry.Visible ? "block" : "none"
                              }}
                              xs={4}
                              md={4}
                              className="viewMargin"
                              key={entry.EntryId}
                            >
                              <div
                                className="entryBlock"
                                onClick={() =>
                                  this.sendToReview(
                                    this.props.match.params.userAlias,
                                    entry.EntryId
                                  )
                                }
                              >
                                <div>
                                  <div className="winnersNameBlock">
                                    <span className="winnersName lineHover">
                                      {entry.DesignerName}
                                      <span className="winnerSite">
                                        ({entry.Site})
                                      </span>
                                    </span>
                                  </div>
                                  <a className="imageView">
                                    <img src={entry.ThumbnailURL} />
                                  </a>
                                </div>
                              </div>
                              <Col
                                className=""
                                onClick={() =>
                                  this.sendToReview(
                                    this.props.match.params.userAlias,
                                    entry.EntryId
                                  )
                                }
                                xs={12}
                                md={12}
                              >
                                <Col
                                  xs={9}
                                  md={9}
                                  className="placementType"
                                  onClick={() =>
                                    this.sendToReview(
                                      this.props.match.params.userAlias,
                                      entry.EntryId
                                    )
                                  }
                                >
                                  {entry.advertiser} | {entry.placement}
                                </Col>
                                <Col
                                  xs={2}
                                  md={2}
                                  className="points"
                                  onClick={() =>
                                    this.sendToReview(
                                      this.props.match.params.userAlias,
                                      entry.EntryId
                                    )
                                  }
                                >
                                  {" "}
                                  <span>{entry.Likes}</span>
                                  <img src={AmazonLogo} />
                                </Col>
                              </Col>
                            </Col>
                          );
                        })}
                    </Row>
                  </Col>
                  {/* <Col xs={12} md={12} className="viewPageBottomQuater">
                    <div className="">
                      <img src={lineHoz} />
                      {this.state.frequency == "Q1" ? (
                        <span>
                          <img
                            src={plusActive}
                            onClick={() => this.frequencyChange("Q1")}
                          />
                          Q1
                        </span>
                      ) : (
                        <span>
                          <img
                            src={plus}
                            onClick={() => this.frequencyChange("Q1")}
                          />
                          Q1
                        </span>
                      )}
                      <img src={lineHoz} />
                      {this.state.frequency == "Q2" ? (
                        <span>
                          <img
                            src={plusActive}
                            onClick={() => this.frequencyChange("Q2")}
                          />
                          Q2
                        </span>
                      ) : (
                        <span>
                          <img
                            src={plus}
                            onClick={() => this.frequencyChange("Q2")}
                          />
                          Q2
                        </span>
                      )}
                      <img src={lineHoz} />
                      {this.state.frequency == "Q3" ? (
                        <span>
                          <img
                            src={plusActive}
                            onClick={() => this.frequencyChange("Q3")}
                          />
                          Q3
                        </span>
                      ) : (
                        <span>
                          <img
                            src={plus}
                            onClick={() => this.frequencyChange("Q3")}
                          />
                          Q3
                        </span>
                      )}
                      <img src={lineHoz} />
                      {this.state.frequency == "Q4" ? (
                        <span>
                          <img
                            src={plusActive}
                            onClick={() => this.frequencyChange("Q4")}
                          />
                          Q4
                        </span>
                      ) : (
                        <span>
                          <img
                            src={plus}
                            onClick={() => this.frequencyChange("Q4")}
                          />
                          Q4
                        </span>
                      )}
                      <img src={lineHoz} />
                    </div>
                  </Col> */}
                </Row>
              </Grid>
            );
          }
        }}
      </Query>
    );
  }
}
export default withRouter(allEntries);
