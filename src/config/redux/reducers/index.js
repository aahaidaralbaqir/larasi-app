import { combineReducers } from 'redux'
import auth from './authReducer'
import webtoon from './webtoonReducer'
import user from './userReducer'
export default rootReducer = combineReducers({
    auth : auth,
    user : user,
    webtoon : webtoon
})
