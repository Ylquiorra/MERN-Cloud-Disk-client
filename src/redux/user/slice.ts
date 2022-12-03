const SET_USER = 'SET_USER';
const LOGOUT = 'LOGOUT';

export interface IdefaultState {
  id: Number;
  email: String;
  diskSpace: Number;
  usedSpace: Number;
}

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(
  state = defaultState,
  action: {
    payload: any;
    type: IdefaultState;
  },
) {
  switch (action.type as any) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        currentUser: [],
        isAuth: false,
      };
    default:
      return state;
  }
}

export const setUser = (user: IdefaultState) => ({ type: SET_USER, payload: user });
export const setLogout = () => ({ type: LOGOUT });
