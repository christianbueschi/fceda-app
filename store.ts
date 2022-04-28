import { createStore, combineReducers, applyMiddleware } from 'redux';
import { liveticker } from './reducers/liveticker';
import { news } from './reducers/news';
import { games } from './reducers/games';
import { game } from './reducers/games';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const rootReducer = combineReducers({
  news,
  liveticker,
  games,
  game,
});

export default function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
