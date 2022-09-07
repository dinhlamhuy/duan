import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDateService,
  getExtraInfoDoctorByIdService,
  getProfileDoctorByIdService,
} from "../../services/userService";
import { toast } from "react-toastify";
import { dispatch } from "../../redux";

//GENDER
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//POSITION
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//ROLE
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//CREATE USER
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Đã tạo người dùng thành công");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Tạo người dùng không thành công");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("Tạo người dùng không thành công");
      dispatch(saveUserFailed());
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//GET ALL USER
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
    }
  };
};
export const fetchAllUsersSuccess = (allUserData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data: allUserData,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//EDIT
export const editAUser = (dataUser) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(dataUser);
      if (res && res.errCode === 0) {
        toast.success("Chỉnh sửa người dùng thành công");
        dispatch(editUserSuccess(res.data));
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Chỉnh sửa người dùng không thành công");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Chỉnh sửa người dùng không thành công");
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//DELETE
export const deleteUser = (userID) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userID);
      if (res && res.errCode === 0) {
        toast.success("Xóa người dùng thành công");

        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Xóa người dùng không thành công");
        dispatch(deleteUsersFailed());
      }
    } catch (error) {
      toast.error("Tạo người dùng không thành công");
      dispatch(deleteUsersFailed());
    }
  };
};
export const deleteUsersSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUsersFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(" ");
      // console.log("hajsdfhjwd", res);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (error) {
      console.log("FETCH_TOP_DOCTORS_FAILED", error);
      dispatch(fetchTopDoctorFailed());
    }
  };
};

export const fetchTopDoctorSuccess = (topDoctorData) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  dataDoctors: topDoctorData,
});
export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFailed());
      }
    } catch (error) {
      console.log("FETCH_ALL_DOCTORS_FAILED", error);
      dispatch(fetchAllDoctorFailed());
    }
  };
};

export const fetchAllDoctorSuccess = (allDoctorData) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  dataAllDoctors: allDoctorData,
});
export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      // console.log("", res);
      if (res && res.errCode === 0) {
        toast.success("Save Infor detail doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save Infor detail doctor error!");

        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log("SAVE_DETAIL_DOCTOR_FAILED", error);
      toast.error("Save Infor detail doctor error!");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchDetailInforDoctor = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailInforDoctorService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS,
          InforDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_DETAIL_INFOR_DOCTOR_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_DOCTORS_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const fetchAllCodes = (type) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService(type);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SUCCESS,
          dataAllCode: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_FAILED,
        });
      }
    } catch (error) {
      console.log("FETCH_ALL_DOCTORS_FAILED", error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_FAILED,
      });
    }
  };
};

export const saveBulkScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveBulkScheduleDoctorService(data);

      if (res && res.errCode === 0) {
        toast.success("Save Infor detail doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_BULK_SCHEDULE_SUCCESS,
        });
      } else {
        toast.error("SAVE_BULK_SCHEDULE_FAILED!");
        dispatch({
          type: actionTypes.SAVE_BULK_SCHEDULE_FAILED,
        });
      }
    } catch (error) {
      // console.log("SAVE_BULK_SCHEDULE_FAILED", error);
      toast.error("SAVE_BULK_SCHEDULE_FAILED!");
      dispatch({
        type: actionTypes.SAVE_BULK_SCHEDULE_FAILED,
      });
    }
  };
};

export const getScheduleDoctorByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      let res = await getScheduleDoctorByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
          ScheduleDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      // });

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
          dataDoctorInfo: {
            resPrice: resPrice.data,
            resPayment: resPayment.data,
            resProvince: resProvince.data,
          },
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
      });
    }
  };
};

export const getExtraInfoDoctorById = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getExtraInfoDoctorByIdService(doctorId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_EXTRA_INFOR_DOCTOR_BY_ID_SUCCESS,
          extraInfor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_EXTRA_INFOR_DOCTOR_BY_ID_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_EXTRA_INFOR_DOCTOR_BY_ID_FAILED,
      });
    }
  };
};

export const getProfileDoctorById = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getProfileDoctorByIdService(doctorId);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_PROFILE_DOCTOR_BY_ID_SUCCESS,
          profileDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PROFILE_DOCTOR_BY_ID_FAILED,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_PROFILE_DOCTOR_BY_ID_FAILED,
      });
    }
  };
};
