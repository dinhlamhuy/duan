import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: "",
      listDoctors: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getAllRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataAllDoctors !== this.props.dataAllDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.dataAllDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelect = this.buildDataInputSelect(
        this.props.dataAllDoctors,
        "USERS"
      );
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.getInforDoctor !== this.props.getInforDoctor) {
      let detail = this.props.getInforDoctor.Markdown;
      let doctor_infor = this.props.getInforDoctor.Doctor_Infor;
      let { listPayment, listPrice, listProvince } = this.state;
      let selectPayment = "",
        selectedPrice = "",
        selectedProvince = "";
      if (doctor_infor) {
        selectPayment = listPayment.find((item) => {
          return item && item.value === doctor_infor.paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === doctor_infor.priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === doctor_infor.provinceId;
        });
        this.setState({
          nameClinic: doctor_infor.nameClinic,
          addressClinic: doctor_infor.addressClinic,
          note: doctor_infor.note,
          selectedPrice: selectedPrice,
          selectedPayment: selectPayment,
          selectedProvince: selectedProvince,
        });
      } else {
        this.setState({
          nameClinic: "",
          addressClinic: "",
          note: "",
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
        });
      }
      if (detail && detail.description && detail.contentMarkdown) {
        this.setState({
          contentMarkdown: detail.contentMarkdown,
          contentHTML: detail.contentHTML,
          description: detail.description,
          hasOldData: true,
        });
      } else {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          hasOldData: false,
        });
      }
    }
    if (
      this.props.allRequiredDoctorInfor !== prevProps.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    // console.log("handleEditorChange", html, text);
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleOnChangeText = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleChangeSelect = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () => {
      if (this.state.selectedDoctor && this.state.selectedDoctor.value) {
        this.props.fetchDetailInforDoctorRedux(this.state.selectedDoctor.value);
      }
    });
  };

  handleChangeSelectDoctorinfor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleSaveContentMarkdown = (data) => {
    // console.log("check markdown", this.state);
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      priceId: this.state.selectedPrice.value,
      provinceId: this.state.selectedPayment.value,
      paymentId: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props; //or    let language=this.props.language;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }

    return result;
  };

  render() {
    const { listDoctors, selectedDoctor, hasOldData } = this.state;
    console.log("state co gi: ", this.state);
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-infor mb-2 row">
            <div className="content-left form-group col-5">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctors}
                placeholder={
                  <div>
                    {" "}
                    <FormattedMessage id="admin.manage-doctor.select-doctor" />
                  </div>
                }
              />
            </div>
            <div className="content-right form-group col-7">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control "
                rows="4"
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
                value={this.state.description || ""}
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                name="selectedPrice"
                onChange={this.handleChangeSelectDoctorinfor}
                options={this.state.listPrice}
                placeholder={
                  <div>
                    <FormattedMessage id="admin.manage-doctor.price" />
                  </div>
                }
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                name="selectedPayment"
                onChange={this.handleChangeSelectDoctorinfor}
                options={this.state.listPayment}
                placeholder={
                  <div>
                    <FormattedMessage id="admin.manage-doctor.payment" />
                  </div>
                }
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                name="selectedProvince"
                onChange={this.handleChangeSelectDoctorinfor}
                options={this.state.listProvince}
                placeholder={
                  <div>
                    <FormattedMessage id="admin.manage-doctor.province" />
                  </div>
                }
              />
            </div>

            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.nameclinic" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "nameClinic")
                }
                value={this.state.nameClinic || ""}
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.addressclinic" />
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "addressClinic")
                }
                value={this.state.addressClinic || ""}
              />
            </div>
            <div className="form-group col-4">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <textarea
                className="form-control "
                rows="4"
                onChange={(event) => this.handleOnChangeText(event, "note")}
                value={this.state.note || ""}
              />
            </div>
            <div className="col-12 text-center">
              <button
                className={
                  hasOldData === true
                    ? "btn btn-warning mt-4 save-content-doctor"
                    : "btn btn-primary mt-4 create-content-doctor"
                }
                onClick={() => this.handleSaveContentMarkdown()}
              >
                {hasOldData === true ? (
                  <span>
                    <FormattedMessage id="admin.manage-doctor.save" />
                  </span>
                ) : (
                  <span>
                    <FormattedMessage id="admin.manage-doctor.add" />
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown || ""}
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    dataAllDoctors: state.admin.allDoctors,
    getInforDoctor: state.admin.InforDoctor,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    fetchDetailInforDoctorRedux: (id) =>
      dispatch(actions.fetchDetailInforDoctor(id)),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
