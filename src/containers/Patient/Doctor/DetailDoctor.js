import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader.js";
import DoctorSchedule from "./DoctorSchedule.js";
import DoctorExtraInfor from "./DoctorExtraInfor.js";
import * as actions from "../../../store/actions";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inforDoctor: {},
      isDoctorId: "",
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.fetchDetailInforDoctorRedux(this.props.match.params.id);
      this.setState({ isDoctorId: this.props.match.params.id });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.getinforDoctor !== this.props.getinforDoctor) {
      this.setState({
        inforDoctor: this.props.getinforDoctor,
      });
    }
  }
  render() {
    let { language } = this.props;
    let detailDoctor = this.state.inforDoctor;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }

    let imageBase64 = "";
    if (detailDoctor && detailDoctor.image) {
      imageBase64 = new Buffer(
        detailDoctor.image,
        "base64",
        toString("binary")
      );
    }
    // console.log("this state ", this.state);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{ backgroundImage: `url(${imageBase64})` }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule isDoctorId={this.state.isDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor isDoctorId={this.state.isDoctorId} />
            </div>
          </div>
          <div className="detail-infor-doctor">
            <div className="title-doctor">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor">cmt</div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    getinforDoctor: state.admin.InforDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailInforDoctorRedux: (id) =>
      dispatch(actions.fetchDetailInforDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
