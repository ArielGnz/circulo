import { GET_PRESTAMO, GET_SOCIOS } from "./action-types";

const initialState = {
  socios: [],
  prestamos: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case GET_SOCIOS:
      return {
        ...state,
        socios: payload,
      };

    case GET_PRESTAMO:
      return {
        ...state,
        prestamos: payload,
      }

    default:
      return state;
  }
};

export default rootReducer;
