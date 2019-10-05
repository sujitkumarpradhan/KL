import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import $ from "jquery";
import AmazonLogo from "../assets/amazonLogo.svg";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import DeviceLaptop from "../assets/laptop.svg";
import DeviceMobile from "../assets/mobile.svg";
import Devicetablet from "../assets/tablet.svg";
import reviewWork from "../assets/workForReview.jpg";
import animatedWS from "../assets/animatedWS.mp4";
import tabletP from "../assets/tablet-P.svg";
import tabletL from "../assets/tablet-L.svg";
import WS_L from "../assets/123_base_WS_L.jpg";
import WS_P from "../assets/123_base_WS_P.jpg";
import CarouselSlider from "react-carousel-slider";
import "react-responsive-carousel/lib/styles/carousel.css";
import { Carousel } from "react-responsive-carousel";

import { Button, Grid, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import md5 from "js-md5";

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
      managerAlias
      additionalInfo
      frequency
      banner1Url
      fireTab1Url
      fireTab2Url
      landingPage1Url
      landingPage2Url
      landingPage3Url
    }
  }
`;
const cookies = new Cookies();
//Crousal STAR =============================================================

// $(document).ready(function () {

//     setTimeout(
//         function () {
//             var slide = $('.slider-single');
//             var slideTotal = slide.length - 1;
//             var slideCurrent = -1;

//             function slideInitial() {
//                 slide.addClass('proactivede');
//                 setTimeout(function () {
//                     slideRight();
//                 }, 500);
//             }

//             function slideRight() {
//                 if (slideCurrent < slideTotal) {
//                     slideCurrent++;
//                 } else {
//                     slideCurrent = 0;
//                 }

//                 if (slideCurrent > 0) {
//                     var preactiveSlide = slide.eq(slideCurrent - 1);
//                 } else {
//                     var preactiveSlide = slide.eq(slideTotal);
//                 }
//                 var activeSlide = slide.eq(slideCurrent);
//                 if (slideCurrent < slideTotal) {
//                     var proactiveSlide = slide.eq(slideCurrent + 1);
//                 } else {
//                     var proactiveSlide = slide.eq(0);

//                 }

//                 slide.each(function () {
//                     var thisSlide = $(this);
//                     if (thisSlide.hasClass('preactivede')) {
//                         thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
//                     }
//                     if (thisSlide.hasClass('preactive')) {
//                         thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
//                     }
//                 });
//                 preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
//                 activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
//                 proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
//             }

//             function slideLeft() {
//                 if (slideCurrent > 0) {
//                     slideCurrent--;
//                 } else {
//                     slideCurrent = slideTotal;
//                 }

//                 if (slideCurrent < slideTotal) {
//                     var proactiveSlide = slide.eq(slideCurrent + 1);
//                 } else {
//                     var proactiveSlide = slide.eq(0);
//                 }
//                 var activeSlide = slide.eq(slideCurrent);
//                 if (slideCurrent > 0) {
//                     var preactiveSlide = slide.eq(slideCurrent - 1);
//                 } else {
//                     var preactiveSlide = slide.eq(slideTotal);
//                 }
//                 slide.each(function () {
//                     var thisSlide = $(this);
//                     if (thisSlide.hasClass('proactivede')) {
//                         thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
//                     }
//                     if (thisSlide.hasClass('proactive')) {
//                         thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
//                     }
//                 });
//                 preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
//                 activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
//                 proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
//             }
//             var left = $('.slider-left');
//             var right = $('.slider-right');
//             left.on('click', function () {
//                 slideLeft();
//             });
//             right.on('click', function () {
//                 slideRight();
//             });
//             console.log("loading=========================");
//             slideInitial();

//         }.bind(this),
//         2000
//     );

// });

//Crousal END =============================================================

class singleEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chkbox: false,
      pos1Img: 1,
      currdeg: 0,
      selectedDevice: "desktop",
      index: 0,
      direction: null,
      indicators: false,
      jsonData: {
        icons: {
          items: [
            {
              imgSrc: "https://...",
              name: "Niklas Koppernigk",
              des: "19 February 1473 – 24 May 1543"
            },
            {
              imgSrc: "https://...",
              name: "Galileo Galilei",
              des: "15 February 1564 – 8 January 1642"
            },
            {
              imgSrc: "https://...",
              name: "Michael Faraday",
              des: "22 September 1791 – 25 August 1867"
            },
            {
              imgSrc: "https://...",
              name: "Marie Curie",
              des: "7 November 1867 – 4 July 1934"
            },
            {
              imgSrc: "https://...",
              name: "Albert Einstein",
              des: "14 March 1879 – 18 April 1955"
            }
          ]
        }
      }
    };

    // this.makeAllBanner = this.makeAllBanner.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.sendToPhonetool = this.sendToPhonetool.bind(this);
    this.onclickLP = this.onclickLP.bind(this);
  }

  componentDidMount() {
    var tempAuth = md5(this.props.match.params.userAlias);
    if (tempAuth != cookies.get("loginAuth")) {
      this.props.history.push(`/`);
    }
  }

  

  onLoad(data) {
    setTimeout(
      function() {
        var slide = $(".slider-single");
        var slideTotal = slide.length - 1;
        var slideCurrent = -1;

        function slideInitial() {
          slide.addClass("proactivede");
          setTimeout(function() {
            slideRight();
          }, 500);
        }

        function slideRight() {
          if (slideCurrent < slideTotal) {
            slideCurrent++;
          } else {
            slideCurrent = 0;
          }

          if (slideCurrent > 0) {
            var preactiveSlide = slide.eq(slideCurrent - 1);
          } else {
            var preactiveSlide = slide.eq(slideTotal);
          }
          var activeSlide = slide.eq(slideCurrent);
          if (slideCurrent < slideTotal) {
            var proactiveSlide = slide.eq(slideCurrent + 1);
          } else {
            var proactiveSlide = slide.eq(0);
          }

          slide.each(function() {
            var thisSlide = $(this);
            if (thisSlide.hasClass("preactivede")) {
              thisSlide
                .removeClass("preactivede preactive active proactive")
                .addClass("proactivede");
            }
            if (thisSlide.hasClass("preactive")) {
              if (thisSlide.attr("id") == "laptop") {
                // console.log("Latoppreactive=========", thisSlide);
                var temp = $(".laptopLandingPageContainer-proactivede");
                temp
                  .removeClass("laptopLandingPageContainer-proactivede")
                  .addClass("laptopLandingPageContainer-preactive");
                temp = $(".laptopLandingPage-proactivede");
                temp
                  .removeClass("laptopLandingPage-proactivede")
                  .addClass("laptopLandingPage-preactive");

                $("#tablet").addClass("tabletTranslate-proactive");
                $("#mobile").addClass(
                  "mobileTranslate-preactive mobileTranslate-proactive"
                );
              } else if (thisSlide.attr("id") == "tablet") {
                // console.log("Tabletpreactive=========", thisSlide);
                var temp = $(".tabletLandingPageContainer-preactive");
                temp
                  .removeClass("tabletLandingPageContainer-preactive")
                  .addClass("tabletLandingPageContainer-proactive");
                temp = $(".tabletLandingPage-preactive");
                temp
                  .removeClass("tabletLandingPage-preactive")
                  .addClass("tabletLandingPage-proactive");

                // $('#tablet').removeClass('tabletTranslate-proactive');
                // $('#mobile').removeClass('mobileTranslate-preactive');
              } else if (thisSlide.attr("id") == "mobile") {
                // console.log("Mobilepreactive=========", thisSlide);
                var temp = $(".mobileLandingPageContainer-preactive");
                temp
                  .removeClass("mobileLandingPageContainer-preactive")
                  .addClass("mobileLandingPageContainer-proactive");
                temp = $(".mobileLandingPage-preactive");
                temp
                  .removeClass("mobileLandingPage-preactive")
                  .addClass("mobileLandingPage-proactive");
                $("#tablet").removeClass("tabletTranslate-proactive");
                $("#mobile")
                  .removeClass("mobileTranslate-preactive")
                  .addClass("mobileTranslate-proactive");
              }
              thisSlide
                .removeClass("preactive active proactive proactivede")
                .addClass("preactivede");
            }

            if (
              thisSlide.hasClass("proactive") &&
              thisSlide.attr("id") == "laptop"
            ) {
              // console.log("Laptopproactive=========", thisSlide);
              var temp = $(".laptopLandingPageContainer-preactive");
              temp
                .removeClass("laptopLandingPageContainer-preactive")
                .addClass("laptopLandingPageContainer");
              temp = $(".laptopLandingPage-preactive");
              temp
                .removeClass("laptopLandingPage-preactive")
                .addClass("laptopLandingPage");
              $("#tablet").addClass("tabletTranslate-proactive");
              $("#mobile").addClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            } else if (
              thisSlide.hasClass("proactive") &&
              thisSlide.attr("id") == "tablet"
            ) {
              // console.log("Tabletproactive=========", thisSlide);
              var temp = $(".tabletLandingPageContainer-proactive");
              temp
                .removeClass("tabletLandingPageContainer-proactive")
                .addClass("tabletLandingPageContainer");
              temp = $(".tabletLandingPage-proactive");
              temp
                .removeClass("tabletLandingPage-proactive")
                .addClass("tabletLandingPage");
              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass("mobileTranslate-preactive");
            } else if (
              thisSlide.hasClass("proactive") &&
              thisSlide.attr("id") == "mobile"
            ) {
              // console.log("Mobileproactive=========", thisSlide);
              var temp = $(".mobileLandingPageContainer-proactive");
              temp
                .removeClass("mobileLandingPageContainer-proactive")
                .addClass("mobileLandingPageContainer");
              temp = $(".mobileLandingPage-proactive");
              temp
                .removeClass("mobileLandingPage-proactive")
                .addClass("mobileLandingPage");
              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            }

            if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "laptop"
            ) {
              // console.log("LAptopactive=========", thisSlide);
              var temp = $(".laptopLandingPageContainer");
              temp
                .removeClass("laptopLandingPageContainer")
                .addClass("laptopLandingPageContainer-proactivede");
              temp = $(".laptopLandingPage");
              temp
                .removeClass("laptopLandingPage")
                .addClass("laptopLandingPage-proactivede");
              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass("mobileTranslate-preactive");
            } else if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "tablet"
            ) {
              // console.log("Tabletactive=========", thisSlide);
              var temp = $(".tabletLandingPageContainer");
              temp
                .removeClass("tabletLandingPageContainer")
                .addClass("tabletLandingPageContainer-preactive");
              temp = $(".tabletLandingPage");
              temp
                .removeClass("tabletLandingPage")
                .addClass("tabletLandingPage-preactive");
              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            } else if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "mobile"
            ) {
              // console.log("Mobileactive=========", thisSlide);
              var temp = $(".mobileLandingPageContainer");
              temp
                .removeClass("mobileLandingPageContainer")
                .addClass("mobileLandingPageContainer-preactive");
              temp = $(".mobileLandingPage");
              temp
                .removeClass("mobileLandingPage")
                .addClass("mobileLandingPage-preactive");

              // $('#tablet').removeClass('tabletTranslate-proactive');
              $("#mobile").removeClass("mobileTranslate-proactive");
            }
          });
          preactiveSlide
            .removeClass("preactivede active proactive proactivede")
            .addClass("preactive");
          activeSlide
            .removeClass("preactivede preactive proactive proactivede")
            .addClass("active");
          proactiveSlide
            .removeClass("preactivede preactive active proactivede")
            .addClass("proactive");
        }

        function slideLeft() {
          if (slideCurrent > 0) {
            slideCurrent--;
          } else {
            slideCurrent = slideTotal;
          }

          if (slideCurrent < slideTotal) {
            var proactiveSlide = slide.eq(slideCurrent + 1);
          } else {
            var proactiveSlide = slide.eq(0);
          }
          var activeSlide = slide.eq(slideCurrent);
          if (slideCurrent > 0) {
            var preactiveSlide = slide.eq(slideCurrent - 1);
          } else {
            var preactiveSlide = slide.eq(slideTotal);
          }
          slide.each(function() {
            var thisSlide = $(this);
            if (thisSlide.hasClass("proactivede")) {
              thisSlide
                .removeClass("preactive active proactive proactivede")
                .addClass("preactivede");
            }
            if (thisSlide.hasClass("proactive")) {
              if (thisSlide.attr("id") == "laptop") {
                console.log("Latopproactive=========", thisSlide);
                var temp = $(".laptopLandingPageContainer-preactive");
                temp
                  .removeClass("laptopLandingPageContainer-preactive")
                  .addClass("laptopLandingPageContainer-proactivede");
                temp = $(".laptopLandingPage-preactive");
                temp
                  .removeClass("laptopLandingPage-preactive")
                  .addClass("laptopLandingPage-proactivede");

                $("#tablet").removeClass("tabletTranslate-proactive");
                $("#mobile").removeClass(
                  "mobileTranslate-preactive mobileTranslate-proactive"
                );
              } else if (thisSlide.attr("id") == "tablet") {
                console.log("Tabletproactive=========", thisSlide);
                var temp = $(".tabletLandingPageContainer-proactive");
                temp
                  .removeClass("tabletLandingPageContainer-proactive")
                  .addClass("tabletLandingPageContainer-preactive");
                temp = $(".tabletLandingPage-proactive");
                temp
                  .removeClass("tabletLandingPage-proactive")
                  .addClass("tabletLandingPage-preactive");

                $("#tablet").removeClass("tabletTranslate-proactive");
                $("#mobile").removeClass(
                  "mobileTranslate-preactive mobileTranslate-proactive"
                );
              } else if (thisSlide.attr("id") == "mobile") {
                console.log("Mobileproactive=========", thisSlide);
                var temp = $(".mobileLandingPageContainer-proactive");
                temp
                  .removeClass("mobileLandingPageContainer-proactive")
                  .addClass("mobileLandingPageContainer-preactive");
                temp = $(".mobileLandingPage-proactive");
                temp
                  .removeClass("mobileLandingPage-proactive")
                  .addClass("mobileLandingPage-preactive");

                // $('#tablet').addClass('tabletTranslate-proactive');
                // $('#mobile').addClass('mobileTranslate-preactive');
              }

              thisSlide
                .removeClass("preactivede preactive active proactive")
                .addClass("proactivede");
            }

            if (
              thisSlide.hasClass("preactive") &&
              thisSlide.attr("id") == "laptop"
            ) {
              console.log("Laptoppreactive=========", thisSlide);
              var temp = $(".laptopLandingPageContainer-proactivede");
              temp
                .removeClass("laptopLandingPageContainer-proactivede")
                .addClass("laptopLandingPageContainer");
              temp = $(".laptopLandingPage-proactivede");
              temp
                .removeClass("laptopLandingPage-proactivede")
                .addClass("laptopLandingPage");
              $("#tablet").addClass("tabletTranslate-proactive");
              $("#mobile")
                .addClass("mobileTranslate-preactive")
                .removeClass("mobileTranslate-proactive");
            } else if (
              thisSlide.hasClass("preactive") &&
              thisSlide.attr("id") == "tablet"
            ) {
              console.log("Tabletpreactive=========", thisSlide);
              var temp = $(".tabletLandingPageContainer-preactive");
              temp
                .removeClass("tabletLandingPageContainer-preactive")
                .addClass("tabletLandingPageContainer");
              temp = $(".tabletLandingPage-preactive");
              temp
                .removeClass("tabletLandingPage-preactive")
                .addClass("tabletLandingPage");
              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            } else if (
              thisSlide.hasClass("preactive") &&
              thisSlide.attr("id") == "mobile"
            ) {
              console.log("Mobilepreactive=========", thisSlide);
              var temp = $(".mobileLandingPageContainer-preactive");
              temp
                .removeClass("mobileLandingPageContainer-preactive")
                .addClass("mobileLandingPageContainer");
              temp = $(".mobileLandingPage-preactive");
              temp
                .removeClass("mobileLandingPage-preactive")
                .addClass("mobileLandingPage");

              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            }

            if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "laptop"
            ) {
              console.log("LatopActive=========", thisSlide);
              var temp = $(".laptopLandingPageContainer");
              temp
                .removeClass("laptopLandingPageContainer")
                .addClass("laptopLandingPageContainer-preactive");
              temp = $(".laptopLandingPage");
              temp
                .removeClass("laptopLandingPage")
                .addClass("laptopLandingPage-proactivede");

              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile").removeClass(
                "mobileTranslate-preactive mobileTranslate-proactive"
              );
            } else if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "tablet"
            ) {
              console.log("TableActive=========", thisSlide);
              var temp = $(".tabletLandingPageContainer");
              temp
                .removeClass("tabletLandingPageContainer")
                .addClass("tabletLandingPageContainer-proactive");
              temp = $(".tabletLandingPage");
              temp
                .removeClass("tabletLandingPage")
                .addClass("tabletLandingPage-proactive");

              // $('#tablet').addClass('tabletTranslate-proactive');
              // $('#mobile').addClass('mobileTranslate-preactive');
            } else if (
              thisSlide.hasClass("active") &&
              thisSlide.attr("id") == "mobile"
            ) {
              console.log("MobileActive=========", thisSlide);
              var temp = $(".mobileLandingPageContainer");
              temp
                .removeClass("mobileLandingPageContainer")
                .addClass("mobileLandingPageContainer-proactive");
              temp = $(".mobileLandingPage");
              temp
                .removeClass("mobileLandingPage")
                .addClass("mobileLandingPage-proactive");

              $("#tablet").removeClass("tabletTranslate-proactive");
              $("#mobile")
                .removeClass("mobileTranslate-preactive")
                .addClass("mobileTranslate-proactive");
            }
          });
          preactiveSlide
            .removeClass("preactivede active proactive proactivede")
            .addClass("preactive");
          activeSlide
            .removeClass("preactivede preactive proactive proactivede")
            .addClass("active");
          proactiveSlide
            .removeClass("preactivede preactive active proactivede")
            .addClass("proactive");
        }
        var left = $(".slider-left");
        var right = $(".slider-right");
        left.on("click", function() {
          slideLeft();
        });
        right.on("click", function() {
          slideRight();
        });
        slideInitial();
      }.bind(this),
      1000
    );
  }

  updateSmile(updateEntry, entry) {
    // console.log(entry.getEntry.Likes + 1, this.props.match.params.id);
    updateEntry({
      variables: {
        EntryId: this.props.match.params.id,
        Likes: entry.getEntry.Likes + 1
      }
    });
  }

  sendToPhonetool(e, alias) {
    window.open("https://phonetool.amazon.com/users/" + alias, "_blank");
  }

  onclickLP(e) {
    window.open(
      "https://www.amazon.com/adlp/previewpage?pageId=edebc37d-0662-484d-abc3-7d0662784d49",
      "_blank"
    );

    console.log("==========================LP CLicked");
  }

  render() {
    const { index, direction } = this.state;
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
          mutation updateEntry($EntryId: ID!, $Likes: Int) {
            updateEntry(input: { EntryId: $EntryId, Likes: $Likes }) {
              EntryId
            }
          }
        `}
        // onCompleted={data => {
        //   window.location.reload(true);
        // }}
      >
        {(updateEntry, { loading, data }) => {
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
                  // window.location.reload(true);
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
                        <Col
                          xs={9}
                          md={9}
                          className="workImageHolder padding-zero"
                        >
                          {entry.getEntry.placement == "Landing Page" ? (
                            <Carousel
                              infiniteLoop={true}
                              showStatus={false}
                              showIndicators={false}
                              showThumbs={false}
                              swipeable={true}
                              useKeyboardArrows={true}
                            >
                              <div className="reflection">
                                <div className="note">
                                  Note: This is in pdf format. Please scroll for
                                  more pages.
                                </div>

                                <img
                                  className="lpDesktopImg"
                                  src={DeviceLaptop}
                                />
                                <div
                                  onClick={e => this.onclickLP(e)}
                                  className="lpLaptopContaner"
                                >
                                  <img
                                    className="lpLaptop"
                                    src={entry.getEntry.landingPage1Url}
                                  />
                                </div>
                              </div>
                              <div className="reflection">
                                <div className="note">
                                  Note: This is in pdf format. Please scroll for
                                  more pages.
                                </div>
                                <img
                                  className="lpMobileImg"
                                  src={DeviceMobile}
                                />
                                <div
                                  onClick={e => this.onclickLP(e)}
                                  className="lpMobileContaner"
                                >
                                  <img
                                    className="lpMobile"
                                    src={entry.getEntry.landingPage2Url}
                                  />
                                </div>
                              </div>
                              <div className="reflectionTabletUser">
                                <div className="note">
                                  Note: This is in pdf format. Please scroll for
                                  more pages.
                                </div>
                                <img className="lpTabletImg" src={tabletP} />

                                <div
                                  onClick={e => this.onclickLP(e)}
                                  className="lpTabletContaner"
                                >
                                  <img
                                    className="lpTablet"
                                    src={entry.getEntry.landingPage3Url}
                                  />
                                </div>
                              </div>
                            </Carousel>
                          ) : (
                           
                            <div>
                              {entry.getEntry.placement == "CrossScreen" ||
                              entry.getEntry.placement == "CrossScreen DEA" ||
                              entry.getEntry.placement == "AAP Static" ||
                              entry.getEntry.placement == "AAP DEA" ||
                              entry.getEntry.placement ==
                                "Interstitial/Encore" ? (
                                <Col
                                  xs={12}
                                  md={12}
                                  className="staticUnitBlock"
                                >
                                  <img
                                    className="width-100 reflection"
                                    src={entry.getEntry.banner1Url}
                                    alt="2"
                                  />
                                </Col>
                              ) : (
                                <div>
                                  {entry.getEntry.placement == "Fire Tablet" ? (
                                    <Col xs={12} md={12}>
                                      <Row className="tabletContent show-grid">
                                        <Col
                                          xs={7}
                                          md={7}
                                          className="tabletL-reflect"
                                        >
                                          <img src={tabletL} />
                                          <img
                                            className="tabletP-image"
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
                                            className="tabletL-image"
                                            src={entry.getEntry.fireTab2Url}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  ) : (
                                    <div>
                                      {entry.getEntry.placement ==
                                      "Animated wake screen" ? (
                                        <div>
                                          <video width="100%" autoPlay loop>
                                            <source
                                              src={entry.getEntry.banner1Url}
                                              type="video/mp4"
                                            />
                                            {/* <source src="movie.ogg" type="video/ogg" /> */}
                                          </video>
                                        </div>
                                      ) : (
                                        <div>
                                          <div className="note">
                                            Note: This is in pdf format. Please
                                            scroll for more pages.
                                          </div>
                                          <embed
                                            className="cursorPoint"
                                            src={`${entry.getEntry.banner1Url}#scrollbar=1&toolbar=0&navpanes=1`}
                                            width="100%"
                                            height="500px"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )
                              }
                            </div>
                          )}
                        </Col>

                        <Col xs={3} md={3} className="copyHolder">
                          <Row className="show-grid copyUserDetails">
                            <Col xs={12} md={12} className="nameUser">
                              {entry.getEntry.DesignerName}{" "}
                            </Col>

                            <Col
                              xs={12}
                              md={12}
                              className="marginBottom nameUser margintext"
                            >
                              <span
                                onClick={e =>
                                  this.sendToPhonetool(
                                    e,
                                    entry.getEntry.nomineeAlias
                                  )
                                }
                                href={`https://phonetool.amazon.com/users/${
                                  entry.getEntry.nomineeAlias
                                }`}
                                target="_blank"
                                className="userAliasClick userAlias"
                              >
                                @{entry.getEntry.nomineeAlias}
                              </span>
                            </Col>
                            <Col
                              xs={12}
                              md={12}
                              className="spacingLine margintext"
                            >
                              <span className="font_weight">Advertiser:</span>{" "}
                              {entry.getEntry.advertiser}
                            </Col>

                            <Col
                              xs={12}
                              md={12}
                              className="spacingLine margintext"
                            >
                              <span className="font_weight">
                                Placement type:
                              </span>{" "}
                              {entry.getEntry.placement}
                            </Col>

                            <Col
                              xs={12}
                              md={12}
                              className="margintext copyCreativeDis"
                            >
                              <span className="font_weight">Description:</span>{" "}
                              {entry.getEntry.description}
                            </Col>

                            <Col xs={7} md={7} className="margintext">
                              {/* <div className="buttonBlock"> */}
                              <Button
                                className="buttonClickSmileSingle"
                                onClick={async () => {
                                  const response = await this.updateSmile(
                                    updateEntry,
                                    entry
                                  );
                                }}
                              >
                                Smile for the design
                              </Button>
                              {/* </div> */}
                            </Col>
                            <Col xs={2} md={2} />
                            <Col xs={3} md={3} className=" smiles">
                              <span className="">
                                {entry.getEntry.Likes}{" "}
                                <img
                                  className="DetailsLogoSize"
                                  src={AmazonLogo}
                                />
                              </span>
                              {/* Total smiles -{" "}
                                                            {
                                                                entry.getEntry
                                                                    .Likes
                                                            } */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Grid>
                  );
                }
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}
export default withRouter(singleEntry);
