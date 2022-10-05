import React, { Component } from "react";
import { connect } from "react-redux";

// import * as actions from "../../../store/actions";
import "./VerifyEmail.scss";
// import { LANGUAGES } from "../../../utils";
import HomeHeader from "../HomePage/HomeHeader.js";

import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : "",
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === true ? (
            <div>
              {+errCode === 0 ? (
                <div className="noti">Xác nhận lịch hẹn thành công</div>
              ) : (
                <div className="noti">
                  Lịch hẹn không tồn tại hoặc đã được xác nhận
                </div>
              )}
            </div>
          ) : (
            <div>Loading data...</div>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
