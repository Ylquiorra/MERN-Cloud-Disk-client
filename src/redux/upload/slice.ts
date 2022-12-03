import { IFile } from '../../components/Disk/FileList/FileList';
import { IUploadFile } from '../../components/Disk/Uploader/Uploader';

const SHOW_UPLOADER = 'SHOW_UPLOADER';
const HIDE_UPLOADER = 'HIDE_UPLOADER';
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE';
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE';
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE';

interface UploadFileState {
  isVisible: boolean;
  files: IUploadFile[];
}

const defaultState: UploadFileState = {
  isVisible: false,
  files: [],
};

export default function uploadReducer(state = defaultState, action: { type: any; payload: any }) {
  switch (action.type) {
    case SHOW_UPLOADER:
      return { ...state, isVisible: true };
    case HIDE_UPLOADER:
      return { ...state, isVisible: false };
    case ADD_UPLOAD_FILE:
      return { ...state, files: [...state.files, action.payload] };
    case REMOVE_UPLOAD_FILE:
      return { ...state, files: [...state.files.filter((file) => file.id !== action.payload)] };
    case CHANGE_UPLOAD_FILE:
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file.id === action.payload.id
              ? { ...file, progress: action.payload.progress }
              : { ...file },
          ),
        ],
      };
    default:
      return state;
  }
}

export const setShowUploader = () => ({ type: SHOW_UPLOADER });
export const setHideUploader = () => ({ type: HIDE_UPLOADER });
export const setAddUploadFile = (file: IUploadFile) => ({ type: ADD_UPLOAD_FILE, payload: file });

export const setRemoveUploadFile = (fileId: string) => ({
  type: REMOVE_UPLOAD_FILE,
  payload: fileId,
});
export const setChangeUploadFile = (payload: IUploadFile) => ({
  type: CHANGE_UPLOAD_FILE,
  payload: payload,
});
