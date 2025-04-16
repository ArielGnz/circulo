import { GET_SOCIOS } from './action-types';

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
