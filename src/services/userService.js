import axios from "../axios";
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-users", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-users", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-users", inputData);
};
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (inputType) => {
  return axios.get(`/api/top-doctor-home?limit=${inputType}`);
};
const getAllDoctorService = () => {
  return axios.get("/api/get-all-doctor");
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};
const getDetailInforDoctorService = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};
const saveBulkScheduleDoctorService = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInfoDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/verify-booking", data);
};
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};
const getAllSpecialty = () => {
  return axios.get("/api/get-all-specialty");
};
const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};
const getAllClinic = () => {
  return axios.get("/api/get-all-clinic");
};
const getDetailClinicById = (id) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${id}`);
};
const getListPatientById = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postsendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
export {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveDetailDoctorService,
  getDetailInforDoctorService,
  saveBulkScheduleDoctorService,
  getScheduleDoctorByDateService,
  getExtraInfoDoctorByIdService,
  getProfileDoctorByIdService,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getListPatientById,
  postsendRemedy,
};
