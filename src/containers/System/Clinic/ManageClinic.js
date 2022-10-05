import React, { Component } from "react";
import { connect } from "react-redux";

import "./ManageClinic.scss";
import { toast } from "react-toastify";
// import { LANGUAGES } from "../../../utils";
import { createNewClinic } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionMarkdown: "",
      descriptionHTML: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  hanldeOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeImage = async (event) => {
    let files = event.target.files;
    let file = files[0];
    if (file) {
      let getBase64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: getBase64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeeds!");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionMarkdown: "",
        descriptionHTML: "",
      });
    } else {
      toast.error("Something wrongs...!");
    }
  };

  render() {
    let { language } = this.props;

    return (
      <>
        <div className="manage-clinic-container">
          <div className="ms-title">Quản lý phòng khám</div>
          <div className="btn-add-new-clinic"></div>
          <div className="all-clinic row">
            <div className="col-6 form-group">
              <label>Tên phòng khám</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(event) => this.hanldeOnChangeInput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ</label>
              <input
                type="text"
                className="form-control"
                value={this.state.address}
                onChange={(event) => this.hanldeOnChangeInput(event, "address")}
              />
            </div>
            <div className="col-6">
              <label>Ảnh phòng khám</label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: "400px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown || ""}
              />
            </div>
            <div className="col-12 text-center mt-2">
              <button
                className="btn-save-clinic btn btn-warning"
                onClick={() => this.handleSaveNewClinic()}
              >
                Save
              </button>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
