import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { dateFormat, LANGUAGES } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";

import moment from "moment";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      date: "",

      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTimeRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataselect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataselect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      console.log("dataSelect", dataSelect);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data.map((item, index) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props; //or    let language=this.props.language;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  handleChangeSelect = (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDarePicker = (date) => {
    this.setState({
      date: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    console.log("CHech time ", time);
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, date } = this.state;
    let result = [];
    if (!date) {
      toast.error("Invalid date! ");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor! ");
      return;
    }
    let formatedDate = new Date(date).getTime();
    if (rangeTime && rangeTime.length > 0) {
      let selectTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectTime && selectTime.length > 0) {
        selectTime.map((schedule) => {
          console.log("schedule:", schedule);
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time! ");
        return;
      }
    }

    this.props.saveBulkScheduleDoctorRedux({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatedDate,
    });
    // console.log("check result ", result);
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnChangeDarePicker}
                  value={this.state.date}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.EN
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12 text-center">
                <button
                  onClick={() => this.handleSaveSchedule()}
                  className="btn btn-primary  mt-3 btn-save-schedule "
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
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
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
    language: state.app.language,

    // getAllCode: state.admin.allCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
    saveBulkScheduleDoctorRedux: (data) =>
      dispatch(actions.saveBulkScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
