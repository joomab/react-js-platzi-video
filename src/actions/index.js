export const actions = {
  SET_FAVORITE: "SET_FAVORITE",
  DELETE_FAVORITE: "DELETE_FAVORITE",
  LOGIN_REQUEST: "LOGIN_REQUEST",
};

export const setFavorite = (payload) => ({
  type: actions.SET_FAVORITE,
  payload,
});

export const deleteFavorite = (payload) => ({
  type: actions.DELETE_FAVORITE,
  payload,
});

export const loginRequest = (payload) => ({
  type: actions.LOGIN_REQUEST,
  payload,
});
