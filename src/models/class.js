import { GET_class } from '../services/class';
const token='eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJBY2NvdW50IjoicGVycnkxMDA1IiwiUm9sZSI6IlAwMDMsUDAwNCxQMDA4LFAwMDksUDAxMCxQMDExLFAwMTIsUDAxMyxQMDE0LFAwMTUsUDAxNixQMDE3LFAwMTgsIiwiRXhwaXJlIjoiMjAyMC82LzEyIOS4i-WNiCAwNDozOTowNiJ9.spGtfM3kUl95Lc_aVlJtwHHYOL6HXYIn9CtD-q5pbhPRkdJAnsce4DfQBU9qGSZesNWCZRVqW1JHyRFcvsr8XA'


export default {
  namespace: 'class',

  state: {
    classliset:[],
  },

  effects: {
    *GET_class({ payload, callback, loading }, { put, call, select }) {
      try {
        const response = yield call(GET_class, token);
        yield put({ type: 'SET_class', payload: response });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    SET_class(state, { payload }) {
      return {
        ...state,
        classliset: payload,
      };
    },
  },
};
