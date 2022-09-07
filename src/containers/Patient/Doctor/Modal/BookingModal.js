import React, { Component } from "react";
import { connect } from "react-redux";
// import HomeHeader from "../../HomePage/HomeHeader.js";
import "./BookingModal.scss";
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import { LANGUAGES } from "../../../../utils";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language, dataSheduleTimeModal } = this.props;
    // console.log("test skol", this.props.dataSheduleTimeModal);
    let doctorid = "";
    if (dataSheduleTimeModal && !_.isEmpty(dataSheduleTimeModal)) {
      doctorid = dataSheduleTimeModal.doctorId;
      // console.log("s", dataSheduleTimeModal);
    }

    return (
      <>
        {/* <div>{this.props.isExtraInforDoctorId}</div> */}
        <Modal
          isOpen={this.props.isOpenModalBooking}
          size="lg"
          centered
          className={"booking-modal-container"}
          backdrop={true}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={this.props.closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataSheduleTimeModal)} */}
              <div className="doctor-infor">
                <ProfileDoctor DoctorId={doctorid} />
              </div>
              <div className="row">
                <div className="col-12">
                  {dataSheduleTimeModal &&
                  dataSheduleTimeModal.timeTypeData &&
                  language === LANGUAGES.VI
                    ? dataSheduleTimeModal.timeTypeData.valueVi
                    : ""}
                </div>
                <div className="col-12 price">Giá Khám: 250,000đ</div>
              </div>
              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>Họ và tên bệnh nhân (bắt buộc)</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Số điện thoại</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>Địa chỉ Email</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Địa chỉ liên hệ</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-12 form-group">
                  <label>Lý do khám</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>Đặt cho</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 form-group">
                  <label>Giới tính</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className=" btn-booking-confirm">Xác nhận</button>
              <button
                className=" btn-booking-cancel"
                onClick={this.props.closeBookingModal}
              >
                Huỷ
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
