import { combineReducers } from 'redux'
import report from './report'

const appReducer = combineReducers({
    report
})

const rootReducer = (state, action) => {
    return appReducer(
        state, 
        action
    )
}

export default rootReducer