import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader.js";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isDoctorId !== prevProps.isDoctorId) {
      this.props.getExtraInfoDoctorByIdRedux(this.props.isDoctorId);
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { language, allExtraInforDoctor } = this.props;
    let { isShowDetailInfor } = this.state;
    let pricevi = "",
      priceen = "",
      paymentvi = "",
      paymenten = "";
    if (allExtraInforDoctor && allExtraInforDoctor.priceData) {
      pricevi = allExtraInforDoctor.priceData.valueVi;
      priceen = allExtraInforDoctor.priceData.valueEn;
    }
    if (allExtraInforDoctor && allExtraInforDoctor.paymentData) {
      if (allExtraInforDoctor.paymentId === "PAY1") {
        paymentvi = " Tiền mặt, Thẻ ATM";
        paymenten = " Cash, Credit card";
      } else {
        paymentvi = allExtraInforDoctor.paymentData.valueVi;
        paymenten = allExtraInforDoctor.paymentData.valueEn;
      }
    }

    // console.log("doctor: ", allExtraInforDoctor);
    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-infor.text-address" />
            </div>
            <div className="name-clinic">
              {allExtraInforDoctor && allExtraInforDoctor.nameClinic
                ? allExtraInforDoctor.nameClinic
                : ""}
            </div>
            <div className="detail-address">
              {allExtraInforDoctor && allExtraInforDoctor.addressClinic
                ? allExtraInforDoctor.addressClinic
                : ""}
            </div>
          </div>
          <hr className="my-1" />
          <div className="content-down pl-2">
            {isShowDetailInfor === false && (
              <div>
                <FormattedMessage id="patient.extra-infor.price" />:{" "}
                {language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={pricevi}
                    displayType={"text"}
                    thousandSeparator
                    suffix={" VND"}
                  />
                ) : (
                  <NumberFormat
                    value={priceen}
                    displayType={"text"}
                    thousandSeparator
                    suffix={" USD"}
                  />
                )}
                .
                <span
                  className="showHideDetail ml-2"
                  onClick={() => this.showHideDetailInfor(true)}
                >
                  <FormattedMessage id="patient.extra-infor.detail" />
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                {/* <div> <FormattedMessage id="patient.extra-infor.price" />:</div> */}
                <div className="card">
                  <div className="card-body p-0">
                    <div className=" p-2  text-title ">
                      <div className="price">
                        <span className="left">
                          {" "}
                          <FormattedMessage id="patient.extra-infor.price" /> :
                        </span>
                        <span className="right">
                          {language === LANGUAGES.VI ? (
                            <NumberFormat
                              value={pricevi}
                              displayType={"text"}
                              thousandSeparator
                              suffix={" VND"}
                            />
                          ) : (
                            <NumberFormat
                              value={priceen}
                              displayType={"text"}
                              thousandSeparator
                              suffix={" USD"}
                            />
                          )}
                        </span>
                      </div>
                      <div className="note-price">
                        {allExtraInforDoctor && allExtraInforDoctor.note
                          ? allExtraInforDoctor.note
                          : ""}
                      </div>
                    </div>
                    <hr className="m-0" />
                    <div className="text-payment p-2 ">
                      <FormattedMessage id="patient.extra-infor.payment" />
                      {language === LANGUAGES.VI ? paymentvi : paymenten}
                    </div>
                  </div>
                </div>
                <div
                  className="showHideDetail mb-2"
                  onClick={() => this.showHideDetailInfor(false)}
                >
                  <FormattedMessage id="patient.extra-infor.hide-price" />
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    scheduleDoctor: state.admin.scheduleDoctor,
    allExtraInforDoctor: state.admin.allExtraInforDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExtraInfoDoctorByIdRedux: (doctorId) =>
      dispatch(actions.getExtraInfoDoctorById(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
