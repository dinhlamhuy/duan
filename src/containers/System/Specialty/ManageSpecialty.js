import React, { Component } from "react";
import { connect } from "react-redux";

import "./ManageSpecialty.scss";
import { toast } from "react-toastify";
// import { LANGUAGES } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
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
      //   let objectUrl = URL.createObjectURL(file);
      let getBase64 = await CommonUtils.getBase64(file);
      //   console.log(getBase64);
      this.setState({
        imageBase64: getBase64,
      });
    }
  };
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty sycceeds!");
      this.setState({
        nameVi: "",
        nameEn: "",
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
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="btn-add-new-specialty"></div>
          <div className="all-specialty row">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                type="text"
                className="form-control"
                value={this.state.nameVi}
                onChange={(event) => this.hanldeOnChangeInput(event, "nameVi")}
              />
            </div>
            <div className="col-6 form-group">
              <label>Tên chuyên khoa (Tiếng anh)</label>
              <input
                type="text"
                className="form-control"
                value={this.state.nameEn}
                onChange={(event) => this.hanldeOnChangeInput(event, "nameEn")}
              />
            </div>
            <div className="col-6">
              <label>Ảnh chuyên khoa</label>
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
                className="btn-save-specialty btn btn-warning"
                onClick={() => this.handleSaveNewSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
