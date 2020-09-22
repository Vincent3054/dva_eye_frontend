import axios from 'axios';
const api_url = 'http://yuchun.hsc.nutc.edu.tw/api';
export function GET_class(token) {
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
