import React, { Component } from "react";
import { connect } from "react-redux";
// import HomeHeader from "../../HomePage/HomeHeader.js";
import * as actions from "../../../store/actions";
import "./DefaultClass.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
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
    let { language } = this.props;

    return <></>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
