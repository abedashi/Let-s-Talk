import axios from 'axios';

type userDataLogin = {
  email: string;
  password: string;
};

type userDataSignup = {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
};

type Data = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  accessToken: string;
};

const API_URL = 'http://localhost:3001/api/users/';

// Login Verify
const loginVerify = async (code: number): Promise<Data> => {
  const { data } = await axios.post(API_URL + 'login/verify', code);

  try {
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Login user
const login = async (userData: userDataLogin) => {
  const { data } = await axios.post(API_URL + 'login', userData);

  try {
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Sign up new account
const signup = async (userData: userDataSignup) => {
  const { data } = await axios.post(API_URL + 'signup', userData);

  try {
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type NewData = {
  display_photo: string;
  about: string;
};

const updateUser = async (userData: NewData, token: string) => {
  const { data } = await axios.post(API_URL + 'update-user', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const me = async (token: string) => {
  const { data } = await axios.get(API_URL + 'me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  try {
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  loginVerify,
  signup,
  logout,
  login,
  updateUser,
  me,
};

export default authService;
