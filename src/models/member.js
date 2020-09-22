import { GET_members } from '../services/member';
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoicGVycnkxMDA1IiwiUm9sZSI6IlAwMDMsUDAwNCxQMDA4LFAwMDksUDAxMCxQMDExLFAwMTIsUDAxMyxQMDE0LFAwMTUsUDAxNixQMDE3LFAwMTgsIiwiRXhwaXJlIjoiMjAyMC82LzEyIOS4i-WNiCAwNDozOTowNiJ9.spGtfM3kUl95Lc_aVlJtwHHYOL6HXYIn9CtD-q5pbhPRkdJAnsce4DfQBU9qGSZesNWCZRVqW1JHyRFcvsr8XA'
const Account = 'admin003'

export default {
  namespace: 'member',

  state: {
    members: [],
  },

  effects: {
    *GET_members({ payload, callback, loading }, { put, call, select }) {
      try {
        const response = yield call(GET_members, token);
        yield put({ type: 'SET_members', payload: response });
      } catch (err) {
        console.log(err);
      }
    },
    *Delete_members({ payload, callback, loading }, { put, call, select }) {
      try {
        const response = yield call(GET_members, token, Account);
        yield put({ type: 'SET_members', payload: response });
      } catch (err) {
        console.log(err);
      }
    },

  },

  reducers: {
    SET_members(state, { payload }) {
      return {
        ...state,
        members: payload,
      };
    },
    Delete_members(state, { payload }) {
      return {
        ...state,
        message: payload,
      };
    },
  },
};
