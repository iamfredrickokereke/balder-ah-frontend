import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';
import signupReducers from './signupReducers';
import articleReducer from './articleReducer';
import profileReducer from './profile';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  signup: signupReducers,
  article: articleReducer,
  profile: profileReducer,
});
