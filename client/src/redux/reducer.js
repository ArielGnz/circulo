import { GET_PRESTAMO, GET_SOCIOS, GET_HABITACIONES, GET_REGISTRO_ESTADIA, } from "./action-types";

const initialState = {
  socios: [],
  prestamos: [],
  habitaciones: [],
  registrosEstadia: [],
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
      };

    case GET_HABITACIONES:
      return {
        ...state, habitaciones: payload
      };

    case GET_REGISTRO_ESTADIA:
      return {
        ...state, registrosEstadia: payload
      };

    default:
      return state;
  }
};

export default rootReducer;
