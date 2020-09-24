import { GET_members ,Delete_members,Edit_members} from '../services/member';
const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoicGVycnkxMDA1IiwiUm9sZSI6IlAwMDMsUDAwNCxQMDA4LFAwMDksUDAxMCxQMDExLFAwMTIsUDAxMyxQMDE0LFAwMTUsUDAxNixQMDE3LFAwMTgsIiwiRXhwaXJlIjoiMjAyMC82LzEyIOS4i-WNiCAwNDozOTowNiJ9.spGtfM3kUl95Lc_aVlJtwHHYOL6HXYIn9CtD-q5pbhPRkdJAnsce4DfQBU9qGSZesNWCZRVqW1JHyRFcvsr8XA'

export default {
  namespace: 'member',

  state: {
    //members: [],
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
        const response = yield call(Delete_members, token, payload);
        yield put({ type: 'GET_members', payload: response });
      } catch (err) {
        console.log(err);
      }
    },
    *Edit_members({ payload, callback, loading ,data}, { put, call, select }) {
      try {
        const response = yield call(Edit_members, token, payload,data);
        yield put({ type: 'GET_members', payload: response });
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
    Edit_members(state, { payload }) {
      return {
        ...state,
        message: payload,

      };
    },
  },
};
