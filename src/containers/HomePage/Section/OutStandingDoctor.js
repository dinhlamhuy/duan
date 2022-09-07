import React, { Component } from "react";
import { connect } from "react-redux";
// import "./OutStandingDoctor.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    // console.log("lay ddc chua", this.props.topDoctors);
    let { language } = this.props; //or     let language = this.props.language;
    let AllDoctors = this.state.arrDoctors;
    // AllDoctors = AllDoctors.concat(AllDoctors);
    return (
      <>
        <div className="section-outstanding-doctor section-share">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className=" btn-more">
                <FormattedMessage id="homepage.more-infor" /> ...
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {AllDoctors &&
                  AllDoctors.length > 0 &&
                  AllDoctors.map((item, index) => {
                    let nameVi = `${item.positionData.valueVi}, ${item.firstName}  ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;

                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(
                        item.image,
                        "base64",
                        toString("binary")
                      );
                    }
                    return (
                      <div
                        className="img-customize section-outstanding-doctor-card pt-2"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <img
                          className="section-outstanding-doctor-img"
                          src={imageBase64}
                        />
                        <div className="text-customize">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Chuyên khoa</div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
