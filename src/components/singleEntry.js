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


import {
    Button,
    Grid,
    Row,
    Col,
    Carousel
} from "react-bootstrap";
import { compose } from "async";

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
            jsonData:
            {
                "icons": {

                    "items": [
                        {
                            "imgSrc": "https://...",
                            "name": "Niklas Koppernigk",
                            "des": "19 February 1473 – 24 May 1543"
                        },
                        {
                            "imgSrc": "https://...",
                            "name": "Galileo Galilei",
                            "des": "15 February 1564 – 8 January 1642"
                        },
                        {
                            "imgSrc": "https://...",
                            "name": "Michael Faraday",
                            "des": "22 September 1791 – 25 August 1867"
                        },
                        {
                            "imgSrc": "https://...",
                            "name": "Marie Curie",
                            "des": "7 November 1867 – 4 July 1934"
                        },
                        {
                            "imgSrc": "https://...",
                            "name": "Albert Einstein",
                            "des": "14 March 1879 – 18 April 1955"
                        }
                    ]
                }
            }
        }

        // this.makeAllBanner = this.makeAllBanner.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount() {

    }

    // makeAllBanner(data) {
    //     var TempjsonData = {
    //         "banners": {

    //             "items": [
    //                 {
    //                     "imgSrc": data.getEntry.banner1Url,
    //                     "size": data.getEntry.banner1Size
    //                 },
    //                 {
    //                     "imgSrc": data.getEntry.banner1Url,
    //                     "size": data.getEntry.banner2Size
    //                 },
    //                 {
    //                     "imgSrc": data.getEntry.banner1Url,
    //                     "size": data.getEntry.banner3Size
    //                 }
    //             ]
    //         }
    //     };

    //     this.setState({
    //         jsonData: TempjsonData
    //     }
    //     )


    //     console.log("Banner DATA-----------------", this.state.jsonData);
    //     // this.fetchData();

    // }


    onLoad(data) {
        // console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
        // console.log("=========", data);
        setTimeout(
            function () {
                var slide = $('.slider-single');
                var slideTotal = slide.length - 1;
                var slideCurrent = -1;

                function slideInitial() {
                    slide.addClass('proactivede');
                    setTimeout(function () {
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

                    slide.each(function () {
                        var thisSlide = $(this);
                        if (thisSlide.hasClass('preactivede')) {
                            thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
                        }
                        if (thisSlide.hasClass('preactive')) {
                            if (thisSlide.attr('id') == "laptop") {
                                // console.log("Latoppreactive=========", thisSlide);
                                var temp = $('.laptopLandingPageContainer-proactivede');
                                temp.removeClass('laptopLandingPageContainer-proactivede').addClass('laptopLandingPageContainer-preactive');
                                temp = $('.laptopLandingPage-proactivede');
                                temp.removeClass('laptopLandingPage-proactivede').addClass('laptopLandingPage-preactive');

                                $('#tablet').addClass('tabletTranslate-proactive');
                                $('#mobile').addClass('mobileTranslate-preactive mobileTranslate-proactive');
                            } else if (thisSlide.attr('id') == "tablet") {
                                // console.log("Tabletpreactive=========", thisSlide);
                                var temp = $('.tabletLandingPageContainer-preactive');
                                temp.removeClass('tabletLandingPageContainer-preactive').addClass('tabletLandingPageContainer-proactive');
                                temp = $('.tabletLandingPage-preactive');
                                temp.removeClass('tabletLandingPage-preactive').addClass('tabletLandingPage-proactive');

                                // $('#tablet').removeClass('tabletTranslate-proactive');
                                // $('#mobile').removeClass('mobileTranslate-preactive');
                            } else if (thisSlide.attr('id') == "mobile") {
                                // console.log("Mobilepreactive=========", thisSlide);
                                var temp = $('.mobileLandingPageContainer-preactive');
                                temp.removeClass('mobileLandingPageContainer-preactive').addClass('mobileLandingPageContainer-proactive');
                                temp = $('.mobileLandingPage-preactive');
                                temp.removeClass('mobileLandingPage-preactive').addClass('mobileLandingPage-proactive');
                                $('#tablet').removeClass('tabletTranslate-proactive');
                                $('#mobile').removeClass('mobileTranslate-preactive').addClass('mobileTranslate-proactive');
                            }
                            thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
                        }

                        if (thisSlide.hasClass('proactive') && thisSlide.attr('id') == "laptop") {
                            // console.log("Laptopproactive=========", thisSlide);
                            var temp = $('.laptopLandingPageContainer-preactive');
                            temp.removeClass('laptopLandingPageContainer-preactive').addClass('laptopLandingPageContainer');
                            temp = $('.laptopLandingPage-preactive');
                            temp.removeClass('laptopLandingPage-preactive').addClass('laptopLandingPage');
                            $('#tablet').addClass('tabletTranslate-proactive');
                            $('#mobile').addClass('mobileTranslate-preactive mobileTranslate-proactive');
                        } else if (thisSlide.hasClass('proactive') && thisSlide.attr('id') == "tablet") {
                            // console.log("Tabletproactive=========", thisSlide);
                            var temp = $('.tabletLandingPageContainer-proactive');
                            temp.removeClass('tabletLandingPageContainer-proactive').addClass('tabletLandingPageContainer');
                            temp = $('.tabletLandingPage-proactive');
                            temp.removeClass('tabletLandingPage-proactive').addClass('tabletLandingPage');
                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive');
                        } else if (thisSlide.hasClass('proactive') && thisSlide.attr('id') == "mobile") {
                            // console.log("Mobileproactive=========", thisSlide);
                            var temp = $('.mobileLandingPageContainer-proactive');
                            temp.removeClass('mobileLandingPageContainer-proactive').addClass('mobileLandingPageContainer');
                            temp = $('.mobileLandingPage-proactive');
                            temp.removeClass('mobileLandingPage-proactive').addClass('mobileLandingPage');
                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                        }

                        if (thisSlide.hasClass('active') && thisSlide.attr('id') == "laptop") {
                            // console.log("LAptopactive=========", thisSlide);
                            var temp = $('.laptopLandingPageContainer');
                            temp.removeClass('laptopLandingPageContainer').addClass('laptopLandingPageContainer-proactivede');
                            temp = $('.laptopLandingPage');
                            temp.removeClass('laptopLandingPage').addClass('laptopLandingPage-proactivede');
                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive');
                        } else if (thisSlide.hasClass('active') && thisSlide.attr('id') == "tablet") {
                            // console.log("Tabletactive=========", thisSlide);
                            var temp = $('.tabletLandingPageContainer');
                            temp.removeClass('tabletLandingPageContainer').addClass('tabletLandingPageContainer-preactive');
                            temp = $('.tabletLandingPage');
                            temp.removeClass('tabletLandingPage').addClass('tabletLandingPage-preactive');
                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                        } else if (thisSlide.hasClass('active') && thisSlide.attr('id') == "mobile") {
                            // console.log("Mobileactive=========", thisSlide);
                            var temp = $('.mobileLandingPageContainer');
                            temp.removeClass('mobileLandingPageContainer').addClass('mobileLandingPageContainer-preactive');
                            temp = $('.mobileLandingPage');
                            temp.removeClass('mobileLandingPage').addClass('mobileLandingPage-preactive');

                            // $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-proactive');
                        }

                    });
                    preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
                    activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
                    proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
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
                    slide.each(function () {
                        var thisSlide = $(this);
                        if (thisSlide.hasClass('proactivede')) {
                            thisSlide.removeClass('preactive active proactive proactivede').addClass('preactivede');
                        }
                        if (thisSlide.hasClass('proactive')) {
                            if (thisSlide.attr('id') == "laptop") {
                                console.log("Latopproactive=========", thisSlide);
                                var temp = $('.laptopLandingPageContainer-preactive');
                                temp.removeClass('laptopLandingPageContainer-preactive').addClass('laptopLandingPageContainer-proactivede');
                                temp = $('.laptopLandingPage-preactive');
                                temp.removeClass('laptopLandingPage-preactive').addClass('laptopLandingPage-proactivede');

                                $('#tablet').removeClass('tabletTranslate-proactive');
                                $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                            } else if (thisSlide.attr('id') == "tablet") {
                                console.log("Tabletproactive=========", thisSlide);
                                var temp = $('.tabletLandingPageContainer-proactive');
                                temp.removeClass('tabletLandingPageContainer-proactive').addClass('tabletLandingPageContainer-preactive');
                                temp = $('.tabletLandingPage-proactive');
                                temp.removeClass('tabletLandingPage-proactive').addClass('tabletLandingPage-preactive');

                                $('#tablet').removeClass('tabletTranslate-proactive');
                                $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                            } else if (thisSlide.attr('id') == "mobile") {
                                console.log("Mobileproactive=========", thisSlide);
                                var temp = $('.mobileLandingPageContainer-proactive');
                                temp.removeClass('mobileLandingPageContainer-proactive').addClass('mobileLandingPageContainer-preactive');
                                temp = $('.mobileLandingPage-proactive');
                                temp.removeClass('mobileLandingPage-proactive').addClass('mobileLandingPage-preactive');

                                // $('#tablet').addClass('tabletTranslate-proactive');
                                // $('#mobile').addClass('mobileTranslate-preactive');
                            }

                            thisSlide.removeClass('preactivede preactive active proactive').addClass('proactivede');
                        }

                        if (thisSlide.hasClass('preactive') && thisSlide.attr('id') == "laptop") {
                            console.log("Laptoppreactive=========", thisSlide);
                            var temp = $('.laptopLandingPageContainer-proactivede');
                            temp.removeClass('laptopLandingPageContainer-proactivede').addClass('laptopLandingPageContainer');
                            temp = $('.laptopLandingPage-proactivede');
                            temp.removeClass('laptopLandingPage-proactivede').addClass('laptopLandingPage');
                            $('#tablet').addClass('tabletTranslate-proactive');
                            $('#mobile').addClass('mobileTranslate-preactive').removeClass('mobileTranslate-proactive');
                        } else if (thisSlide.hasClass('preactive') && thisSlide.attr('id') == "tablet") {
                            console.log("Tabletpreactive=========", thisSlide);
                            var temp = $('.tabletLandingPageContainer-preactive');
                            temp.removeClass('tabletLandingPageContainer-preactive').addClass('tabletLandingPageContainer');
                            temp = $('.tabletLandingPage-preactive');
                            temp.removeClass('tabletLandingPage-preactive').addClass('tabletLandingPage');
                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                        } else if (thisSlide.hasClass('preactive') && thisSlide.attr('id') == "mobile") {
                            console.log("Mobilepreactive=========", thisSlide);
                            var temp = $('.mobileLandingPageContainer-preactive');
                            temp.removeClass('mobileLandingPageContainer-preactive').addClass('mobileLandingPageContainer');
                            temp = $('.mobileLandingPage-preactive');
                            temp.removeClass('mobileLandingPage-preactive').addClass('mobileLandingPage');

                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                        }

                        if (thisSlide.hasClass('active') && thisSlide.attr('id') == "laptop") {
                            console.log("LatopActive=========", thisSlide);
                            var temp = $('.laptopLandingPageContainer');
                            temp.removeClass('laptopLandingPageContainer').addClass('laptopLandingPageContainer-preactive');
                            temp = $('.laptopLandingPage');
                            temp.removeClass('laptopLandingPage').addClass('laptopLandingPage-proactivede');

                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive mobileTranslate-proactive');
                        } else if (thisSlide.hasClass('active') && thisSlide.attr('id') == "tablet") {
                            console.log("TableActive=========", thisSlide);
                            var temp = $('.tabletLandingPageContainer');
                            temp.removeClass('tabletLandingPageContainer').addClass('tabletLandingPageContainer-proactive');
                            temp = $('.tabletLandingPage');
                            temp.removeClass('tabletLandingPage').addClass('tabletLandingPage-proactive');

                            // $('#tablet').addClass('tabletTranslate-proactive');
                            // $('#mobile').addClass('mobileTranslate-preactive');

                        } else if (thisSlide.hasClass('active') && thisSlide.attr('id') == "mobile") {
                            console.log("MobileActive=========", thisSlide);
                            var temp = $('.mobileLandingPageContainer');
                            temp.removeClass('mobileLandingPageContainer').addClass('mobileLandingPageContainer-proactive');
                            temp = $('.mobileLandingPage');
                            temp.removeClass('mobileLandingPage').addClass('mobileLandingPage-proactive');

                            $('#tablet').removeClass('tabletTranslate-proactive');
                            $('#mobile').removeClass('mobileTranslate-preactive').addClass('mobileTranslate-proactive');
                        }
                    });
                    preactiveSlide.removeClass('preactivede active proactive proactivede').addClass('preactive');
                    activeSlide.removeClass('preactivede preactive proactive proactivede').addClass('active');
                    proactiveSlide.removeClass('preactivede preactive active proactivede').addClass('proactive');
                }
                var left = $('.slider-left');
                var right = $('.slider-right');
                left.on('click', function () {
                    slideLeft();
                });
                right.on('click', function () {
                    slideRight();
                });
                slideInitial();

            }.bind(this),
            500
        );
    }

    updateSmile(updateEntry, entry) {
        // console.log(entry.getEntry.Likes + 1, this.props.match.params.id);
        updateEntry({
            variables: {
                EntryId: this.props.match.params.id,
                Likes: entry.getEntry.Likes + 1,
            }
        });
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
                mutation updateEntry(
                    $EntryId: ID!
                    $Likes: Int
                ) {
                    updateEntry(
                        input: {
                            EntryId: $EntryId
                            Likes: $Likes
                        }
                    ) {
                        EntryId
                    }
                }
            `}

            onCompleted={data => {
                window.location.reload(true);
            }}
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
                                    return <div>Loading...</div>;
                                } else {

                                    // let jsonData = {
                                    //     "banners": {

                                    //         "items": [
                                    //             {
                                    //                 "imgSrc": entry.getEntry.banner1Url,
                                    //                 "size": entry.getEntry.banner1Size
                                    //             },
                                    //             {
                                    //                 "imgSrc": entry.getEntry.banner2Url,
                                    //                 "size": entry.getEntry.banner2Size
                                    //             },
                                    //             {
                                    //                 "imgSrc": entry.getEntry.banner3Url,
                                    //                 "size": entry.getEntry.banner3Size
                                    //             }
                                    //         ]
                                    //     }
                                    // };


                                    // let iconItemsStyle = {
                                    //     padding: "0px",
                                    //     background: "transparent",
                                    //     margin: "0 30px",
                                    //     height: "100%"
                                    // };

                                    // let circleIcon = {
                                    //     // borderRadius: "50%"
                                    // }

                                    // let iconsSlides = jsonData.banners.items.map((item, index) =>
                                    //     <div key={index} >
                                    //         <img src={item.imgSrc} ></img>
                                    //     </div>
                                    // );

                                    // let icons = (<CarouselSlider
                                    //     sliderBoxStyle={{ height: "500px", width: "80%", background: "transparent" }}
                                    //     accEle={{ dots: false }}
                                    //     slideCpnts={iconsSlides}
                                    //     itemsStyle={iconItemsStyle}
                                    //     buttonSetting={{ placeOn: 'middle-outside' }}
                                    // />);


                                    return (
                                        <Grid>
                                            <Row className="galleryBlock show-grid">
                                                <Col xs={9} md={9} className="workImageHolder padding-zero">
                                                    {
                                                        entry.getEntry.placement == "Landing Page" ?

                                                            <div className="slider-container" onLoad={this.onLoad(entry.getEntry)}>

                                                                <div className="slider-content">

                                                                    <div className="slider-single reflection-laptop" id="laptop">
                                                                        <img className="DeviceLaptop slider-single-image " src={DeviceLaptop} alt="1" />
                                                                        <div className="laptopLandingPageContainer">
                                                                            <img className="laptopLandingPage slider-single-image" src={entry.getEntry.landingPage1Url} alt="1" />
                                                                        </div>

                                                                    </div>

                                                                    <div className="slider-single reflection tabletTranslate-proactive" id="tablet">
                                                                        <img className="DeviceTablet slider-single-image" src={Devicetablet} alt="2" />
                                                                        <div className="tabletLandingPageContainer-proactive">
                                                                            <img className="tabletLandingPage-proactive slider-single-image" src={entry.getEntry.landingPage2Url} alt="2" />
                                                                        </div>

                                                                    </div>

                                                                    <div className="slider-single reflection mobileTranslate-preactive" id="mobile">
                                                                        <img className="DeviceMobile slider-single-image" src={DeviceMobile} alt="3" />
                                                                        <div className="mobileLandingPageContainer-preactive">
                                                                            <img className="mobileLandingPage-preactive slider-single-image" src={entry.getEntry.landingPage3Url} alt="3" />
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                <a className="slider-left" href="javascript:void(0);"><i className="fa fa-arrow-left"></i></a>

                                                                <a className="slider-right" href="javascript:void(0);"><i className="fa fa-arrow-right"></i></a>

                                                            </div>

                                                            : <div>
                                                                {entry.getEntry.placement == "CrossScreen" || entry.getEntry.placement == "CrossScreen DEA" || entry.getEntry.placement == "AAP Static" || entry.getEntry.placement == "AAP DEA" || entry.getEntry.placement == "Interstitial/Encore" ?
                                                                    <Col xs={12} md={12} className="staticUnitBlock">
                                                                        <img className="width-100 reflection" src={reviewWork} alt="2" />
                                                                    </Col> :
                                                                    <div>
                                                                        {entry.getEntry.placement == "Fire Tablet" ?
                                                                            <Col xs={12} md={12}>
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
                                                                            </Col> :
                                                                            <div>
                                                                                {entry.getEntry.placement == "Animated WS" ?
                                                                                    <div>
                                                                                        <video width="100%" autoPlay loop>
                                                                                            <source src={animatedWS} type="video/mp4" />
                                                                                            {/* <source src="movie.ogg" type="video/ogg" /> */}
                                                                                        </video>
                                                                                    </div> :
                                                                                    <div>
                                                                                        <embed src="https://s3-ap-northeast-1.amazonaws.com/l9-rewards-assets/00504398_Philips_AAP-static_CR1.pdf#scrollbar=1&toolbar=0&navpanes=1" width="100%" height="500px" />
                                                                                    </div>

                                                                                }

                                                                            </div>

                                                                        }
                                                                    </div>

                                                                    // <div>
                                                                    //     {entry.getEntry.placement == "FireTablet" || entry.getEntry.placement == "Fire TV" ?
                                                                    //         <embed src="https://s3-ap-northeast-1.amazonaws.com/l9-rewards-assets/00504398_Philips_AAP-static_CR1.pdf#scrollbar=0" width="100%" height="500px" />
                                                                    //         : <img className="width-100 reflection" src={reviewWork} alt="2" />
                                                                    //     }
                                                                    // </div>

                                                                }
                                                            </div>

                                                    }

                                                </Col>

                                                <Col xs={3} md={3} className="copyHolder">

                                                    <Row className="show-grid copyUserDetails">
                                                        <Col xs={12} md={12} className="nameUser margintext">
                                                            {entry.getEntry.DesignerName}
                                                        </Col>

                                                        <Col xs={12} md={12} className="margintext">
                                                            Alias : {entry.getEntry.nomineeAlias}
                                                        </Col>
                                                        <Col xs={12} md={12} className="margintext">
                                                            Advertiser: {entry.getEntry.advertiser}
                                                        </Col>

                                                        {/* <Col xs={12} md={12} className="margintext">
                                                Locale: DE
                                            </Col> */}

                                                        <Col xs={12} md={12} className="margintext">
                                                            Placement type: {entry.getEntry.placement}
                                                        </Col>

                                                        <Col xs={12} md={12} className="margintext copyCreativeDis">
                                                            Description: {entry.getEntry.description}
                                                        </Col>

                                                        <Col xs={12} md={12} className="margintext">
                                                            {/* <div className="buttonBlock"> */}
                                                            <Button className="buttonClick"
                                                                onClick={async () => {
                                                                    const response = await this.updateSmile(
                                                                        updateEntry, entry
                                                                    );
                                                                }}
                                                            >Smile for the design</Button>
                                                            {/* </div> */}
                                                        </Col>
                                                        <Col xs={12} md={12} className="margintext smiles">
                                                            Total smiles - {entry.getEntry.Likes}

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
