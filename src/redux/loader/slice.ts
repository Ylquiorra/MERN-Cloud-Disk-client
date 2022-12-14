const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const defaultState = {
  loader: false,
};

export default function userReducer(
  state = defaultState,
  action: {
    payload: any;
    type: boolean;
  },
) {
  switch (action.type as any) {
    case SHOW_LOADER:
      return { ...state, loader: true };
    case HIDE_LOADER:
      return { ...state, loader: false };

    default:
      return state;
  }
}

export const setShowLoader = () => ({ type: SHOW_LOADER });
export const setHideLoader = () => ({ type: HIDE_LOADER });
