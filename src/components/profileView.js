import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import AmazonLogo from "../assets/amazonLogo.svg";
import plus from "../assets/plus.svg";
import { Grid, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import md5 from "js-md5";

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
      password
      userLevel
    }
  }
`;

const GET_UserEnter = gql`
  query ListEntry {
    listEntries(filter: { nomineeAlias: { contains: "sujpradh" } }) {
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
        managersStatus
      }
    }
  }
`;

const cookies = new Cookies();

class profileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickAllWinners = this.clickAllWinners.bind(this);
    this.sendToReview = this.sendToReview.bind(this);

    // console.log(this.props.match.params.userAlias);
  }


  sendToReview(alias, id) {
    console.log(id);
    this.props.history.push("/entry/" + alias + "/" + id);
  }


  clickAllWinners() {
    this.props.history.push(
      `/discover/${Math.random()}/${this.props.match.params.userAlias}`
    );
  }

  componentDidMount() {
    var tempAuth = md5(this.props.match.params.userAlias);
    if (tempAuth != cookies.get("loginAuth")) {
      this.props.history.push(`/`);
    }
  }

  render() {
    return (
      <Query
        query={GET_User}
        variables={{
          alias: this.props.match.params.userAlias
        }}
      >
        {({ loading: loadingOne, error, data: dataOne }) => {
          if (error) {
            console.log(error);
            return <div>Some error occurred.</div>;
          }

          if (loadingOne) {
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
                query={GET_UserEnter}
                variables={{
                  alias: this.props.match.params.userAlias
                }}
              >
                {({ loading: loadingTwo, error, data: dataTwo }) => {
                  if (error) {
                    console.log(error);
                    return <div>Some error occurred.</div>;
                  }

                  if (loadingTwo || loadingOne) {
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
                    // console.log("Data==========", dataOne, dataTwo);
                    return (
                      <Grid>
                        <Row className="galleryBlock show-grid">
                          <Col xs={4} md={4} className="profileDivision">
                            <Row className="show-grid copyUserDetailsProfile">
                              <Col
                                xs={12}
                                md={12}
                                className="margintextProfile"
                              >
                                <Row className="show-grid">
                                  <Col xs={12} md={12} className="nameUser">
                                    {dataOne.getUser.fullname}{" "}
                                    <span className="roleProfile">
                                      ({dataOne.getUser.role})
                                    </span>
                                  </Col>
                                </Row>
                              </Col>

                              <Col
                                xs={12}
                                md={12}
                                className="margintextProfile"
                              >
                                <span className="titleProfile">Site:</span>{" "}
                                {dataOne.getUser.site}
                              </Col>

                              <Col
                                xs={12}
                                md={12}
                                className="margintextProfile"
                              >
                                <span className="titleProfile">Team:</span>{" "}
                                {dataOne.getUser.team}
                              </Col>

                              <Col
                                xs={12}
                                md={12}
                                className="copyCreativeDisProfile"
                              >
                                <span className="titleProfile">About:</span>{" "}
                                {dataOne.getUser.about}
                              </Col>

                              <Col
                                xs={12}
                                md={12}
                                className="margintextProfile"
                              >
                                <span className="pointsProfile">
                                  {" "}
                                  40 <img src={AmazonLogo} />
                                </span>
                              </Col>
                            </Row>
                          </Col>

                          <Col xs={8} md={8}>
                            <Row className="show-grid">
                              <Col xs={12} md={12}>
                                <Row className="show-grid copyUserDetailsProfile">
                                  {/* {dataTwo.listEntries.items.map(
                                    (entry, index) => {
                                      return (
                                        <Col
                                          key={index}
                                          xs={6}
                                          md={6}
                                          className="viewMargin"
                                        >
                                          <div
                                            className="entryBlock"
                                            onClick={e => {
                                              this.props.history.push(
                                                "/entry/" +
                                                  this.props.match.params
                                                    .userAlias +
                                                  "/" +
                                                  entry.EntryId
                                              );
                                            }}
                                          >
                                            <div>
                                              <div
                                                className="winnersNameBlock"
                                                onClick={e => {
                                                  this.props.history.push(
                                                    "/entry/" +
                                                      this.props.match.params
                                                        .userAlias +
                                                      "/" +
                                                      entry.EntryId
                                                  );
                                                }}
                                              >
                                                <span className="winnersName lineHover">
                                                  Q1 Winner
                                                </span>
                                              </div>
                                              <a className="imageView">
                                                <img src={entry.ThumbnailURL} />
                                              </a>
                                            </div>
                                          </div>
                                          <div className="">
                                            <span className="placementType">
                                              {entry.advertiser} |{" "}
                                              {entry.placement}
                                            </span>
                                            <span className="points">
                                              {" "}
                                              {entry.Likes}{" "}
                                              <img src={AmazonLogo} />
                                            </span>
                                          </div>
                                        </Col>
                                      );
                                    }
                                  )} */}

                                  <Col xs={6} md={6} className="viewMargin">
                                    <div
                                      className="entryBlock"
                                      onClick={() =>
                                        this.sendToReview(
                                          this.props.match.params.userAlias,
                                          "72e99799-2efc-4d84-bab6-9700d48e573d"
                                        )
                                      }
                                    >
                                      <div>
                                        <div className="winnersNameBlock">
                                          <span className="winnersName lineHover">
                                            Q1 Winner
                                          </span>
                                        </div>
                                        <a className="imageView">
                                          <img src="https://s3-ap-northeast-1.amazonaws.com/l9-rewards-assets/Desktop/minecraft-thumbnail5.jpg" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="">
                                      <span className="placementType">
                                        Plato Media | AAP Static
                                      </span>
                                      <span className="points">
                                        {" "}
                                        30 <img src={AmazonLogo} />
                                      </span>
                                    </div>
                                  </Col>

                                  <Col
                                    xs={6}
                                    md={6}
                                    className="grayScale viewMargin"
                                  >
                                    <div
                                      className="entryBlock"
                                      onClick={() =>
                                        this.sendToReview(
                                          this.props.match.params.userAlias,
                                          "72e99799-2efc-4d84-bab6-9700d48e573d"
                                        )
                                      }
                                    >
                                      <div>
                                        <div className="winnersNameBlock" />
                                        <a className="imageView">
                                          <img src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="">
                                      <span className="placementType">
                                        Dell | Fire TV
                                      </span>
                                      <span
                                        className="points"
                                        style={{ visibility: "hidden" }}
                                      >
                                        {" "}
                                        30 <img src={AmazonLogo} />
                                      </span>
                                    </div>
                                  </Col>

                                  <Col
                                    xs={6}
                                    md={6}
                                    className="grayScale viewMargin"
                                  >
                                    <div
                                      className="entryBlock"
                                      onClick={() =>
                                        this.sendToReview(
                                          this.props.match.params.userAlias,
                                          "72e99799-2efc-4d84-bab6-9700d48e573d"
                                        )
                                      }
                                    >
                                      <div>
                                        <div className="winnersNameBlock">
                                          <span className="submittedName">
                                            UNDER REVIEW
                                          </span>
                                        </div>
                                        <a className="imageView">
                                          <img src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
                                        </a>
                                      </div>
                                    </div>
                                    <div className="">
                                      <span className="placementType">
                                        Dell | Fire TV
                                      </span>
                                      <span
                                        className="points"
                                        style={{ visibility: "hidden" }}
                                      >
                                        {" "}
                                        30 <img src={AmazonLogo} />
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col xs={4} md={4} />

                              <Col
                                xs={4}
                                md={4}
                                className="profileAllWinners"
                                onClick={this.clickAllWinners}
                              >
                                <img src={plus} /> View all winners
                              </Col>
                              <Col xs={4} md={4} />
                            </Row>
                          </Col>
                        </Row>
                      </Grid>
                    );
                  }
                }}
              </Query>
            );
          }
        }}
      </Query>
    );
  }
}
//   render() {
//     return (
//       <Query
//         query={GET_User}
//         variables={{
//           alias: this.props.match.params.userAlias
//         }}
//       >
//         {" "}
//         {({ loading, error, data }) => {
//           if (error) {
//           }
//           if (loading) {
//           } else {
//             return (
//   <Grid>
//     <Row className="galleryBlock show-grid">
//       <Col xs={4} md={4} className="profileDivision">
//         <Row className="show-grid copyUserDetailsProfile">
//           <Col
//             xs={12}
//             md={12}
//             className="nameUser margintextProfile"
//           >
//             Nadeem Sheikh
//           </Col>

//           <Col xs={12} md={12} className="margintextProfile">
//             Site : BLR
//           </Col>

//           <Col xs={12} md={12} className="copyCreativeDisProfile">
//             About: Lorem ipsum, this is a dummy copyfor the campaign
//             description. This is a dummy copy. Lorem ipsum, this is
//             a dummy copyfor the campaign description. This is a
//             dummy copy. Lorem ipsum, this is a dummy copyfor the
//             campaign description. This is a dummy copy.
//           </Col>

//           <Col xs={12} md={12} className="margintextProfile">
//             Total smiles - 65
//           </Col>
//         </Row>
//       </Col>

//       <Col xs={8} md={8}>
//         <Row className="show-grid">
//           <Col xs={12} md={12}>
//             <Row className="show-grid copyUserDetailsProfile">
//               {/* <Col xs={12} md={12} className="margintextProfile">
//                         Q1 2018      <span className="profileDescription">HP US | Crossscreen</span>
//                     </Col> */}

//               <Col xs={6} md={6} className="viewMargin">
//                 <div className="entryBlock">
//                   <div>
//                     <div className="winnersNameBlock">
//                       <span className="winnersName lineHover">
//                         Selected
//                       </span>
//                     </div>
//                     <a className="imageView">
//                       <img src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="">
//                   <span className="placementType">
//                     Samsung | Fire TV
//                   </span>
//                   <span className="points">
//                     {" "}
//                     40 <img src={AmazonLogo} />
//                   </span>
//                 </div>
//               </Col>

//               <Col xs={6} md={6} className="grayScale viewMargin">
//                 <div className="entryBlock">
//                   <div>
//                     <div className="winnersNameBlock" />
//                     <a className="imageView">
//                       <img src="https://webdesignersdream.files.wordpress.com/2016/02/minecraft-thumbnail2.jpg?w=1000&h=563" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="">
//                   <span className="placementType">
//                     Samsung | Fire TV
//                   </span>
//                 </div>
//               </Col>

//             </Row>
//           </Col>

//           <Col
//             xs={12}
//             md={12}
//             className="profileAllWinners"
//             onClick={this.clickAllWinners}
//           >
//             <img src={plus} /> View all winners
//           </Col>
//         </Row>
//       </Col>
//     </Row>
//   </Grid>
//             );
//           }
//         }}
//       </Query>
//     );
//   }
// }
export default withRouter(profileView);
