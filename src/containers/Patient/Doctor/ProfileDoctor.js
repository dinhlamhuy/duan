import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import * as actions from "../../../store/actions";
import "./ProfileDoctor.scss";
import * as actions from "../../../store/actions";

import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import moment from "moment";
import { getProfileDoctorByIdService } from "../../../services/userService";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let id = this.props.DoctorId;

    // if (id) {
    //   this.props.getProfileDoctorByIdRedux(id);
    // }
    let res = await getProfileDoctorByIdService(id);
    if (res && res.errCode === 0) {
      this.setState({
        dataProfile: res.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.DoctorId !== prevProps.DoctorId) {
      // this.props.getProfileDoctorByIdRedux(this.props.DoctorId);
      let res = await getProfileDoctorByIdService(this.props.DoctorId);
      console.log("shơ ", res, this.props.DoctorId);
      if (res && res.errCode === 0) {
        this.setState = {
          dataProfile: res.data,
        };
      }
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let thungaythangnam =
        language === LANGUAGES.VI
          ? this.capitalizeFirstLetter(
              moment(new Date(dataTime.date)).format("dddd - DD/MM/YYYY")
            )
          : this.capitalizeFirstLetter(
              moment(new Date(dataTime.date))
                .locale("en")
                .format("ddd - MM/DD/YYYY")
            );

      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      return (
        <>
          <div>
            {time} - {thungaythangnam}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.priceBooking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { language, isShowDescriptionDoctor, dataTime, DoctorId } = this.props;
    let ProfileDoctor = this.state.dataProfile;
    let nameVi = "",
      nameEn = "";
    if (ProfileDoctor && ProfileDoctor.positionData) {
      nameVi = `${ProfileDoctor.positionData.valueVi} ${ProfileDoctor.firstName} ${ProfileDoctor.lastName}`;
      nameEn = `${ProfileDoctor.positionData.valueEn} ${ProfileDoctor.lastName} ${ProfileDoctor.firstName}`;
    }
    let imageBase64 = "";
    if (ProfileDoctor && ProfileDoctor.image) {
      imageBase64 = new Buffer(
        ProfileDoctor.image,
        "base64",
        toString("binary")
      );
    }

    return (
      <>
        <div className="profile-doctor-container  mx-0">
          <div className="infor-doctor">
            <div
              className="avt"
              style={{ backgroundImage: `url(${imageBase64})` }}
            ></div>
            <div className="content-right">
              <div className="up">
                {" "}
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {ProfileDoctor &&
                      ProfileDoctor.Markdown &&
                      ProfileDoctor.Markdown.description && (
                        <span>{ProfileDoctor.Markdown.description}</span>
                      )}
                  </>
                ) : (
                  <>{this.renderTimeBooking(dataTime)}</>
                )}

                {this.props.isShowLinkDetail === true && (
                  <div>
                    <Link to={`/detail-doctor/${DoctorId}`}>Xem thêm</Link>
                  </div>
                )}
                {this.props.isShowPrice === true && (
                  <div className="price">
                    <FormattedMessage id="patient.extra-infor.price" />:
                    {ProfileDoctor &&
                    ProfileDoctor.Doctor_Infor &&
                    ProfileDoctor.Doctor_Infor.priceData &&
                    language === LANGUAGES.VI ? (
                      <NumberFormat
                        value={ProfileDoctor.Doctor_Infor.priceData.valueVi}
                        displayType={"text"}
                        thousandSeparator
                        suffix={" VND"}
                      />
                    ) : (
                      ""
                    )}
                    {ProfileDoctor &&
                    ProfileDoctor.Doctor_Infor &&
                    ProfileDoctor.Doctor_Infor.priceData &&
                    language === LANGUAGES.EN ? (
                      <NumberFormat
                        value={ProfileDoctor.Doctor_Infor.priceData.valueEn}
                        displayType={"text"}
                        thousandSeparator
                        suffix={" USD"}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    ProfileDoctor: state.admin.allProfileDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileDoctorByIdRedux: (doctorId) =>
      dispatch(actions.getProfileDoctorById(doctorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
