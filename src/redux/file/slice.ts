import { IFile } from '../../components/Disk/FileList/FileList';
const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';

interface FileSliceState {
  files: IFile[];
  currentDir: string | null;
  popupDisplay: boolean;
  dirStack: IFile[];
}

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
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    default:
      return state;
  }
}

export const setFiles = (files: IFile[]) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir: string) => ({ type: SET_CURRENT_DIR, payload: dir });
export const setAddFile = (file: IFile) => ({ type: ADD_FILE, payload: file });
export const setPopupDisplay = (display: boolean) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
});
export const setPushToStack = (dir: IFile) => ({ type: PUSH_TO_STACK, payload: dir });
export const setDeleteFile = (dirId: string) => ({ type: DELETE_FILE, payload: dirId });
