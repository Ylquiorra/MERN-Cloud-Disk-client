// type defaultStateType = {
//   id: Number;
//   email: String;
//   diskSpace: Number;
//   usedSpace: Number;
//   avatart: String;
// };

const defaultState = {

};

export default function fileReducer(state = defaultState, action: { type: any }) {
  switch (action.type) {
    default:
      return state;
  }
}
