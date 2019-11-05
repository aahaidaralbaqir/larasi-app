import { bigIntLiteral } from "@babel/types";

let initialState = {
    isLoading  : false,
    webtoon : []
}

export default (state = initialState,action) => {
    switch(action.type){
        case 'SET_MYWEBTOON' :
            return {
                ...state,
                webtoon : action.payload
            }
        break;
        case 'SET_IS_LOADING_USER' : 
        return {
            ...state,
            isLoading : action.payload
        }
        break;
        default :
        return state
    }
}