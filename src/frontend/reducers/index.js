import { actions } from "../actions";

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_FAVORITE:
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case actions.DELETE_FAVORITE:
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payload),
      };
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case actions.REGISTER_REQUEST:
      return {
        ...state,
        user: action.payload,
      };
    case actions.GET_VIDEO_SOURCE:
      return {
        ...state,
        playing:
          state.trends.find((item) => item.id === Number(action.payload)) ||
          state.original.find((item) => item.id === Number(action.payload)) ||
          [],
      };
    default:
      return state;
  }
};

export default reducer;
