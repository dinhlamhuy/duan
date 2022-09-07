import React, { Component } from "react";
import { connect } from "react-redux";
// import HomeHeader from "../../HomePage/HomeHeader.js";
// import * as actions from "../../../store/actions";
import "./ProfileDoctor.scss";
import * as actions from "../../../store/actions";

import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  componentDidMount() {
    let id = this.props.DoctorId;
    if (id) {
      this.props.getProfileDoctorByIdRedux(id);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    // if (this.props.DoctorId !== prevProps.DoctorId) {
    //   this.props.getProfileDoctorByIdRedux(this.props.DoctorId);
    // }
  }

  render() {
    let { language } = this.props;
    console.log("this state ", this.props.DoctorId);

    return (
      <>
        <div>{JSON.stringify(this.props.ProfileDoctor)}</div>
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
