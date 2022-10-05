import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader.js";
import DoctorSchedule from "../Doctor/DoctorSchedule.js";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor.js";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
// import * as actions from "../../../store/actions";

import "./DetailSpecialty.scss";
// import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant.js";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let data = await getDetailSpecialtyById({
        id: this.props.match.params.id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");

      if (
        data &&
        data.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let arrDoctorId = [];
        if (data && !_.isEmpty(data.data)) {
          let arr = data.data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        // let dataProvince = resProvince.data;
        // let result = [];
        // if (dataProvince && dataProvince.length > 0) {
        //   dataProvince.push("ALL");
        // }
        this.setState({
          dataSpecialty: data.data,
          arrDoctorId: arrDoctorId,
          listProvince: resProvince.data,
        });
      }
    }
  }

  getDataDetailSpecialty = async (id, location) => {
    let data = await getDetailSpecialtyById({
      id: id,
      location: location,
    });
    let resProvince = await getAllCodeService("PROVINCE");

    if (
      data &&
      data.errCode === 0 &&
      resProvince &&
      resProvince.errCode === 0
    ) {
      let arrDoctorId = [];
      if (data && !_.isEmpty(data.data)) {
        let arr = data.data.doctorSpecialty;
        if (arr && arr.length > 0) {
          arr.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }
      }
      return {
        dataSpecialty: data.data,
        arrDoctorId: arrDoctorId,
        listProvince: resProvince.data,
      };
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  hanldeOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let selectedProVince = event.target.value;

      let data = await getDetailSpecialtyById({
        id: this.props.match.params.id,
        location: selectedProVince,
      });

      if (data && data.errCode === 0) {
        let arrDoctorId = [];
        if (data && !_.isEmpty(data.data)) {
          let arr = data.data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataSpecialty: data.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let { language } = this.props;
    let { arrDoctorId, dataSpecialty, listProvince } = this.state;

    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-container">
          <div className="description-specialty">
            <div className="description-specialty-title">
              {dataSpecialty &&
              !_.isEmpty(dataSpecialty) &&
              LANGUAGES.VI === language
                ? dataSpecialty.nameVi
                : dataSpecialty.nameEn}
            </div>
            {dataSpecialty && dataSpecialty.descriptionHTML && (
              <div
                className="description-specialty-content"
                dangerouslySetInnerHTML={{
                  __html: dataSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.hanldeOnChangeSelect(event)}>
              <option value={"ALL"}>
                {LANGUAGES.VI === language ? "Toàn quốc" : "All Province"}
              </option>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option value={item.keyMap} key={index}>
                      {LANGUAGES.VI === language ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index + "_" + item}>
                  <div className="content-left ">
                    {" "}
                    <ProfileDoctor
                      id={index}
                      DoctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkDetail={true}
                      isShowPrice={false}
                    />
                  </div>
                  <div className="content-right">
                    <DoctorSchedule isDoctorId={item} />
                    <DoctorExtraInfor isDoctorId={item} />
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
