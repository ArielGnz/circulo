import { GET_SOCIOS } from './action-types';
import { POST_PRESTAMO } from './action-types';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

export const getSocios = () => {
    return async function(dispatch){
        const response = await axios('/socios');
        return dispatch({
            type: GET_SOCIOS,
            payload: response.data
        })
    }
}

export const postPrestamo = (prestamoData) => {
    return async function () {
      try {
        const response = await axios.post("/prestamos", prestamoData);
        return response.data;
      } catch (error) {
        console.error("Error en postPrestamo:", error.response?.data || error.message);
        throw error;
      }
    };
  };
  


