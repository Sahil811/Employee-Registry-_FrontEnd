const BASIC_URL = `${process.env.REACT_APP_SERVER_URL}/api`;

export const SERVER_URL = {
  USER_SIGNUP: `${BASIC_URL}/user/signup`,
  USER_LOGIN: `${BASIC_URL}/user/login`,

  EMPLOYEE_LIST: `${BASIC_URL}/user/list`,
  EMPLOYEE_UPDATE: `${BASIC_URL}/user/update`,
};
