let initialState = {
  isLoading : false,
  currUser  : {}
}

export default (state = initialState , action) => {
  switch (action.type) {
    case 'SET_CURR_USER' :
        return {
          ...state,
          currUser : action.payload
        }
      break;

    case 'SET_IS_LOADING' :
        return {
          ...state,
          isLoading : action.payload
        }
    default:
      return state
  }
}
