import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let { language } = this.props;
    let { dataClinic } = this.state;
    return (
      <>
        <div className="section-medical-facility section-share">
          <div className="section-container">
            <div className="section-header">
              <span>Cơ sở y tế nổi bật</span>
              <button className=" btn-more">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinic &&
                  dataClinic.length > 0 &&
                  dataClinic.map((item, index) => {
                    return (
                      <div
                        className="img-customize"
                        key={index}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <img src={item.image} />
                        <div className="text-customize">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
