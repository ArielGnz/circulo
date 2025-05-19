import { GET_PRESTAMO, GET_SOCIOS } from "./action-types";
import { POST_PRESTAMO } from "./action-types";

import axios from "axios";

//axios.defaults.baseURL = "circulo.railway.internal";
//axios.defaults.baseURL = "https://radiant-communication-production.up.railway.app/";
//axios.defaults.baseURL = "circulo-production.up.railway.app";
axios.defaults.baseURL="circulo-production-e998.up.railway.app";

//axios.defaults.baseURL = "http://localhost:3001";

export const getSocios = () => {
  return async function (dispatch) {
    const response = await axios("/socios");
    return dispatch({
      type: GET_SOCIOS,
      payload: response.data,
    });
  };
};

export const getPrestamo = () => {
  return async function (dispatch) {
    const response = await axios.get("/listadoPrestamo");
    //console.log("Datos obtenidos del backend:", response.data);
    return dispatch({
      type: GET_PRESTAMO,
      payload: response.data,
    });
  };
};

export const postPrestamo = (prestamoData) => {
  return async function () {
    try {
      const response = await axios.post("/prestamos", prestamoData);
      return response.data;
    } catch (error) {
      console.error(
        "Error en postPrestamo:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
};

export const eliminarPrestamo = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/prestamos/${id}`);
      dispatch(getPrestamo());
      return response.data;
    } catch (error) {
      console.error("Error al eliminar prestamo:", error.message);
    }
  }
}
