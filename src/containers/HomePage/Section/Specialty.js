import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let { language } = this.props;
    let { dataSpecialty } = this.state;

    return (
      <>
        <div className="section-speciality section-share">
          <div className="section-container">
            <div className="section-header">
              <span>
                <FormattedMessage id="homepage.specialty-poplular" />
              </span>
              <button className=" btn-more">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="img-customize"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <img src={item.image} />
                        <div className="text-customize">
                          {language === LANGUAGES.VI
                            ? item.nameVi
                            : item.nameEn}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
