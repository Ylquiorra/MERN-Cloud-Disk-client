import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from './user/slice';
import filesReducer from './file/slice';

const rootReducer = combineReducers({
  user: userReducer,
  files: filesReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

