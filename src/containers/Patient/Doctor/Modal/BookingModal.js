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
import DatePincker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "",
      doctorId: "",
      date: "",
      timeType: "",
      listGender: [],
    };
  }

  componentDidMount() {
    this.props.fetchGender();
  }
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        listGender: this.buildDataGender(this.props.genderRedux),
      });
    }
    if (this.props.genderRedux !== prevProps.genderRedux) {
      this.setState({
        listGender: this.buildDataGender(this.props.genderRedux),
      });
    }
    if (this.props.dataSheduleTimeModal !== prevProps.dataSheduleTimeModal) {
      if (
        this.props.dataSheduleTimeModal &&
        !_.isEmpty(this.props.dataSheduleTimeModal)
      ) {
        let formatedDate = new Date(
          this.props.dataSheduleTimeModal.date
        ).getTime();
        this.setState({
          doctorId: this.props.dataSheduleTimeModal.doctorId,
          timeType: this.props.dataSheduleTimeModal.timeType,
          date: formatedDate,
        });
      }
    }
  }

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleOnChangeInput = (event, name) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[name] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      gender: selectedOption.value,
    });
  };

  handleConfirmBooking = () => {
    let formatedDate = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataSheduleTimeModal);
    let doctorName = this.buildDoctorName(this.props.dataSheduleTimeModal);

    this.props.PatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: formatedDate,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      date: this.state.date,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let thungaythangnam =
        language === LANGUAGES.VI
          ? moment(new Date(dataTime.date)).format("dddd - DD/MM/YYYY")
          : moment(new Date(dataTime.date))
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      return `${time} - ${thungaythangnam}`;
    }
    return <></>;
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.firstName}  ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName}   ${dataTime.doctorData.firstName}`;

      return name;
    }
    return <></>;
  };

  render() {
    let { language, dataSheduleTimeModal } = this.props;
    let doctorid = "";
    if (dataSheduleTimeModal && !_.isEmpty(dataSheduleTimeModal)) {
      doctorid = dataSheduleTimeModal.doctorId;
    }
    let today = new Date(new Date().setDate(new Date().getDate()));
    return (
      <>
        <Modal
          isOpen={this.props.isOpenModalBooking}
          size="lg"
          centered
          className={"booking-modal-container"}
          backdrop={true}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={this.props.closeBookingModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor
                  DoctorId={doctorid}
                  isShowDescriptionDoctor={false}
                  dataTime={this.props.dataSheduleTimeModal}
                  isShowPrice={true}
                  isShowLinkDetail={false}
                />
              </div>

              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullname" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "fullName")
                    }
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-12 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.reason}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "reason")
                    }
                  />
                </div>
              </div>

              <div className="row ">
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </label>

                  <DatePincker
                    onChange={this.handleOnchangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                    // maxDate={today}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select
                    // value={this.state.gender}
                    options={this.state.listGender}
                    onChange={this.handleChangeSelect}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className=" btn-booking-confirm"
                onClick={() => this.handleConfirmBooking()}
              >
                <FormattedMessage id="patient.booking-modal.confirm" />
              </button>
              <button
                className=" btn-booking-cancel"
                onClick={this.props.closeBookingModal}
              >
                <FormattedMessage id="patient.booking-modal.cancel" />
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
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(actions.fetchGenderStart()),
    PatientBookAppointment: (data) =>
      dispatch(actions.PatientBookAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
