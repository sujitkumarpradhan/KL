import React from "react";
import { withRouter } from "react-router-dom";
import AmazonLogo from "../assets/amazonLogo.svg";
import lineHoz from "../assets/line.svg";
import plus from "../assets/plus.svg";
import plusActive from "../assets/plusActive.svg";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";


import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

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
              lp1
              lp2
              lp3
              src
              managerAlias
              additionalInfo
              award
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
    }
`;


class allEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frequency: "Q4"
    }
    this.sendToReview = this.sendToReview.bind(this);
  }

  sendToReview(id) {
    console.log(id);
    this.props.history.push("/entry/" + id);
  }

  frequencyChange(quater) {
    this.setState({
      frequency: quater
    });
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
            return <div>Loading...</div>;
          } else {
            return (

              <Grid>
                <Row className="show-grid">
                  <Col xs={12} md={12} className="viewPageTitle">
                    <div className="viewPageTitleYear">2018</div>
                    <div className="viewPageTitleMonth">QUATER 1 WINNERS</div>
                  </Col>

                  <Col xs={12} md={12}>
                    <Row className="show-grid">
                      {data.listEntries.items
                        .filter(entry => {
                          if (this.state.frequency === entry.Quater) {
                            return true
                          } else {
                            false
                          }
                        })
                        .map(entry => {
                          // console.log("dadasdsad", data.listEntries.items);
                          return (
                            <Col style={{ display: entry.Visible ? "block" : "none" }} xs={4} md={4} className="viewMargin" key={entry.EntryId}>
                              <div className="entryBlock" onClick={() => this.sendToReview(entry.EntryId)}>
                                <div>

                                  <div className="winnersNameBlock">

                                    <span className="winnersName lineHover">{entry.DesignerName}<span className="winnerSite">({entry.Site})</span></span>
                                  </div>
                                  <a className="imageView">
                                    <img
                                      src={entry.ThumbnailURL} />
                                  </a>
                                </div>

                              </div>
                              <div className="" onClick={() => this.sendToReview(entry.EntryId)}>
                                <span className="placementType" onClick={() => this.sendToReview(entry.EntryId)}>{entry.advertiser} | {entry.placement}</span>
                                <span className="points" onClick={() => this.sendToReview(entry.EntryId)}> {entry.Likes} <img src={AmazonLogo} /></span>
                              </div>
                            </Col>
                          );
                        }
                        )
                      }
                    </Row>
                  </Col>
                  <Col xs={12} md={12} className="viewPageBottomQuater">
                    <div className="">
                      <img src={lineHoz}></img>
                      {this.state.frequency == "Q1" ?
                        <span><img src={plusActive} onClick={() => this.frequencyChange("Q1")}></img>Q1</span> :
                        <span><img src={plus} onClick={() => this.frequencyChange("Q1")}></img>Q1</span>}
                      <img src={lineHoz}></img>
                      {this.state.frequency == "Q2" ?
                        <span><img src={plusActive} onClick={() => this.frequencyChange("Q2")}></img>Q2</span> :
                        <span><img src={plus} onClick={() => this.frequencyChange("Q2")}></img>Q2</span>}
                      <img src={lineHoz}></img>
                      {this.state.frequency == "Q3" ?
                        <span><img src={plusActive} onClick={() => this.frequencyChange("Q3")}></img>Q3</span> :
                        <span><img src={plus} onClick={() => this.frequencyChange("Q3")}></img>Q3</span>}
                      <img src={lineHoz}></img>
                      {this.state.frequency == "Q4" ?
                        <span><img src={plusActive} onClick={() => this.frequencyChange("Q4")}></img>Q4</span> :
                        <span><img src={plus} onClick={() => this.frequencyChange("Q4")}></img>Q4</span>}
                      <img src={lineHoz}></img>
                    </div>
                  </Col>
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
