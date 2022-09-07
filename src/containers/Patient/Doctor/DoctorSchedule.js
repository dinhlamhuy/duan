import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader.js";
import * as actions from "../../../store/actions";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import moment from "moment";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal.js";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDay: [],
      allAvailableTime: [],
      dataSheduleTimeModal: {},
      isOpenModalBooking: false,
    };
  }

  componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);

    this.setState({
      allDays: allDays,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.scheduleDoctor !== prevProps.scheduleDoctor) {
      this.setState({ allAvailableTime: this.props.scheduleDoctor });
    }
    if (this.props.isDoctorId !== prevProps.isDoctorId) {
      let allDays = this.getArrDays(this.props.language);
      this.props.fetchScheduleDoctorByDateRedux(
        this.props.isDoctorId,
        allDays[0].value
      );
    }
  }
  handleOnChangeSelect = (event) => {
    if (this.props.isDoctorId) {
      this.props.fetchScheduleDoctorByDateRedux(
        this.props.isDoctorId,
        event.target.value
      );
    }
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleClickScheduleTime = (item) => {
    this.setState({
      isOpenModalBooking: true,
      dataSheduleTimeModal: item,
    });
    // console.log("th ", item);
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};

      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }

    return allDays;
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    // console.log("schedule doctor: ", allAvailableTime);
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              className="select-schedule"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <i className="fas fa-calendar-alt"></i>{" "}
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  {allAvailableTime.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="btn btn-warning m-1"
                        onClick={() => this.handleClickScheduleTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </button>
                    );
                  })}
                  <div className="book-free">
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="fas fa-hand-point-up"></i>{" "}
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </div>
                </>
              ) : (
                <div className="mt-2 no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          dataSheduleTimeModal={this.state.dataSheduleTimeModal}
          isOpenModalBooking={this.state.isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    scheduleDoctor: state.admin.scheduleDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailInforDoctorRedux: (id) =>
      dispatch(actions.fetchDetailInforDoctor(id)),
    fetchScheduleDoctorByDateRedux: (doctorId, date) =>
      dispatch(actions.getScheduleDoctorByDate(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
