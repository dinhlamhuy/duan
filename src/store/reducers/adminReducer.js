import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  InforDoctor: [],
  allScheduleTime: [],
  allCode: [],
  scheduleDoctor: [],
  allRequiredDoctorInfor: [],
  allExtraInforDoctor: [],
  allProfileDoctor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      //console.log("fetch gender start gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoadingGender = false;
      state.genders = action.data;
      //console.log("fetch gender Success gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      //console.log("fetch gender failed gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      //   state.isLoadingGender = false;
      state.positions = action.data;
      //console.log("fetch positions Success gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITON_FAILED:
      state.positions = [];
      //   state.isLoadingGender = false;
      //console.log("fetch positions failed gender: ", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      //   state.isLoadingGender = false;
      state.roles = action.data;
      //console.log("fetch roles Success gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      //   state.isLoadingGender = false;
      //console.log("fetch roles failed gender: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.data;
      //console.log("fetch all user Success: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      state.users = [];
      //console.log("fetch all user failed: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.dataDoctors;
      //console.log("fetch all user Success: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      //console.log("fetch all user failed: ", state);
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.dataAllDoctors;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_SUCCESS:
      state.InforDoctor = action.InforDoctor;
      return {
        ...state,
      };

    case actionTypes.FETCH_DETAIL_INFOR_DOCTOR_FAILED:
      state.InforDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SUCCESS:
      state.allCode = action.dataAllCode;
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_FAILED:
      state.allCode = [];
      return {
        ...state,
      };

    case actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_SUCCESS:
      state.scheduleDoctor = action.ScheduleDoctor;
      return {
        ...state,
      };

    case actionTypes.GET_SCHEDULE_DOCTOR_BY_DATE_FAILED:
      state.scheduleDoctor = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.dataDoctorInfo;
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };

    case actionTypes.GET_EXTRA_INFOR_DOCTOR_BY_ID_SUCCESS:
      state.allExtraInforDoctor = action.extraInfor;
      return {
        ...state,
      };

    case actionTypes.GET_EXTRA_INFOR_DOCTOR_BY_ID_FAILED:
      state.allExtraInforDoctor = [];
      return {
        ...state,
      };

    case actionTypes.GET_PROFILE_DOCTOR_BY_ID_SUCCESS:
      state.allProfileDoctor = action.profileDoctor;
      return {
        ...state,
      };

    case actionTypes.GET_PROFILE_DOCTOR_BY_ID_FAILED:
      state.allProfileDoctor = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
