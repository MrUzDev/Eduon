export const initialState = {
  vauchers: [],
  vauchersPrice: 0,
};
export const vaucherReducer = (state, action) => {
  switch (action.type) {
    case "ADD_VAUCHER":
      return (state = {
        vauchers: [...state.vauchers, action.payload.id],
        vauchersPrice: state.vauchersPrice + action.payload.value
      });
    case "REMOVE_VAUCHER":
      return (state = {
        vauchers: state.vauchers.filter((e) => e !== action.payload.id),
        vauchersPrice: state.vauchersPrice - action.payload.value
      });
    default:
      return state;
  }
};