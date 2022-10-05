import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { Modal } from "reactstrap";
// import { LANGUAGES } from "../../../../utils";

// import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeImage = async (event) => {
    let files = event.target.files;
    let file = files[0];
    if (file) {
      let getBase64 = await CommonUtils.getBase64(file);
      // console.log(getBase64);
      this.setState({
        imgBase64: getBase64,
      });
    }
  };
  handlesendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpenRemedyModal}
          size="md"
          centered
          className={"booking-modal-container"}
          backdrop={true}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tin đặt lịch khám bệnh</span>
              <span className="right" onClick={this.props.closeRemedyModal}>
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="row">
                <div className="col-6 ">
                  <label>Email bệnh nhân</label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.email}
                    onChange={(event) => this.handleOnchangeEmail(event)}
                  />
                </div>
                <div className="col-6 ">
                  <label>Chọn file đơn thuốc</label>
                  <input
                    className="form-control-file"
                    type="file"
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className=" btn-booking-confirm"
                onClick={() => this.handlesendRemedy()}
              >
                Send
              </button>
              <button
                className=" btn-booking-cancel"
                onClick={this.props.closeRemedyModal}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
