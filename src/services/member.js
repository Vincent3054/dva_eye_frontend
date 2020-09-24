import axios from 'axios';
const api_url = 'http://yuchun.hsc.nutc.edu.tw/api';
export function GET_members(token) {
  return axios
    .get(`${api_url}/Members/All `, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => {
      console.log(res.data,12)
      return res.data.data;
    })
    .catch(error => {
      throw error;
    });

}
export function Delete_members(token,Account) {
  return axios
    .delete(`${api_url}/Members/Delete/${Account} `, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => {
      console.log(res,27)
      return res.data.message;
    })
    .catch(error => {
      throw error;
    });

}
export function Edit_members(token,Account,Data) {
  return axios
    .delete(`${api_url}/Members/Edit/${Account} `,Data, {
      headers: {
        Authorization: token,
      },
    })
    .then(res => {
      console.log(res,42)
      return res.data.message;
    })
    .catch(error => {
      throw error;
    });

}
