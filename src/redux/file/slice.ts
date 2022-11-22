const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';

interface FileSliceState {
  files: Files[];
  currentDir: string | null;
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
};

export default function fileReducer(state = defaultState, action: { type: any; payload: any }) {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    default:
      return state;
  }
}

export const setFiles = (files: Files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir: string) => ({ type: SET_CURRENT_DIR, payload: dir });
