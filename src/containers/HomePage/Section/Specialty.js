import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import specialtyImg1 from "../../../assets/specialty/silder-1.jpg";
import specialtyImg2 from "../../../assets/specialty/silder-2.jpg";
import specialtyImg3 from "../../../assets/specialty/silder-3.jpg";
import specialtyImg4 from "../../../assets/specialty/silder-4.jpg";
import specialtyImg5 from "../../../assets/specialty/silder-5.jpg";
import specialtyImg6 from "../../../assets/specialty/silder-6.jpg";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-speciality section-share">
          <div className="section-container">
            <div className="section-header">
              <span>Chuyên khoa phổ biến</span>
              <button className=" btn-more">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <img src={specialtyImg1} />
                  <div className="text-customize">Cơ xương khớp</div>
                </div>
                <div className="img-customize">
                  <img src={specialtyImg2} />
                  <div className="text-customize">Thần kinh</div>
                </div>
                <div className="img-customize">
                  <img src={specialtyImg3} />
                  <div className="text-customize">Tiêu hóa</div>
                </div>
                <div className="img-customize">
                  <img src={specialtyImg4} />
                  <div className="text-customize">Tim mạch</div>
                </div>
                <div className="img-customize">
                  <img src={specialtyImg5} />
                  <div className="text-customize">Tai Mũi Họng</div>
                </div>
                <div className="img-customize">
                  <img src={specialtyImg6} />
                  <div className="text-customize">Cột sống</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
