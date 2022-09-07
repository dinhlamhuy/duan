import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import HandBookImg1 from "../../../assets/HandBook/silder-1.jpg";
import HandBookImg2 from "../../../assets/HandBook/silder-2.jpg";
import HandBookImg3 from "../../../assets/HandBook/silder-3.jpg";
import HandBookImg4 from "../../../assets/HandBook/silder-4.jpg";
import HandBookImg5 from "../../../assets/HandBook/silder-5.jpg";
import HandBookImg6 from "../../../assets/HandBook/silder-6.jpg";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <>
        <div className="section-handbook section-share">
          <div className="section-container">
            <div className="section-header">
              <span>Cẩm nang</span>
              <button className=" btn-more">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="img-customize">
                  <img src={HandBookImg1} />
                  <div className="text-customize">
                    Bệnh viên Hữu nghị Việt Đức
                  </div>
                </div>
                <div className="img-customize">
                  <img src={HandBookImg2} />
                  <div className="text-customize">Bệnh viên Chợ Rẫy</div>
                </div>
                <div className="img-customize">
                  <img src={HandBookImg3} />
                  <div className="text-customize">
                    Phòng khám Bệnh viên Đại học Y Dược 1
                  </div>
                </div>
                <div className="img-customize">
                  <img src={HandBookImg4} />
                  <div className="text-customize">
                    Bệnh viên K - Cơ sở Phan Chu Trinh
                  </div>
                </div>
                <div className="img-customize">
                  <img src={HandBookImg5} />
                  <div className="text-customize">
                    Bệnh viên Ung bướu Hưng Việt
                  </div>
                </div>
                <div className="img-customize">
                  <img src={HandBookImg6} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
