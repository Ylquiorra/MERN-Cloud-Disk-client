const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
interface FileSliceState {
  files: Files[];
  currentDir: string | null;
  popupDisplay: boolean;
  dirStack: Files[];
}

type Files = {
  files: [];
};

// interface defaultStateType = {
//   id: Number;
//   email: String;
//   diskSpace: Number;
//   usedSpace: Number;
//   avatart: String;
// };

const defaultState: FileSliceState = {
  files: [],
  currentDir: null,
  popupDisplay: false,
  dirStack: [],
};

export default function fileReducer(state = defaultState, action: { type: any; payload: any }) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case ADD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case SET_POPUP_DISPLAY:
      return { ...state, popupDisplay: action.payload };
    case PUSH_TO_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    default:
      return state;
  }
}

export const setFiles = (files: Files[]) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir: string) => ({ type: SET_CURRENT_DIR, payload: dir });
export const setAddFile = (file: Files) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display: boolean) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
});
export const setPushToStack = (dir: Files) => ({ type: PUSH_TO_STACK, payload: dir });
