import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
// import * as actions from "../../../store/actions";
import "./ManagePatient.scss";
// import { LANGUAGES } from "../../../utils";
// import { FormattedMessage } from "react-intl";
import {
  getListPatientById,
  postsendRemedy,
} from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      listPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      doctorId: "",
      patientId: "",
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.getdatePatient();
  }
  getdatePatient = async () => {
    let day = this.state.date;
    let { user } = this.props;
    day.setHours(0);
    day.setMinutes(0);
    day.setSeconds(0);

    let formatedDate = new Date(day).getTime();
    let res = await getListPatientById({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        listPatient: res.data,
      });
    }
  };
  handleOnChangeDarePicker = (date) => {
    this.getdatePatient();
    this.setState({
      date: date[0],
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
    });
  };
  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postsendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy succeeds:");
      await this.getdatePatient();
      this.closeRemedyModal();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Something wrongs...");
    }
  };

  render() {
    let { language } = this.props;
    let { listPatient } = this.state;

    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
          <div className="m-p-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDarePicker}
                value={this.state.date}
              />
            </div>
            <div className="col-12 table-m-p">
              <table className="table  table-hover ">
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>SĐT</th>
                    <th>Giới tính</th>

                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Khung giờ</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listPatient && listPatient.length > 0 ? (
                    listPatient.map((item, index) => {
                      let gender =
                        LANGUAGES.VI === language
                          ? item.patientData.genderData.valueVi
                          : item.patientData.genderData.valueEn;
                      return (
                        <tr key={index}>
                          <td>{item.patientData.lastname}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>{gender}</td>
                          <td>{item.patientData.email}</td>
                          <td>
                            {LANGUAGES.VI === language
                              ? item.timeTypebookingData.valueVi
                              : item.timeTypebookingData.valueEn}
                          </td>
                          <td>{item.patientData.address}</td>
                          <td>
                            <button
                              className="btn btn-warning mx-1"
                              onClick={() => this.handleBtnConfirm(item)}
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center" }}>
                        not data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenRemedyModal={this.state.isOpenRemedyModal}
          dataModal={this.state.dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.sendRemedy}
        />
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
