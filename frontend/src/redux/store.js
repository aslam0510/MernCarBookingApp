import { createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension';
import { carsReducer } from './reducers/carsReducer';
import { alertReducer } from './reducers/alertReducer';

// const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  carsSlice : carsReducer,
  alertSlice: alertReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store;