import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import MedicalFacilityImg1 from "../../../assets/MedicalFacility/silder-1.jpg";
import MedicalFacilityImg2 from "../../../assets/MedicalFacility/silder-2.jpg";
import MedicalFacilityImg3 from "../../../assets/MedicalFacility/silder-3.jpg";
import MedicalFacilityImg4 from "../../../assets/MedicalFacility/silder-4.jpg";
import MedicalFacilityImg5 from "../../../assets/MedicalFacility/silder-5.jpg";
import MedicalFacilityImg6 from "../../../assets/MedicalFacility/silder-6.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
  render() {
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
                <div className="img-customize">
                  <img src={MedicalFacilityImg1} />
                  <div className="text-customize">
                    Bệnh viên Hữu nghị Việt Đức
                  </div>
                </div>
                <div className="img-customize">
                  <img src={MedicalFacilityImg2} />
                  <div className="text-customize">Bệnh viên Chợ Rẫy</div>
                </div>
                <div className="img-customize">
                  <img src={MedicalFacilityImg3} />
                  <div className="text-customize">
                    Phòng khám Bệnh viên Đại học Y Dược 1
                  </div>
                </div>
                <div className="img-customize">
                  <img src={MedicalFacilityImg4} />
                  <div className="text-customize">
                    Bệnh viên K - Cơ sở Phan Chu Trinh
                  </div>
                </div>
                <div className="img-customize">
                  <img src={MedicalFacilityImg5} />
                  <div className="text-customize">
                    Bệnh viên Ung bướu Hưng Việt
                  </div>
                </div>
                <div className="img-customize">
                  <img src={MedicalFacilityImg6} />
                  <div className="text-customize">
                    Hệ thống Y tế Thu Cúc TCI
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
