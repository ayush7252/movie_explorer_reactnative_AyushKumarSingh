import axios from 'axios';

export const signUpRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
export const LoginRequest = async (data) => {
  return axios.post(
    'https://movie-explorer-ror-aalekh-2ewg.onrender.com/users/sign_in',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};