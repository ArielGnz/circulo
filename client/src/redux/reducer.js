
import { GET_SOCIOS } from "./action-types";

const initialState = {
   socios: [],
}

const rootReducer = (state = initialState, {type, payload}) => {

    switch(type){
        
        case GET_SOCIOS:
            return{
                ...state,
                socios: payload,
            }
    }
};

export default rootReducer;