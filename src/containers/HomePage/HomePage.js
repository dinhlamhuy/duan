import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import HandBook from "./Section/HandBook";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import About from "./Section/About";
import "./HomePage.scss";

import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToSroll: 1,
    };
    return (
      <>
        <div>
          <HomeHeader isShowBanner={true} />

          <Specialty settings={settings} />
          <MedicalFacility settings={settings} />
          <OutStandingDoctor settings={settings} />
          <HandBook settings={settings} />
          <About />
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
