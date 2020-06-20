import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { homes } from './homes';
import { comments } from './comments';
import { partners } from './partners';
import { favorites } from './favorites';

export const ConfigStore = () => {
    const store = createStore(
        combineReducers({
            homes,
            comments,
            partners,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}