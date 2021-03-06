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
      console.log(res)
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
      console.log(res)
      return res.message;
    })
    .catch(error => {
      throw error;
    });

}
